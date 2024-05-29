import React from "react";
import InstagramLogin from "react-instagram-oauth";

export default (props) => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <InstagramLogin
      authCallback={authHandler}
      appId={"2108742936169213"}
      appSecret={"3599f0052e515408244bcc96954f7986"}
      redirectUri={"https://8d288y.csb.app/"}
    />
  );
};
