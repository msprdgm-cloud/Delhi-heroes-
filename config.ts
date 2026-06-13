
/**
 * Firebase Configuration
 * 
 * IMPORTANT: If you are seeing errors, use the "DEMO MODE" on the login screen.
 * To use real login, you must replace these placeholders with your real keys from Firebase Console.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy_REPLACE_ME",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "delhi-heroes.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "delhi-heroes",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "delhi-heroes.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456",
};

// Check if keys are actual real keys or just placeholders
export const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "AIzaSy_REPLACE_ME" && 
  !firebaseConfig.apiKey.includes("REPLACE");

if (typeof window !== 'undefined') {
  if (!isFirebaseConfigured) {
    console.warn("Firebase is NOT configured. Real login will not work. Please use 'Demo Mode' in the UI.");
  }
}
