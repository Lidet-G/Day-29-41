import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  function signIn() {
    login();

    const from =
      location.state?.from?.pathname || "/";

    navigate(from);
  }

  return (
    <div>
      <h2>Sign In</h2>

      <p>You need to sign in to continue.</p>

      <button onClick={signIn}>
        Sign in
      </button>
    </div>
  );
}

export default SignIn;