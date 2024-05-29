import React, { useState } from "react";

import { LinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";

export default function LinkedInPage() {
  const [data, setData] = useState({});
  return (
    <>
      <LinkedIn
        clientId="78wy5emw56ghlr"
        onSuccess={(code) => {
          alert(code);
          setData(code);
        }}
        onError={(error) => {
          console.log(error);
        }}
        scope={("email", "profile")}
        redirectUri={"http://localhost:5173/login-SIGHUP"}
      >
        {({ linkedInLogin }) => (
          <img
            onClick={linkedInLogin}
            src={linkedin}
            alt="Sign in with Linked In"
            style={{ maxWidth: "180px", cursor: "pointer" }}
          />
        )}
      </LinkedIn>
      {data == "{}" ? null : <p>{data.code}</p>}
    </>
  );
}
