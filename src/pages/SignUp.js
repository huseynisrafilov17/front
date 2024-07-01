import { Header } from "../components/header";
import { Fragment, useState, useEffect } from "react";
import "./loginSignup.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { Link } from "react-router-dom";
import { getProfessions } from "../requests/professionRequests";
import { baseURL } from "../utils/baseURL";

export function Signup() {
  const location = useLocation();
  const initialPageState = location.state && location.state.state;
  const [pageState, setPageState] = useState(initialPageState);
  const [professions, setProfessions] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProfessions().then(
      (data) => {
        setProfessions(data);
      },
      (error) => {
        console.error("Error fetching professions:", error);
      }
    );
  }, []);
  const handleTalentSubmit = async (e) => {
    e.preventDefault();
    const professionId = document.querySelector("select").value;
    const user = {
      name,
      surname,
      username,
      password,
      professionId,
    };

    const response = await fetch(`${baseURL}/v1/auth/talent/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status === 200) navigate("/login");
  };
  const handleOrganizationSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name,
      surname,
      companyName,
      username,
      password,
    };

    const response = await fetch(`${baseURL}/v1/auth/company/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.status === 200) navigate("/login");
  };
  const talent = (
    <Fragment>
      <Header isLoginPage={true} />
      <div className="container loginSignup">
        <div className="left-side">
          <div>
            <button>
              <a href="/login">Login</a>
            </button>
            <button
              className={pageState === "company" ? "active" : ""}
              onClick={() => setPageState("company")}
            >
              Sign Up as Organization
            </button>
            <button
              className={pageState === "talent" ? "active" : ""}
              onClick={() => setPageState("talent")}
            >
              Sign Up as Talent
            </button>
          </div>
          <img src="./assets/imgs/signup.png" alt="" />
        </div>
        <div className="right-side">
          <form onSubmit={handleTalentSubmit}>
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="first name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="last name"
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <select defaultValue={"profession"} required>
              <option value="" hidden>
                profession
              </option>

              {professions.map((profession) => (
                <option key={profession.id} value={profession.id}>
                  {profession.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>
              <input type="checkbox" id="talentterms" required />
              <label htmlFor="talentterms">
                <Link to="/terms" state={{ state: "talents" }}>
                  terms and conditions
                </Link>
              </label>
            </div>
            <input className="submit" type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
      <Footer isLoginPage={true} />
    </Fragment>
  );
  const company = (
    <Fragment>
      <Header isLoginPage={true} />
      <div className="container loginSignup">
        <div className="left-side">
          <div>
            <button>
              <a href="/login">Login</a>
            </button>
            <button
              className={pageState === "company" ? "active" : ""}
              onClick={() => setPageState("company")}
            >
              Sign Up as Organization
            </button>
            <button
              className={pageState === "talent" ? "active" : ""}
              onClick={() => setPageState("talent")}
            >
              Sign Up as Talent
            </button>
          </div>
          <img src="./assets/imgs/signup.png" alt="" />
        </div>
        <div className="right-side">
          <form onSubmit={handleOrganizationSubmit}>
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="first name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="last name"
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <input
              type="text"
              name="companyname"
              placeholder="company name"
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>
              <input type="checkbox" id="companyterms" required />
              <label htmlFor="companyterms">
                <Link to="/terms" state={{ state: "company" }}>
                  terms and conditions
                </Link>
              </label>
            </div>
            <input className="submit" type="submit" value="Sign up" />
          </form>
        </div>
      </div>
      <Footer isLoginPage={true} />
    </Fragment>
  );
  if (pageState === "company") {
    return company;
  } else if (pageState === "talent") {
    return talent;
  }
}
