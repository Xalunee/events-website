import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/*const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};*/

const firebaseConfig = {
  apiKey: "AIzaSyAWOFOb_BSPy3xa0WAdhswjD4pa43YXtIQ",
  authDomain: "events-website-1fa91.firebaseapp.com",
  projectId: "events-website-1fa91",
  storageBucket: "events-website-1fa91.appspot.com",
  messagingSenderId: "40791819201",
  appId: "1:40791819201:web:6264afbdb36da38001e540"
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
