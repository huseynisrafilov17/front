import { baseURL } from "../utils/baseURL";
import { Header } from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Footer } from "../components/footer";
import "./loginSignup.css";
// import { fieldLength } from "../utils/fieldCheck";

export function Login() {
  const [errorState, setErrorState] = useState("");

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    // const checkUsername = fieldLength(usernameField, 6, 12);
    // const checkPassword = fieldLength(passwordField, 6, 12);
    // if (checkUsername === "" && checkPassword === "") {
    const username = usernameField.value;
    const password = passwordField.value;
    const user = {
      username,
      password,
    };

    const response = await fetch(`${baseURL}/v1/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status === 200) {
      const data = await response.json();
      document.cookie = `token=${data.accessToken}; path=/`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/`;
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setErrorState("Invalid Credentials.");
    }
    // setErrorState("");
    // onLoginSuccess(data.token); implement this
    // } else {
    //   if (checkUsername !== "") {
    //     setErrorState(checkUsername);
    //   } else {
    //     setErrorState(checkPassword);
    //   }
    // }
  };
  return (
    <Fragment>
      <Header isLoginPage={true} />
      <div className="container loginSignup">
        <div className="left-side">
          <div>
            <button className="active">Login</button>
            <button>
              <Link to="/sign-up" state={{ state: "company" }}>
                Sign Up as Organization
              </Link>
            </button>
            <button>
              <Link to="/sign-up" state={{ state: "talent" }}>
                Sign Up as Talent
              </Link>
            </button>
          </div>
          <img src="./assets/imgs/login.png" alt="" />
        </div>
        <div className="right-side">
          <form onSubmit={handleSubmit}>
            {errorState === "" ? <></> : <p className="error">{errorState}</p>}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              required
            />
            <input className="submit" type="submit" value="Login" />
            <hr />
            <a href="#">Lost Password</a>
          </form>
        </div>
      </div>
      <Footer isLoginPage={true} />
    </Fragment>
  );
}
