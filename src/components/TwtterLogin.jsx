import React from "react";
import { TwitterAuth } from "./FireBase";

function TwtterLogin() {
  async function signInWithTwitter() {
    const gAuth = TwitterAuth();
    gAuth
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <button
        type="button"
        onClick={signInWithTwitter}
        className="login-with-twitter-btn"
      >
        Sign in with Twitter
      </button>
    </div>
  );
}

export default TwtterLogin;
