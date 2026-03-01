import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCi0JM0u2lhs0-qEqJjBIsRzewZ7lijV0o",
    authDomain: "calculator-all-2026.firebaseapp.com",
    projectId: "calculator-all-2026",
    storageBucket: "calculator-all-2026.firebasestorage.app",
    messagingSenderId: "835945918076",
    appId: "1:835945918076:web:551185cdab1458be47e3f9",
    measurementId: "G-FLSJVJ4V5N"
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
