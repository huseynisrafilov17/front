import { Header } from "../components/header";
import { Footer } from "../components/footer";
import "./profile.css";
import React from "react";

export function ServiceProfile() {
  return (
    <React.Fragment>
      <Header isLoginPage={false} activePage={"services"} />
      <section className="service-profile-section container">
        <div className="white-item">
          <h1>Full Stack Web Development</h1>
          <div>
            <img src="../assets/imgs/7922058-removebg-preview.png"></img>
            <p>
              Full stack web development involves creating web applications by
              handling both front-end and back-end tasks. Full stack developers
              design user interfaces, manage server-side logic, and handle
              databases using technologies like React, Node.js, and SQL/NoSQL.
              They ensure smooth interaction between components and may also
              manage deployment and cloud hosting.
            </p>
          </div>
        </div>
      </section>
      <section className="service-developers-section container">
        <div className="white-item">
          <h1>Developers Will Be Assigned:</h1>
          <div>
            <div>
              <img src="../assets/imgs/coder.png" />
              <p>UX / UI</p>
            </div>
            <div>
              <img src="../assets/imgs/coder.png" />
              <p>Frontend Developer</p>
            </div>
            <div>
              <img src="../assets/imgs/coder.png" />
              <p>Backend Developer</p>
            </div>
          </div>
        </div>
      </section>
      <section className="service-details-section container">
        <div className="white-item">
          <h1>Details</h1>
          <p>
            Full stack web development encompasses the complete spectrum of web
            development, combining both the front-end and back-end aspects of
            creating a web application. A full stack web developer is proficient
            in designing and managing the user interface (UI) and user
            experience (UX), which involves creating visually appealing and
            user-friendly layouts with technologies such as HTML, CSS, and
            JavaScript frameworks like React or Angular. On the back-end, they
            handle server-side logic, databases, and application integrations
            using languages and frameworks like Node.js, Python with Django,
            Ruby on Rails, or Java with Spring. Full stack developers are adept
            at working with databases, whether SQL-based like MySQL and
            PostgreSQL or NoSQL like MongoDB. They also ensure seamless
            interaction between the front-end and back-end through RESTful APIs
            or GraphQL. In addition to these core competencies, they may also be
            involved in DevOps practices, managing deployment pipelines, and
            utilizing cloud services to host applications, ensuring the full
            lifecycle of web application development from concept to deployment
            and maintenance.
          </p>
        </div>
      </section>
      <Footer isLoginPage={false} />
    </React.Fragment>
  );
}
