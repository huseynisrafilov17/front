import { Header } from "../components/header";
import { Fragment } from "react";
import { Footer } from "../components/footer";

export function NotFoundPage() {
  return (
    <Fragment>
      <Header isLoginPage={true} />
      <div className="not-found">
        <h1>
          404 <span>page not found :&#40;</span>
        </h1>
      </div>
      <Footer isLoginPage={true} />
    </Fragment>
  );
}
