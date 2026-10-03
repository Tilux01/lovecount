# LoveCount - Working Log

## De-dummy + full wiring pass
- Removed every external stock image (34 in base + 2 helper constants). All avatars/icons are now
  inline SVG data URIs (couple-heart avatar + gradient app icon). 0 remote images remain.
- Removed all dummy content: fake events, notes, memories, care cards, hero stats, welcome tiles.
  Added stable hooks (#hm-*, #ev-*, #nt-*, #mm-*, #care-*, #nd-*, #wl-tiles) and a runtime hydrate()
  that fills everything from real state and the real relationship data (Esther, 19 Oct, 10 Aug 2025).
- Removed 3 duplicate dead per-screen footers from the design export (global #lt-footer is the source of truth).
- Wired every dead control: welcome tiles, Sync Data, note reply + emoji reactions, moments composer
  (type pills, emoji stamps, save), Time Capsule, View Timeline, care quick-log tiles, settings rows
  (reminder time, appearance, language, care privacy, about, privacy, sign out), birthday stats, card menus.
- Replaced the last raw prompt() (Send Voice) with an in-app sheet, because Android WebView ignores prompt().
- New pages: Timeline (chronological story), Care Log (full-page entry form), Privacy.
- Screens total: 24. verify.js: ALL CHECKS PASSED. Remote images: 0. Dummy text: 0.

## Realtime, chat and calling
- Backend is real: Firebase RTDB REST + one multiplexed SSE stream, keyed by the room in
  data.js. Verified live from two real Chromium devices (node verify_rt.mjs and a browser run).
- State sync is two-way and instant: an event added on one phone appears on the other and is
  persisted to its local storage. Role choice (Israel / Esther) stays per device.
- Chat screen + footer tab: live two-way messages, day dividers, timestamps, typing indicator,
  online presence dot, image attach (downscaled to 720px jpeg), optimistic send.
- Calling: real WebRTC voice and video over RTDB signalling with STUN + TURN, ringing screen,
  accept/decline, mute, camera toggle, speaker toggle, call timer, and clean teardown.
- Fixed a real bug found by the browser harness: five separate SSE streams exhausted Chrome's
  per-host connection pool, so the call offer never left the device. Collapsed to one stream
  plus a local mirror.
- Rebuilt the vendored Material Symbols subset from 79 to 97 icons. 13 glyphs (forum, call_end,
  volume_up, mic_off, person, event, info, lock_open, login, shield_lock, switch_account,
  timeline, face) were missing and rendered as literal words across the app.
- verify.js: ALL CHECKS PASSED. verify_rt.mjs: ALL REALTIME CHECKS PASSED.
