import React from "react";

const Footer = () => {
  return (
    <div class="my-5" style={{ marginBottom: "0px" }}>
      <footer style={{ backgroundColor: "#4682b4" }}>
        <div class=" p-4" style={{ marginBottom: "0px" }}>
          <div class="row " style={{ marginBottom: "0px" }}>
            <div class="col-lg-6 col-md-12 mb-4">
              <h5 class="mb-3" style={{ letterSpacing: "2px", color: "white" }}>
                Health Centre, IIT Indore
              </h5>
              <p>
                The Health Centre of the Indian Institute of Technology Indore
                provides dedicated health services to the institute community
                comprising of students, employees, their dependents and
                Institute Guests. The Health Centre offers Outpatient, Day care,
                Trauma and Emergency Care.
              </p>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <h5 class="mb-3" style={{ letterSpacing: "2px", color: "white" }}>
                Links
              </h5>
              <ul class="list-unstyled mb-0">
                <li class="mb-1">
                  <a
                    href="https://www.iiti.ac.in/"
                    style={{ color: "#e3e1e1" }}
                  >
                    IITI Official Site
                  </a>
                </li>
                <li class="mb-1">
                  <a
                    href="http://people.iiti.ac.in/~medical/index.php"
                    style={{ color: "#e3e1e1" }}
                  >
                    Health Centre
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-6 mb-4">
              <h5 class="mb-1" style={{ letterSpacing: "2px", color: "white" }}>
                Visiting Hours
              </h5>
              <table
                class="table"
                style={{ color: "#e3e1e1", borderColor: "#666" }}
              >
                <tbody>
                  <tr>
                    <td>Emergency:</td>
                    <td>24 X 7</td>
                  </tr>
                  <tr>
                    <td>Mon - Fri:</td>
                    <td>8 AM - 6 PM</td>
                  </tr>
                  <tr>
                    <td>Sat:</td>
                    <td>8 AM - 5 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          class="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a class="text-dark" href="https://iiti.ac.in/">
            {` IIT Indore`}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
