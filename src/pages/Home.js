import { Header } from "../components/header";
import { useAuth } from "../utils/AuthContext";
import { Footer } from "../components/footer";
import { useState, Fragment } from "react";
import { baseURL } from "../utils/baseURL";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/parseToken";
import { getCompanies } from "../requests/organizationRequests";

export function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState("");
  const [name, setName] = useState("");
  const [projectServiceTypeId, setProjectServiceTypeId] = useState("1");
  const [projectCategoryId, setProjectCategoryId] = useState("1");
  const [details, setDetails] = useState("");
  const [success, setSuccess] = useState("");

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (parseJwt().roles !== "COMPANY") {
        setErrorState("You are not a company.");
      } else {
        const companies = await getCompanies();
        const company = companies.find(
          (company) => company.username === parseJwt().sub
        );
        const companyId = company.id;
        const user = {
          name,
          projectCategoryId: Number(projectCategoryId),
          projectServiceTypeId: Number(projectServiceTypeId),
          companyId,
          requirements: details,
        };

        await fetch(`${baseURL}/v1/project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        setSuccess("Project is successfully submitted.");
      }
    }
  };
  return (
    <Fragment>
      <Header isLoginPage={false} />
      <section className="form-section container">
        <div className="form-div">
          <h2>Submit your project details</h2>
          <form onSubmit={handleProjectSubmit} className="projectForm">
            {success === "" ? (
              <></>
            ) : (
              <p className="success-message">{success}</p>
            )}
            {errorState === "" ? <></> : <p className="error">{errorState}</p>}
            <div>
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                name="name"
                id="nameInput"
                onChange={(e) => setName(e.target.value)}
                placeholder="Drone store"
              />
            </div>
            <div>
              <label htmlFor="typeInput">Service</label>
              <select
                id="typeInput"
                defaultValue={"1"}
                onChange={(e) => setProjectServiceTypeId(e.target.value)}
              >
                <option value="1">Full Stack Web Development</option>
                <option value="2">Front End Development</option>
                <option value="3">Back End Development</option>
                <option value="4">IOS Development</option>
                <option value="5">Android Development</option>
                <option value="6">Cross Mobile Development</option>
                <option value="7">Desktop Development</option>
                <option value="8">UI UX Design</option>
                <option value="9">Desktop Development</option>
              </select>
            </div>
            <div>
              <label htmlFor="categoryInput">Category</label>
              <select
                id="typeInput"
                defaultValue={"1"}
                onChange={(e) => setProjectCategoryId(e.target.value)}
              >
                <option value="1">E-Commerce</option>
                <option value="2">Education</option>
                <option value="3">ERP</option>
                <option value="4">Fintech</option>
                <option value="5">Customer Relationship Management</option>
                <option value="6">Human Resources</option>
                <option value="7">Project Management</option>
                <option value="8">Content Management System</option>
                <option value="9">Healthcare</option>
                <option value="10">Business Intelligent</option>
                <option value="11">Accounting</option>
                <option value="12">Supply Chain Management</option>
                <option value="13">Cyber Security</option>
                <option value="14">Collaboration</option>
                <option value="15">Graphic Design</option>
                <option value="16">Cloud Computing</option>
                <option value="17">DevOps Tools</option>
                <option value="18">Marketing Automation</option>
                <option value="19">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="detailsInput">Details</label>
              <textarea
                name="details"
                id="detailsInput"
                rows="5"
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </div>
            <div>
              <input type="submit" value="Add project" />
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
      <div className="section-headings">
        <h1>Most Demanded Services</h1>
        <button className="see-all"> See All &gt;&gt;</button>
      </div>
      <section className="solutions-section container">
        <div>
          <img src="./assets/imgs/3054613-removebg-preview.png" alt="Mobile" />
          <p>Mobile IOS / Android</p>
        </div>
        <div>
          <img src="./assets/imgs/7922058-removebg-preview.png" alt="Desktop" />
          <p>Desktop App</p>
        </div>
        <div>
          <img
            src="./assets/imgs/Remove-bg.ai_1717687649624.png"
            alt="Android"
          />
          <p>Web Development</p>
        </div>
      </section>
      <div className="section-headings">
        <button className="see-all"> See All &gt;&gt;</button>
        <h1>Popular Projects</h1>
      </div>
      <section className="projects-section container">
        <div className="project-card">
          <img src="./assets/imgs/unnamed (1).png" alt="PASHA" />
          <div>
            <p>Swift / SwiftUI B2B IOS App</p>
            <p className="p-with-span">
              <span>E-Commerce</span>Mobile IOS / Android
            </p>
          </div>
          <button>Details</button>
        </div>
        <div className="project-card">
          <img src="./assets/imgs/atb_logo_png2.png" alt="atb" />
          <div>
            <p>Kotlin / Java B2B Android App</p>
            <p className="p-with-span">
              <span>Fintech</span> Mobile IOS / Android
            </p>
          </div>
          <button>Details</button>
        </div>
        <div className="project-card">
          <img
            src="./assets/imgs/yMeSBSawXHna.jpeg"
            alt="International Bank of Azerbaijan"
          />
          <div>
            <p>Java / Backend web app</p>
            <p className="p-with-span">
              <span>Fintect</span> Web Development
            </p>
          </div>
          <button>Details</button>
        </div>
        <div className="project-card">
          <img src="./assets/imgs/instagram_feed180.jpg" alt="Holberton" />
          <div>
            <p>Ruby / Backend intranet</p>
            <p className="p-with-span">
              <span>Education</span> Web Development
            </p>
          </div>
          <button>Details</button>
        </div>
        <div className="project-card">
          <img
            src="./assets/imgs/UI1BU-Fakgao9hmQIFad784kGgRj6O8JOaDjWh4WbhE.jpeg"
            alt="SOCAR"
          />
          <div>
            <p>Java / Desktop App</p>
            <p className="p-with-span">
              <span>ERP</span> Desktop App
            </p>
          </div>
          <button>Details</button>
        </div>
        <div className="project-card">
          <img src="./assets/imgs/86GG_qN-_400x400.jpg" alt="PASHA" />
          <div>
            <p>C# / Desktop App</p>
            <p className="p-with-span">
              <span>Telecommunication</span> Desktop App
            </p>
          </div>
          <button>Details</button>
        </div>
      </section>
      <div className="section-headings">
        <h1>Top Talents</h1>
        <button className="see-all"> See All &gt;&gt;</button>
      </div>
      <section className="talents-section container">
        <div className="talent-card">
          <img src="./assets/imgs/400_400_2.jpg" alt="talent" />
          <p className="name">Huseyn Israfilov</p>
          <p className="profession">Backend Developer</p>
          <p className="success">Success rate: 90%</p>
          <button className="left-button">Details</button>
          <button className="right-button">Contact</button>
        </div>
        <div className="talent-card">
          <img src="./assets/imgs/400_400_3.jpg" alt="talent" />
          <p className="name">Nihad Gurbanov</p>
          <p className="profession">Backend Developer</p>
          <p className="success">Success rate: 90%</p>
          <button className="left-button">Details</button>
          <button className="right-button">Contact</button>
        </div>
        <div className="talent-card">
          <img src="./assets/imgs/400_400_6.jpg" alt="talent" />
          <p className="name">Murad Abbaszade</p>
          <p className="profession">Backend Developer</p>
          <p className="success">Success rate: 90%</p>
          <button className="left-button">Details</button>
          <button className="right-button">Contact</button>
        </div>
        <div className="talent-card">
          <img src="./assets/imgs/400_400_8.jpg" alt="talent" />
          <p className="name">Haji Mursalzada</p>
          <p className="profession">Backend Developer</p>
          <p className="success">Success rate: 90%</p>
          <button className="left-button">Details</button>
          <button className="right-button">Contact</button>
        </div>
      </section>
      <Footer isLoginPage={false} />
    </Fragment>
  );
}
