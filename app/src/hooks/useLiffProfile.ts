import { useEffect, useState } from 'react';
import liff from '@line/liff/dist/lib';
import type { Profile } from '@liff/get-profile';

/**
 * LIFF SDKからユーザー情報を取得する
 */
const useLiffProfile = () => {
  const [liffProfile, setLiffProfile] = useState<Profile | null>(null);

  const getProfile = async () => {
    await liff.ready;
    // if (!liff.isLoggedIn()) {
    //   liff.login();
    // }
    const profile = await liff.getProfile();
    setLiffProfile(profile);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return liffProfile;
};

export default useLiffProfile;
