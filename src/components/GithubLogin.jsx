import React from "react";
import { GithubAuth } from "./FireBase";
import { RxGithubLogo } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function GithubLogin() {
  const navigate = useNavigate();
  const handleGithubLogin = () => {
    try {
      const gAuth = GithubAuth();
      gAuth.then((res) => {
        console.log(res);
        const { uid, displayName, email, photoURL } = res.user;
        localStorage.setItem(
          "data",
          JSON.stringify({
            uid,
            name: displayName,
            email,
            photoURL,
            providerId:"github",
          })
        );
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const githubSVG = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M10 0C4.477 0 .74 4.304 0 10c.865 7.956 4.84 11.95 4.84 11.95.243.5.5.89.682.839.09-.04.682-0.21.682-0.47-0.23-.008-.843-.013-1.656-2.782.588-3.369-1.306-3.369-1.306-.454-1.125-1.11-1.425-1.11-1.425-.908-.604.069-.592.069-.592.003.069.531.004.531.004.892.488.341.059.91.81.092-.63.35-1.06.636-1.303-2.22-.245-4.555-1.081-4.555-4.814 0-1.063.39-1.933 0.029-2.613-.103-.247-.446-1.238.098-2.578.84-.262.75.998.75.998a9.818 9.818 0 0 1 .71.85c.004.85.112.705.328.504-1.262.909-.998.747-.998.747.546.34.203.331.12.578.64.681.028.551.028.613.742-2.339.566-4.566.807.359.3.678.895.678.804.301-0.012.352-0.012.671.261.18.564.688.47.137 0 17.042-.56 14.361-5.522 0 10z' fill='%23161514' fill-rule='evenodd'/%3E%3C/svg%3E`;
  return (
    <div>
      <button
        type="submit"
        className="c0bb02cc9 cb6427d24 c7b4e3687"
        data-provider="github"
        data-action-button-secondary="true"
        onClick={handleGithubLogin}
      >
        <span data-provider="github">
          <RxGithubLogo />
        </span>

        <span className="cd052a10d">Continue with GitHub</span>
      </button>
    </div>
  );
}

export default GithubLogin;
