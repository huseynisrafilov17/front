import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { parseJwt } from "../utils/parseToken";

export function Header({ isLoginPage, activePage = "" }) {
  const { isAuthenticated } = useAuth();
  let type = "TALENT";
  if (isAuthenticated) {
    type = parseJwt().roles;
  }
  return (
    <React.Fragment>
      <header>
        <nav className="container">
          <ul>
            <li>
              <a href="/" className="logo">
                Portal
              </a>
            </li>
            <li className="search">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search for project..."
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </li>
            <li>
              <a
                className={activePage === "projects" ? "activePage" : ""}
                href="projects"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className={activePage === "talents" ? "activePage" : ""}
                href="/talents"
              >
                Talents
              </a>
            </li>
            <li>
              <a
                className={activePage === "services" ? "activePage" : ""}
                href="/services"
              >
                Services
              </a>
            </li>
            {isAuthenticated ? (
              <>
                <li className="profile">
                  <img
                    src={
                      type === "COMPANY"
                        ? "./assets/imgs/instagram_feed180.jpg"
                        : "./assets/imgs/400_400_2.jpg"
                    }
                  ></img>
                  <a href="/profile">Profile</a>
                </li>
              </>
            ) : (
              <>
                {!isLoginPage ? (
                  <>
                    <li>
                      <Link
                        className="loginsignup"
                        to="/sign-up"
                        state={{ state: "talent" }}
                      >
                        Sign Up
                      </Link>
                    </li>
                    <li>
                      <a className="loginsignup" href="/login">
                        Login
                      </a>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
}
