import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDxBBBBedSrM01rkyY9XgxBSqy9M_XqTuQ",
  authDomain: "nwitter-reloaded-8b134.firebaseapp.com",
  projectId: "nwitter-reloaded-8b134",
  storageBucket: "nwitter-reloaded-8b134.firebasestorage.app",
  messagingSenderId: "720950431584",
  appId: "1:720950431584:web:26146c10de975f50041805",
  measurementId: "G-VZKW8SQY3G"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

