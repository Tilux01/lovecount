
import { useRef, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Share, Linking, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { APP_HTML } from "./src/shell";

import * as ImagePicker from "expo-image-picker";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import * as Haptics from "expo-haptics";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // older SDKs
    shouldShowBanner: true,  // SDK 53+
    shouldShowList: true,    // SDK 53+
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Android drops any notification that does not belong to a channel.
async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync("lovecount", {
    name: "LoveCount reminders",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#005bb0",
  });
}

// The document sends { type, seconds } plus an ISO stamp. Rebuild a real
// trigger here, converting ISO back into a Date so the JSON hop through the
// bridge never leaves us with a string.
function normalizeTrigger(r) {
  const ch = Platform.OS === "android" ? { channelId: "lovecount" } : {};
  const t = r && r.trigger;
  if (t && typeof t === "object") {
    if (t.type === "date" && t.date) {
      const d = new Date(t.date);
      if (!isNaN(d.getTime()) && d.getTime() > Date.now()) return { type: "date", date: d, ...ch };
    }
    if (t.type === "timeInterval" && typeof t.seconds === "number") {
      return { type: "timeInterval", seconds: t.seconds, repeats: !!t.repeats, ...ch };
    }
    if (!t.type && typeof t.seconds === "number") {
      return { type: "timeInterval", seconds: t.seconds, repeats: false, ...ch };
    }
  }
  if (r && r.whenISO) {
    const d = new Date(r.whenISO);
    if (!isNaN(d.getTime()) && d.getTime() > Date.now()) return { type: "date", date: d, ...ch };
  }
  if (r && typeof r.seconds === "number") {
    return { type: "timeInterval", seconds: r.seconds, repeats: false, ...ch };
  }
  return null;
}

// ---------------------------------------------------------------------------
// LoveCount shell.
// One WebView, one HTML document, mounted ONCE. Navigation inside the document
// only toggles visibility, so there is no reload and no white flash.
// Everything native (camera, biometrics, notifications, secure PIN) is reached
// through the postMessage bridge below.
// ---------------------------------------------------------------------------
export default function App() {
  const webRef = useRef(null);

  useEffect(() => {
    ensureAndroidChannel().catch(() => {});
  }, []);

  const reply = useCallback((msg) => {
    const js = "window.LC && window.LC.onNative(" + JSON.stringify(msg) + ");true;";
    webRef.current?.injectJavaScript(js);
  }, []);

  const handleNative = useCallback(async (action, payload = {}) => {
    try {
      if (action === "ready") {
        Haptics.selectionAsync().catch(() => {});
        return;
      }

      if (action === "pickImage") {
        // Library first; if permission is refused, fall back to the camera.
        const lib = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (lib.granted) {
          const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.7,
            base64: false,
          });
          const a = !res.canceled && res.assets && res.assets[0];
          reply({ action: "pickImageResult", dataUrl: a ? a.uri : "" });
          return;
        }
        const cam = await ImagePicker.requestCameraPermissionsAsync();
        if (cam.granted) {
          const shot = await ImagePicker.launchCameraAsync({ quality: 0.7, base64: false });
          const a = !shot.canceled && shot.assets && shot.assets[0];
          if (a) { reply({ action: "pickImageResult", dataUrl: a.uri }); return; }
        }
        reply({ action: "pickImageResult", dataUrl: "" });
        return;
      }

      if (action === "biometric") {
        const has = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!has || !enrolled) {
          reply({ action: "biometricResult", ok: false, reason: "not_enrolled" });
          return;
        }
        const r = await LocalAuthentication.authenticateAsync({
          promptMessage: payload.reason || "Unlock LoveCount",
          fallbackLabel: "Use PIN",
        });
        reply({ action: "biometricResult", ok: !!r.success });
        return;
      }

      if (action === "setPin") {
        if (payload.pin) {
          await SecureStore.setItemAsync("care_pin", payload.pin);
          reply({ action: "toast", ok: true, text: "PIN saved securely" });
        } else if (payload.verify) {
          const stored = await SecureStore.getItemAsync("care_pin");
          reply({ action: "verifyPinResult", ok: stored === payload.verify });
        }
        return;
      }

      if (action === "share") {
        await Share.share({ message: payload.text || "LoveCount" });
        return;
      }

      if (action === "dial") {
        Linking.openURL("tel:").catch(() => {});
        return;
      }

      if (action === "exportData") {
        await Share.share({ message: payload.json || "{}", title: "LoveCount export" });
        reply({ action: "exportDataResult", ok: true });
        return;
      }

      if (action === "notifyNow") {
        await ensureAndroidChannel();
        await Notifications.scheduleNotificationAsync({
          content: {
            title: payload.title || "LoveCount",
            body: payload.body || "",
            sound: true,
            data: { tag: payload.tag || "lovecount", url: "lovecount://home" },
          },
          trigger: null,
        });
        return;
      }

      if (action === "requestNotifications") {
        const { status } = await Notifications.requestPermissionsAsync();
        reply({ action: "notificationResult", ok: status === "granted" });
        return;
      }

      if (action === "scheduleReminders") {
        await ensureAndroidChannel();
        await Notifications.cancelAllScheduledNotificationsAsync();
        let scheduled = 0;
        for (const r of payload.reminders || []) {
          const trigger = normalizeTrigger(r);
          if (!trigger) continue;
          await Notifications.scheduleNotificationAsync({
            content: {
              title: r.title,
              body: r.body,
              sound: true,
              data: { tag: r.tag || "lovecount", url: "lovecount://home" },
            },
            trigger,
          });
          scheduled++;
        }
        console.log("[LoveCount] reminders scheduled:", scheduled);
        reply({ action: "remindersScheduled", count: scheduled });
        return;
      }
    } catch (e) {
      console.log("native bridge error:", action, e?.message);
    }
  }, [reply]);

  const onMessage = useCallback((event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === "native") handleNative(msg.action, msg.payload);
    } catch (e) {
      // ignore malformed messages
    }
  }, [handleNative]);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        source={{ html: APP_HTML }}
        style={styles.web}
        containerStyle={styles.web}
        injectedJavaScriptBeforeContentLoaded={"document.documentElement.style.background='#FAF7FF';true;"}
        onMessage={onMessage}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowUniversalAccessFromFileURLs
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures={false}
        androidLayerType="hardware"
        textZoom={100}
        overScrollMode="never"
        bounces={false}
        cacheEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FAF7FF" },
  web: { flex: 1, backgroundColor: "#FAF7FF" },
});
