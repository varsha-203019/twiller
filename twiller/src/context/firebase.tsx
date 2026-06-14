
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// keep your credentials 
const firebaseConfig = {
  apiKey: "AIzaSyAw-Jd2pHwZdfCL-wPic_E4J3SJh1pV27k",
  authDomain: "twiller-6879b.firebaseapp.com",
  projectId: "twiller-6879b",
  storageBucket: "twiller-6879b.firebasestorage.app",
  messagingSenderId: "664950910568",
  appId: "1:664950910568:web:b426c56b957ac6652e95dd",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
