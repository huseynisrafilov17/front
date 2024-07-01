import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { useEffect, useState, Fragment } from "react";
import "./projects_talents.css";
import { getProjects } from "../requests/projectRequests";
import { getProfessions } from "../requests/professionRequests";

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState([]);
  const static_projects = [
    {
      id: 10,
      name: "Swift / SwiftUI B2B IOS App",
      projectCategoryId: 1,
      projectServiceTypeId: 4,
      img: "./assets/imgs/unnamed (1).png",
    },
    {
      id: 11,
      name: "Kotlin / Java B2B Android App",
      projectCategoryId: 4,
      projectServiceTypeId: 6,
      img: "./assets/imgs/atb_logo_png2.png",
    },
    {
      id: 12,
      name: "Java / Backend web app",
      projectCategoryId: 4,
      projectServiceTypeId: 3,
      img: "./assets/imgs/yMeSBSawXHna.jpeg",
    },
    {
      id: 13,
      name: "Ruby / Backend intranet",
      projectCategoryId: 2,
      projectServiceTypeId: 3,
      img: "./assets/imgs/instagram_feed180.jpg",
    },
    {
      id: 14,
      name: "Java / Desktop App",
      projectCategoryId: 3,
      projectServiceTypeId: 7,
      img: "./assets/imgs/UI1BU-Fakgao9hmQIFad784kGgRj6O8JOaDjWh4WbhE.jpeg",
    },
    {
      id: 15,
      name: "C# / Desktop App",
      projectCategoryId: 19,
      projectServiceTypeId: 7,
      img: "./assets/imgs/86GG_qN-_400x400.jpg",
    },
  ];
  const temp_filter = [];
  const categories = [
    {
      id: 1,
      name: "E-Commerce",
    },
    {
      id: 2,
      name: "Education",
    },
    {
      id: 3,
      name: "ERP",
    },
    {
      id: 4,
      name: "Fintech",
    },
    {
      id: 5,
      name: "Customer Relationship Management",
    },
    {
      id: 6,
      name: "Human Resources",
    },
    {
      id: 7,
      name: "Project Management",
    },
    {
      id: 8,
      name: "Content Management System",
    },
    {
      id: 9,
      name: "Healthcare",
    },
    {
      id: 10,
      name: "Business Intelligent",
    },
    {
      id: 11,
      name: "Accounting",
    },
    {
      id: 12,
      name: "Supply Chain Management",
    },
    {
      id: 13,
      name: "Cyber Security",
    },
    {
      id: 14,
      name: "Collaboration",
    },
    {
      id: 15,
      name: "Graphic Design",
    },
    {
      id: 16,
      name: "Cloud Computing",
    },
    {
      id: 17,
      name: "DevOps Tools",
    },
    {
      id: 18,
      name: "Marketing Automation",
    },
    {
      id: 19,
      name: "Other",
    },
  ];

  useEffect(() => {
    getProfessions().then(
      (data) => {
        setServices(data);
      },
      (error) => {
        console.error("Error fetching services:", error);
      }
    );
    getProjects().then(
      (data) => {
        setProjects(data);
      },
      (error) => {
        console.error("Error fetching projects:", error);
      }
    );
  }, []);
  function filterHelp(e) {
    const item = e.target;
    const id = Number(item.getAttribute("id").split("-")[1]);

    setFilter((prevFilter) => {
      const newFilter = [...prevFilter];

      if (item.checked) {
        newFilter.push(id);
      } else {
        const index = newFilter.indexOf(id);
        if (index !== -1) {
          newFilter.splice(index, 1);
        }
      }

      return newFilter;
    });
    console.log(filter);
  }
  return (
    <Fragment>
      <Header isLoginPage={false} activePage={"projects"} />
      <section className="container categorizedProject-section">
        <div className="left-side">
          <h2>Filter By Service</h2>
          {services.map((service) => (
            <div className="project" key={service.id}>
              <label className="switch">
                <input
                  type="checkbox"
                  id={"check-" + service.id}
                  onChange={filterHelp}
                />
                <span className="slider round"></span>
              </label>
              <label htmlFor={"check-" + service.id}>
                {service.name.length >= 24
                  ? service.name.slice(0, 24) + "..."
                  : service.name}
              </label>
            </div>
          ))}
          <h2>Filter By Category</h2>
          {categories.map((category) => (
            <div className="project" key={category.id}>
              <label className="switch">
                <input type="checkbox" id={`check-${9 + category.id}`} />
                <span className="slider round"></span>
              </label>
              <label htmlFor={`check-${9 + category.id}`}>
                {category.name.length >= 24
                  ? category.name.slice(0, 24) + "..."
                  : category.name}
              </label>
            </div>
          ))}
        </div>
        <div className="right-side">
          {static_projects.map((project) =>
            filter.length === 0 ||
            filter.includes(project.projectServiceTypeId) ? (
              <div className="project-card" key={project?.id}>
                <img src={project.img} />
                <div>
                  <p>{project?.name}</p>
                  <p className="p-with-span">
                    <span>
                      {
                        categories.find(
                          (x) => x.id === project.projectCategoryId
                        )?.name
                      }
                    </span>
                    {
                      services.find(
                        (x) => x.id === project.projectServiceTypeId
                      )?.name
                    }
                  </p>
                </div>
                <button>Details</button>
              </div>
            ) : (
              <></>
            )
          )}
          {projects.map((project) =>
            filter.length === 0 ||
            filter.includes(project.projectServiceTypeId) ? (
              <div className="project-card" key={project?.id}>
                <img src="./assets/imgs/instagram_feed180.jpg" alt="PASHA" />
                <div>
                  <p>{project?.name}</p>
                  <p className="p-with-span">
                    <span>
                      {
                        categories.find(
                          (x) => x.id === project.projectCategoryId
                        )?.name
                      }
                    </span>
                    {
                      services.find(
                        (x) => x.id === project.projectServiceTypeId
                      )?.name
                    }
                  </p>
                </div>
                <button>Details</button>
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      </section>
      <Footer isLoginPage={false} />
    </Fragment>
  );
}

// Trash
/* {services.map((service) => (
      <div className="project" key={service.id}>
        <label className="switch">
          <input type="checkbox" id={"check" + service.id} />
          <span className="slider round"></span>
        </label>
        <label htmlFor={"check" + service.id} id={service.id}>
        {service.name[0].toUpperCase() +
          service.name.slice(1).toLowerCase().split("_").join(" ")}
        </label>
      </div>
))} */
