import { useEffect, useState } from 'react';
import { getAuth, User } from 'firebase/auth';
import useLiffIDToken from './useLiffIDToken';
import useLiffProfile from './useLiffProfile';
import { firebaseLogin } from '../lib/firebase';

/**
 * firebaseでログインしているユーザーのプロフィールを取得する。ログインしていなければログイン処理が行われる。
 * @returns
 */
const useFirebaseProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const liffIDToken = useLiffIDToken();
  const liffProfile = useLiffProfile();

  // useEffect(() => {
  //   const auth = getAuth();
  //   auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  // }, []);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setUser(auth.currentUser);
      return;
    }

    if (!liffIDToken || !liffProfile) {
      return;
    }
    firebaseLogin({
      liffIDToken,
      liffProfile
    })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line
  }, [liffIDToken, liffProfile]);

  return user;
};

export default useFirebaseProfile;
