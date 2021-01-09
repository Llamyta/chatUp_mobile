import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage'
// import 'firebase/auth';
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   DATABASE_URL,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
// } from 'react-native-dotenv';

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   databaseURL: DATABASE_URL,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyADL9eItqcOC4-mqR3yoQXGA5CEpvpXV8Y",
  authDomain: "donarsangre-bf5c7.firebaseapp.com",
  databaseURL: "https://donarsangre-bf5c7.firebaseio.com",
  projectId: "donarsangre-bf5c7",
  storageBucket: "donarsangre-bf5c7.appspot.com",
  messagingSenderId: "686268730527",
  appId: "1:686268730527:web:41393d03448db45f77a6aa",
  measurementId: "G-4G22Y5575R"
}
export const firebaseApp=firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig);

// export const storage=firebase.storage();
// export const firestore = firebase.firestore();
// export default firebase;
