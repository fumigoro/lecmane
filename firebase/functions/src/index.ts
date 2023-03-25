import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { defineString } from "firebase-functions/params";

admin.initializeApp();

const clientId = defineString("LINE_CLIENT_ID").value();

/**
 * LIFFから取得したIDTokenを検証し、FirebaseでAuthorizeする
 */
export const verify = functions.https.onCall(async (requestBody: { idToken: string }, context) => {
  // id tokenを取得
  const idToken = requestBody.idToken;

  try {
    // LIFF IDTokenの有効性を検証する
    const requestBody = {
      id_token: idToken,
      client_id: clientId,
    };
    const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    const firebaseToken = await admin.auth().createCustomToken(data.sub);
    return {
      token: firebaseToken,
    };
  } catch (err) {
    console.log(err);
    throw new functions.https.HttpsError("unknown", JSON.stringify(err));
  }
});
