import React from "react";
import Footer from "./homePageComponents/Footer";
import "../../src/components/css/LoginPage.css";
import Login from "./Login";
import SignUp from "./SignUp";
import FacebookLoginButton from "./FacebookLoginButton";
import GoogleOneTapLogin from "./GoogleLogin";
import GithubLogin from "./GithubLogin";
import TwtterLogin from "./TwtterLogin";
import LinkedInPage from "./LinkedInLogin";
import InstagramLogin from "./InstagramLogin";

function LoginPage() {
  const [activeClass, setActiveClass] = React.useState(false);
  return (
    <div>
      <div className="head-section-for-product">
        <h2>Lorry trucks</h2>
      </div>
      <div className="login-and-signup-parent-container container">
        <div className="navigation-link-container">
          <a
            href="#"
            onClick={() => setActiveClass(false)}
            className={activeClass === false ? "active" : "p-tag-link"}
          >
            {" "}
            Login
          </a>{" "}
          or
          <a
            href="#"
            onClick={() => setActiveClass(true)}
            className={activeClass === true ? "active" : "p-tag-link"}
          >
            {" "}
            SignUp
          </a>
        </div>
        {activeClass ? <SignUp setActiveClass={setActiveClass} /> : <Login />}
        <FacebookLoginButton />
        <GoogleOneTapLogin />
        <GithubLogin />
        <TwtterLogin />
        <LinkedInPage />
        <InstagramLogin />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
