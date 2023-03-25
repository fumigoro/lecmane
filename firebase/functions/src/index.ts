import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {defineString} from "firebase-functions/params";
import * as rq from "request-promise";

admin.initializeApp();

const clientId = defineString("LINE_CLIENT_ID");

/**
 * LIFFから取得したIDTokenを検証し、FirebaseでAuthorizeする
 */
export const verify = functions.https.onCall(
  async (requestBody: { idToken: string }) => {
    // id tokenを取得
    const idToken = requestBody.idToken;

    try {
      // LIFF IDTokenの有効性を検証する
      const data = await rq({
        method: "POST",
        uri: "https://api.line.me/oauth2/v2.1/verify",
        form: {
          id_token: idToken,
          client_id: clientId.value(),
        },
        json: true,
      });

      const firebaseToken = await admin.auth().createCustomToken(data.sub);
      return {
        token: firebaseToken,
      };
    } catch (err) {
      console.log(err);
      throw new functions.https.HttpsError("unknown", JSON.stringify(err));
    }
  });
