import React, { useState } from "react";
import { FacebookAuth } from "./FireBase"; // Assuming you have a FacebookAuth function defined in 'FireBase.js'
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../App";
export default function FacebookLoginButtons() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(Authcontext);

  const responseFacebook = async () => {
    try {
      const userCredential = await FacebookAuth(); // Assuming FacebookAuth function returns a user credential
      setUser(userCredential);
      console.log("Facebook login user -->", user);
      // const { uid, displayName, email, photoURL } = user;
      // console.log(uid, displayName, email, photoURL);
      setLocalData(user);
      localStorage.setItem(
        "data",
        JSON.stringify({
          uid: user.user.uid,
          name: user.user.displayName,
          email: user.user.email,
          photoURL: user.user.photoURL,
          providerId: "facebook",
        })
      );
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.log(error);
    }
  };

  const setLocalData = (user) => {
    const { displayName = "", email = "", photoURL = "" } = user.user;
    console.log(displayName, email, photoURL);
    localStorage.setItem(
      "data",
      JSON.stringify({  name: displayName, email, photoURL })
    );
  };


  return (
    <div>
      <button
        className="loginBtn loginBtn--facebook"
        onClick={responseFacebook}
      >
        Login with Facebook
      </button>
    </div>
  );
}
