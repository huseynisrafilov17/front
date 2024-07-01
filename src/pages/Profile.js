import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import "./profile.css";
import { parseJwt } from "../utils/parseToken";
import { getTalents, updateTalents } from "../requests/talentRequests";
import { getProfessions } from "../requests/professionRequests";
import { getCompanies, updateCompany } from "../requests/organizationRequests";

export function Profile() {
  const { setIsAuthenticated } = useAuth();
  const [talent, setTalent] = useState({});
  const [professions, setProfessions] = useState([]);
  const type = parseJwt().roles;
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie =
      "token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    navigate("/");
  };
  useEffect(() => {
    if (type === "COMPANY") {
      getCompanies().then(
        (data) => {
          const username = parseJwt().sub;
          const foundTalent = data.find((x) => x.username === username);
          setTalent(foundTalent);
        },
        (error) => {
          console.error("Error fetching organization:", error);
        }
      );
    } else {
      getTalents().then(
        (data) => {
          const username = parseJwt().sub;
          const foundTalent = data.find((x) => x.username === username);
          setTalent(foundTalent);
        },
        (error) => {
          console.error("Error fetching talents:", error);
        }
      );
    }
    getProfessions().then(
      (data) => {
        setProfessions(data);
      },
      (error) => {
        console.error("Error fetching professions:", error);
      }
    );
  }, []);
  const editHandle = (e) => {
    const div = e.target.parentElement;
    let text = div.children[0].innerText.split(":")[1].substring(1);
    div.children[0].classList.add("invisible");
    div.children[1].classList.add("invisible");
    div.children[2].classList.remove("invisible");
    if (
      div.children[0].getAttribute("class").includes("profession") &&
      type === "TALENT"
    ) {
      let id = professions.find((x) => x.name === text).id;
      div.children[2].value = String(id);
    } else {
      div.children[2].value = text;
    }
    div.children[3].classList.remove("invisible");
  };
  const saveHandle = (e) => {
    const id = talent.id;
    const div = e.target.parentElement;
    div.children[0].classList.remove("invisible");
    div.children[1].classList.remove("invisible");
    div.children[2].classList.add("invisible");
    div.children[3].classList.add("invisible");
    if (div.children[0].getAttribute("class") === "name" && type === "talent") {
      const [name, surname] = div.children[2].value.split(" ");
      let text = div.children[0].innerText.split(":")[0];
      text = text + ": " + name + " " + surname;
      div.children[0].innerText = text;
      talent[div.children[0].getAttribute("class")] = name;
      talent["surname"] = surname;
      talent.professionId = talent.professionDTO.id;
    } else if (
      div.children[0].getAttribute("class") === "profession" &&
      type === "TALENT"
    ) {
      const value = Number(div.children[2].value);
      let text = div.children[0].innerText.split(":")[0];
      let text_add = professions.find((x) => x.id === value).name;
      text = text + ": " + text_add;
      div.children[0].innerText = text;
      return;
    } else {
      const value = div.children[2].value;
      let text = div.children[0].innerText.split(":")[0];
      text = text + ": " + value;
      div.children[0].innerText = text;
      talent[div.children[0].getAttribute("class")] = String(value);
      if (type === "TALENT") talent.professionId = talent.professionDTO.id;
    }
    if (type === "TALENT") {
      talent.password = "nihad123456";
      updateTalents(id, talent);
    } else {
      talent.password = "holberton123456";
      updateCompany(id, talent);
    }
  };
  return (
    <Fragment>
      <Header
        isLoginPage={false}
        activePage={type === "TALENT" ? "talents" : ""}
      />
      <section className="profile-section container">
        <div className="white-item">
          <img
            src={
              type === "COMPANY"
                ? "./assets/imgs/instagram_feed180.jpg"
                : "./assets/imgs/400_400_2.jpg"
            }
          ></img>
          <div>
            <div>
              <p className="name">
                {type === "TALENT" ? (
                  <>Fullname: {talent.name + " " + talent.surname}</>
                ) : (
                  <>Name: {talent.companyName}</>
                )}
              </p>
              <button onClick={editHandle}>edit</button>
              <input type="text" className="invisible" />
              <button className="invisible" onClick={saveHandle}>
                Save
              </button>
            </div>
            <div>
              <p className="profession">
                {type === "TALENT" ? (
                  <>Profession: {talent.professionDTO?.name}</>
                ) : (
                  <>Type: Education</>
                )}
              </p>
              <button onClick={editHandle}>edit</button>
              {type === "TALENT" ? (
                <select className="invisible" required>
                  {professions.map((profession) => (
                    <option key={profession.id} value={profession.id}>
                      {profession.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input type="text" className="invisible" />
              )}
              <button className="invisible" onClick={saveHandle}>
                Save
              </button>
            </div>
            <div>
              <p className="location">Location: {talent.location}</p>
              <button onClick={editHandle}>edit</button>
              <input type="text" className="invisible" />
              <button className="invisible" onClick={saveHandle}>
                Save
              </button>
            </div>
            <div>
              <p className="username">Username: {talent.username}</p>
              <button onClick={editHandle}>edit</button>
              <input type="text" className="invisible" />
              <button className="invisible" onClick={saveHandle}>
                Save
              </button>
            </div>
            <div>
              <p className="phoneNumber">Phone: {talent.phoneNumber}</p>
              <button onClick={editHandle}>edit</button>
              <input type="phone" className="invisible" />
              <button className="invisible" onClick={saveHandle}>
                Save
              </button>
            </div>
          </div>
          <div className="stats">
            <p>
              <span>Proposals:</span>
              <span>2</span>
            </p>
            <p>
              <span>Ongoing projects:</span>
              <span>2</span>
            </p>
            <p>
              <span>Completed Projects:</span>
              <span>3</span>
            </p>
          </div>
        </div>
      </section>
      <section className="profile-about-section container">
        <div className="white-item">
          <p className="title-for-section">About Me</p>
          <p>
            {type === "TALENT" ? (
              <>
                I am a seasoned Backend Developer with a robust background in
                Java development, specializing in building scalable, efficient,
                and high-performance applications. With a deep understanding of
                server-side technologies and a commitment to clean, maintainable
                code, I strive to deliver exceptional backend solutions that
                drive the success of complex software projects.
                <br />
                <br />
                <span>Skills</span>
                <br />
                <br />- Programming Languages: Java, Python, JavaScript
                <br />- Frameworks: Spring Boot, Hibernate, Spring MVC
                <br />- Databases: MySQL, PostgreSQL, MongoDB
                <br />- API Development: RESTful APIs, SOAP
                <br />- Microservices: Design and implementation of
                microservices architecture - DevOps Tools: Docker, Kubernetes,
                Jenkins, Maven
                <br />- Version Control: Git, GitHub, Bitbucket
                <br />- Testing: JUnit, Mockito, TestNG
                <br />- Cloud Services: AWS, Azure
                <br />- Agile Methodologies: Scrum, Kanban
                <br />- Other Skills: Problem-solving, Team collaboration,
                Continuous Integration/Continuous Deployment (CI/CD)
              </>
            ) : (
              <>
                Holberton School is an innovative institution dedicated to
                training the next generation of software engineers through a
                project-based, peer-learning approach. With a focus on hands-on
                experience and real-world problem solving, Holberton provides
                students with a comprehensive education in software development,
                ensuring they are well-equipped to tackle the challenges of the
                tech industry. The curriculum covers a wide range of topics,
                from foundational programming languages to advanced system
                design, preparing graduates for successful careers.
              </>
            )}
          </p>
        </div>
      </section>
      <section className="profile-proposals-section container">
        <div className="white-item">
          <p className="title-for-section">Proposals</p>
          <div className="project-card">
            <img src="./assets/imgs/instagram_feed180.jpg" alt="" />
            <div>
              <p>C# / Desktop App</p>
              <p className="p-with-span">
                <span>Telecommunication</span> Desktop App
              </p>
            </div>
            <button>Details</button>
          </div>
          <div className="project-card">
            <img src="./assets/imgs/instagram_feed180.jpg" alt="" />
            <div>
              <p>C# / Desktop App</p>
              <p className="p-with-span">
                <span>Telecommunication</span> Desktop App
              </p>
            </div>
            <button>Details</button>
          </div>
        </div>
      </section>
      <section className="profile-ongoing-projects container">
        <div className="white-item">
          <p className="title-for-section">Ongoing Projects</p>
          <div className="project-card">
            <img src="./assets/imgs/instagram_feed180.jpg" alt="PASHA" />
            <div>
              <p>C# / Desktop App</p>
              <p className="p-with-span">
                <span>Telecommunication</span> Desktop App
              </p>
            </div>
            <button>Details</button>
          </div>
          <div className="project-card">
            <img src="./assets/imgs/instagram_feed180.jpg" alt="PASHA" />
            <div>
              <p>C# / Desktop App</p>
              <p className="p-with-span">
                <span>Telecommunication</span> Desktop App
              </p>
            </div>
            <button>Details</button>
          </div>
        </div>
      </section>
      <section className="profile-completed-projects container">
        <div className="white-item">
          <p className="title-for-section">Completed Projects</p>
          <div className="project-card">
            <img src="./assets/imgs/instagram_feed180.jpg" alt="PASHA" />
            <div>
              <p>C# / Desktop App</p>
              <p className="p-with-span">
                <span>Telecommunication</span> Desktop App
              </p>
            </div>
            <button>Details</button>
          </div>
          <div className="project-card">
            <img src="./assets/imgs/instagram_feed180.jpg" alt="PASHA" />
            <div>
              <p>C# / Desktop App</p>
              <p className="p-with-span">
                <span>Telecommunication</span> Desktop App
              </p>
            </div>
            <button>Details</button>
          </div>
        </div>
      </section>
      <div className="logoutButton">
        <button onClick={handleLogout}>Log out</button>
      </div>
      <Footer isLoginPage={false} />
    </Fragment>
  );
}
