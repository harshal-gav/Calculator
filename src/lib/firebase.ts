import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDK6toRRGHNxeO853R0ujuzdAPn5W4VmKg",
    authDomain: "calculator-net-web-2026.firebaseapp.com",
    projectId: "calculator-net-web-2026",
    storageBucket: "calculator-net-web-2026.firebasestorage.app",
    messagingSenderId: "403274697912",
    appId: "1:403274697912:web:ec0ec10396c49ba9c7384d",
    measurementId: "G-LFXY2T34NJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics: any = null;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, analytics };
