import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaGoogle, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
function ProfileHamburgerMenu() {
  const [active, setActive] = React.useState(false);

  const { photoURL } = JSON.parse(localStorage.getItem("data") || false);

  const toggleMenu = () => {
    setActive(!active); // Toggle the active state
  };

  const { name, providerId } = JSON.parse(
    localStorage.getItem("data") || false
  );

  return (
    <div>
      <div>
        {photoURL ? (
          <img
            onClick={toggleMenu}
            className="common-image-container-for-profile-image common-pointer"
            src={photoURL}
            alt="temp logo image"
          />
        ) : (
          <img
            onClick={toggleMenu}
            className="common-image-container-for-profile-image common-pointer"
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/user.9aa809c2866b44dcb9b5.jpg"
            alt="temp logo image"
          />
        )}
      </div>

      <CgProfile
        fontSize={40}
        cursor={"pointer"}
        onClick={toggleMenu}
        className="mobile-navbar-button-icon"
      />

      <div className={`hamburger-menu ${active ? "active" : ""}`}>
        <IoMdClose fontSize={40} cursor={"pointer"} onClick={toggleMenu} />
        <div className="hamburger-menu-child-container">
          <div className="flex justify-center items-center gap-2 w-full mb-4">
            {photoURL ? (
              <img
                className="common-image-container-for-profile-image common-pointer"
                src={photoURL}
                alt="temp logo image"
              />
            ) : (
              <img
                className="common-image-container-for-profile-image common-pointer"
                src="https://bitpastel.io/mi/rammoy/construction1/static/media/user.9aa809c2866b44dcb9b5.jpg"
                alt="temp logo image"
              />
            )}
            {providerId === "google" && (
              <FaGoogle className="google-icon" fontSize={40} />
            )}
            {providerId === "facebook" && (
              <FaFacebook className="facebook-icon" fontSize={40} />
            )}
            {providerId === "github" && (
              <FaGithub className="github-icon" fontSize={40} />
            )}
            {providerId === "twitter" && (
              <FaTwitter className="twitter-icon" fontSize={40} color="white" />
            )}
          </div>
          <p className="sub-menu-text border-dashed-border common-pointer">
            {name ? name : "Guest"}
          </p>
          <Link className="sub-menu-text border-dashed-border">Settings</Link>
          <Link className="sub-menu-text border-dashed-border">
            Order detail
          </Link>
          <Link
            className="sub-menu-text border-dashed-border"
            onClick={() => {
              localStorage.clear();
              setActive(false);
            }}
          >
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileHamburgerMenu;
