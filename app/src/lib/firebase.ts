import { initializeApp } from 'firebase/app';
import type { Profile } from '@liff/get-profile';
import { getAuth, signInWithCustomToken, updateProfile } from 'firebase/auth';
import { httpsCallable, getFunctions } from 'firebase/functions';
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

if (!apiKey) {
  throw new Error('Environment variable VITE_FIREBASE_API_KEY is not defined.');
}

const firebaseConfig = {
  apiKey,
  authDomain: 'lecmane.firebaseapp.com',
  projectId: 'lecmane',
  storageBucket: 'lecmane.appspot.com',
  messagingSenderId: '778439413078',
  appId: '1:778439413078:web:fa20d79292cbf02a521af7',
  measurementId: 'G-6EDNV992VV'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
console.log('FirebaseApp initialized.');

/**
 * Functionsを呼び出してLINEのJWTからFirebaseのトークンを取得し、Firebaseのログイン処理を行う
 */
export const firebaseLogin = async ({ liffIDToken, liffProfile }: { liffIDToken: string; liffProfile: Profile }) => {
  // Function呼び出し
  const verify = httpsCallable(getFunctions(), 'verify');
  const response: any = await verify({ idToken: liffIDToken });

  // Firebaseログイン処理
  const auth = getAuth();
  const userCredential = await signInWithCustomToken(auth, response.data.token);

  // ユーザー情報をLINEから取得されたもので更新
  await updateProfile(userCredential.user, {
    displayName: liffProfile.displayName,
    photoURL: liffProfile.pictureUrl
  });

  const currentUser = auth.currentUser;
  return currentUser;
};
