import liff from "@line/liff/dist/lib";
import { useEffect, useState } from "react";

/**
 * LIFF SDKが取得した「現在のユーザーの生のIDトークン」を取得する
 */
const useLiffIDToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const getIdToken = async () => {
    await liff.ready;
    if (!liff.isLoggedIn()) {
      liff.login();
    }

    const t = liff.getIDToken();
    setToken(t);
  }

  useEffect(() => { getIdToken() }, []);

  return token;
}

export default useLiffIDToken;
