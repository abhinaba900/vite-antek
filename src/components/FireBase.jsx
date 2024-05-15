  import {
    FacebookAuthProvider,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPhoneNumber
  } from "firebase/auth";
  import { auth } from "../main";
  import firebase from "firebase/compat/app";
  const provider = new FacebookAuthProvider(); // For Facebook Login
  const provider2 = new GoogleAuthProvider(); // For Google Login
  const provider3 = new GithubAuthProvider(); // For Github Login


  export const FacebookAuth = async () => {
    try {
      const fbAuth = signInWithPopup(auth, provider);
      return fbAuth;
    } catch (error) {
      console.log(error);
    }
  };

  export const GoogleAuth = async () => {
    try {
      const gAuth = signInWithPopup(auth, provider2);
      return gAuth;
    } catch (error) {
      console.log(error);
    }
  }


  export const GithubAuth = async () => {
    try {
      const gAuth = signInWithPopup(auth, provider3);
      return gAuth;
    } catch (error) {
      console.log(error);
    }
  }


  export const PhoneNumberAuth = async (phoneNumber) => {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      const phoneAuth = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      return phoneAuth;
    } catch (error) {
      console.error("Phone authentication failed:", error.message);
      throw error;
    }
  };
