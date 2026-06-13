'use client';

import React, { createContext, useContext } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore as firebaseGetFirestore, Firestore } from 'firebase/firestore';
import { getAuth as firebaseGetAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

interface FirebaseContextProps {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export function initializeFirebase(): { 
  firebaseApp: FirebaseApp; 
  firestore: Firestore; 
  auth: Auth; 
} {
  const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = firebaseGetFirestore(firebaseApp);
  const auth = firebaseGetAuth(firebaseApp);

  return { firebaseApp, firestore, auth };
}

export const FirebaseProvider: React.FC<{
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  children: React.ReactNode;
}> = ({ firebaseApp, firestore, auth, children }) => {
  return (
    <FirebaseContext.Provider value={{ firebaseApp, firestore, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase().firebaseApp;
export const useFirestore = () => useFirebase().firestore;
export const useAuth = () => useFirebase().auth;

export const getFirebaseApp = () => {
  const context = useContext(FirebaseContext);
  return context?.firebaseApp;
};
export const getFirestore = () => {
  const context = useContext(FirebaseContext);
  return context?.firestore;
};
export const getAuth = () => {
  const context = useContext(FirebaseContext);
  return context?.auth;
};
