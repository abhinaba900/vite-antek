import React from "react";
import { GoogleAuth } from "./FireBase";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();
  const responseGoogle = async () => {
    try {
      const gAuth = GoogleAuth();
      gAuth
        .then((res) => {
          console.log(res);
          const { uid, displayName, email, photoURL } = res.user;
          localStorage.setItem(
            "data",
            JSON.stringify({
              uid,
              name: displayName,
              email,
              photoURL,
              providerId: "google",
            })
          );
          navigate("/");
        })
        .catch((error) => {
          console.log(error); // Handle errors
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={responseGoogle}
        className="login-with-google-btn"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default GoogleLogin;
