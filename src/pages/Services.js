import { Header } from "../components/header";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";
import React from "react";

export function Services() {
  return (
    <React.Fragment>
      <Header isLoginPage={false} activePage={"services"} />
      <section className="form-section container">
        <div className="form-div">
          <h2>Submit your project details</h2>
          <form action="#" className="projectForm">
            <div>
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                name="name"
                id="nameInput"
                placeholder="Drone store"
              />
            </div>
            <div>
              <label htmlFor="typeInput">Type</label>
              <input
                type="text"
                name="type"
                id="typeInput"
                placeholder="Website"
              />
            </div>
            <div>
              <label htmlFor="categoryInput">Category</label>
              <input
                type="text"
                name="category"
                id="categoryInput"
                placeholder="E-commerce"
              />
            </div>
            <div>
              <label htmlFor="detailsInput">Details</label>
              <textarea name="details" id="detailsInput" rows="5"></textarea>
            </div>
            <div>
              <input type="submit" value="Submit project" />
            </div>
          </form>
        </div>
        <div className="img-div">
          <p>
            Near to <span>free</span> software
            <br />
            solutions <span>for startups!</span>
          </p>
          <img
            src="./assets/imgs/fun-3d-cartoon-illustration-indian-businessman-removebg-preview.png"
            alt="Man"
            height="350px"
          />
        </div>
      </section>
      <section className="solutions-section container">
        <div>
          <img src="./assets/imgs/3054613-removebg-preview.png" alt="Mobile" />
          <p>Frontend Development</p>
        </div>
        <div>
          <img src="./assets/imgs/7922058-removebg-preview.png" alt="Desktop" />
          <p>Backend Development</p>
        </div>
        <div>
          <img
            src="./assets/imgs/Remove-bg.ai_1717687649624.png"
            alt="Android"
          />
          <p>
            <Link to="/services/fullstack">Full Stack Web Development</Link>
          </p>
        </div>
        <div>
          <img src="./assets/imgs/3054613-removebg-preview.png" alt="Mobile" />
          <p>IOS Development</p>
        </div>
        <div>
          <img src="./assets/imgs/7922058-removebg-preview.png" alt="Desktop" />
          <p>Android Development</p>
        </div>
        <div>
          <img
            src="./assets/imgs/Remove-bg.ai_1717687649624.png"
            alt="Android"
          />
          <p>Cross-Mobile Development</p>
        </div>
        <div>
          <img src="./assets/imgs/3054613-removebg-preview.png" alt="Mobile" />
          <p>Desktop Development</p>
        </div>
        <div>
          <img src="./assets/imgs/7922058-removebg-preview.png" alt="Desktop" />
          <p>UX UI Development</p>
        </div>
        <div>
          <img
            src="./assets/imgs/Remove-bg.ai_1717687649624.png"
            alt="Android"
          />
          <p>
            Data Science and <br /> Machine Learning
          </p>
        </div>
      </section>
      <Footer isLoginPage={false} />
    </React.Fragment>
  );
}
