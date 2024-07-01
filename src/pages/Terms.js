import { Header } from "../components/header";
import { Footer } from "../components/footer";
import React from "react";
import { useLocation } from "react-router-dom";

export function Terms() {
  const location = useLocation();
  const forPage = location.state && location.state.state;
  return (
    <React.Fragment>
      <Header isLoginPage={false} />
      {forPage == "talents" ? (
        <>
          <div className="container">
            <div className="terms">
              <h1>Terms and Conditions for talents</h1>
              <p>
                By signing up this platform each talent accepts to build
                projects for the companies for free or for some amount agreed
                with company responsible person.
                <br />
                <br />
                Each talent should complete the projects that they agreed to
                work on.
                <br />
                <br />
                Platform owners may share talents data with relevant parties
                such as tech companies.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="terms container">
            <div className="terms">
              <h1>Terms and Conditions for companies</h1>
              <p>
                By signing up this platform each company accepts to deploy and
                maintain projects by talents at least for one year.
                <br />
                <br />
                Each company should register talents as an intern in their
                company.
                <br />
                <br />
                Platform owners may require some service fees to cover platform
                domain and hosting fees.
              </p>
            </div>
          </div>
        </>
      )}
      <Footer pin={true} isLoginPage={false} />
    </React.Fragment>
  );
}
