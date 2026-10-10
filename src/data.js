

export const DATA = {
  app: {
    name: "LoveCount",
    version: "1.0.0",
    build: "1.0.0",
    author: "Tilux",
    androidPackage: "com.tilux.lovecount",
    iosBundleId: "com.tilux.lovecount",
    scheme: "lovecount",
  },
  timezone: "Africa/Lagos",                  // Nigeria, UTC+1

  me: { name: "Israel" },

  partner: {
    name: "Esther",
    birthdayMonth: 10,
    birthdayDay: 7,
    birthYear: 2007,
  },

  relationship: {
    startISO: "2025-08-10", // Anniversary: 10 August 2025
    label: "Anniversary",
  },
  firebase: {
    enabled: true,
    config: {
      apiKey: "AIzaSyCRRWlIKZ1na9SJNOyO96v5mQ6Rx88SeQU",
      authDomain: "love-track-c2f0f.firebaseapp.com",
      projectId: "love-track-c2f0f",
      storageBucket: "love-track-c2f0f.firebasestorage.app",
      messagingSenderId: "421906993898",
      appId: "1:421906993898:web:76e60dd53e663272773d93",
      measurementId: "G-1L7YZ6J964",
      databaseURL: "https://love-track-c2f0f-default-rtdb.firebaseio.com"
    },
    roomId: "israel-esther",
  },

  seed: {
    events: [
      { id: "e1", title: "Esther's Birthday", date: "10-07", kind: "birthday" },
      { id: "e2", title: "Our Anniversary", date: "08-10", kind: "anniversary" },
    ],
    notes: [
      { id: "n1", from: "Israel", body: "You make every ordinary day feel like a celebration.", mood: "Sweet", hearts: 24 },
    ],
  },
};
