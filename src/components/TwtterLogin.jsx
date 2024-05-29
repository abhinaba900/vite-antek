import React from "react";
import { TwitterAuth } from "./FireBase";
import { useNavigate } from "react-router-dom";

function TwtterLogin() {
  const navigate = useNavigate();
  async function signInWithTwitter() {
    const gAuth = TwitterAuth();
    gAuth
      .then((res) => {
        console.log(res.user);
        const { uid, displayName, email, photoURL } = res.user;
        localStorage.setItem(
          "data",
          JSON.stringify({
            uid,
            name: displayName,
            email,
            photoURL,
            providerId: "twitter",
          })
        );
        navigate("/");
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
