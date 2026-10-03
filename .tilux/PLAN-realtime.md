# LoveCount - Realtime, Chat and Calling build plan

## Goal
Make the database, saving and two-way transmission genuinely realtime, and add
working chat plus working voice/video calling. No dummies, no placeholders.

## Backend decision
The shipped Firebase project is alive and the Realtime Database accepts
anonymous REST reads/writes, and it supports Server-Sent Events streaming.
So the transport is:

  * Write/read  -> Firebase RTDB REST   (/lovecount/<room>/<path>.json)
  * Live feed   -> EventSource (SSE)     Accept: text/event-stream
  * Identity    -> per device uid in localStorage + chosen role
  * Transport addr -> data.js firebase.config.databaseURL, roomId

No npm dependency, works from a WebView (null origin) and from a plain browser.

## Data shape
  /lovecount/<room>/state              { rev, at, by, state }
  /lovecount/<room>/chat/<key>         { from, text, at, kind, img }
  /lovecount/<room>/typing/<role>      <ms timestamp>
  /lovecount/<room>/presence/<role>    { at, name }
  /lovecount/<room>/call               { id, from, to, type, state, offer, answer, at }
  /lovecount/<room>/cand/caller/<key>  { c, at }
  /lovecount/<room>/cand/callee/<key>  { c, at }

## Execution sequence
1.  Add src/realtime.js exposing REALTIME_CSS, REALTIME_HTML, REALTIME_JS.
2.  REALTIME_JS holds the RTDB REST client, the SSE subscriber, the state
    reconciler, the chat engine and the WebRTC call engine.
3.  Patch src/runtime.js so save() pushes through the realtime layer and boot
    starts it, and so renderAll() paints the chat screen.
4.  Patch src/runtime.js nav table so chat owns a footer tab.
5.  Patch src/shell.js to inject the new css, markup and script.
6.  Update database.rules.json with the /lovecount branch so a future deploy
    keeps the same shape.
7.  Rebuild index.html, then run the jsdom harness and a live REST smoke test.

## State reconciliation rules
  * Every push bumps rev = max(Date.now(), lastRev + 1).
  * Remote state is applied only when by !== our uid and rev > lastRev.
  * Role (myRole) is per device and never overwritten by a remote push.
  * Applying remote state writes localStorage then re-renders, never re-pushes.

## Call flow
  Caller  ring -> offer PUT -> wait answer -> ICE
  Callee  sees ringing -> accept -> answer PATCH -> ICE
  Hang up PATCH state ended, decline PATCH state declined, then both purge.
  Ring tone is synthesised with WebAudio so there is no audio asset.

## Definition of done
  * Two devices in the same room see each other's data within a second.
  * Chat messages arrive live both ways, with typing and presence.
  * Voice and video calls connect, mute, camera toggle and hang up cleanly.
  * verify.js passes and no screen regresses.
