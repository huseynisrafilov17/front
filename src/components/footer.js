import React from "react";
import "./footer.css";

export function Footer({ pin = false, isLoginPage }) {
  return (
    <React.Fragment>
      {!isLoginPage ? (
        <footer className={pin ? "pin" : ""}>
          <div className={"footer-div container"}>
            <div className="footer-left">
              <a href="/" className="logo">
                Portal
              </a>
              <p>
                Development of software solutions for low budget companies or
                startups voluntarily or for a tiny amount of payment to gain
                real life developer experience.
              </p>
            </div>
            <div className="footer-right">
              <input
                type="text"
                name="subscriptionEmail"
                placeholder="mymail@example.com"
              />
              <input type="button" value="Subscribe to newsletter" />
            </div>
            <p>Made by Holbies with ❤️</p>
          </div>
        </footer>
      ) : (
        <p className="copyright">Made by Holbies with ❤️</p>
      )}
    </React.Fragment>
  );
}
