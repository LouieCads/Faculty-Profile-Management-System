import React from "react";
import Link from "next/link";
import "./facultyhomepage.css";
import { House, File, ChartColumnBig, Cog } from "lucide-react";

function newPage() {
  return (
    <div className="containers">
      <div className="leftContainer">
        <div className="sideBar">
          <img src="./Images/CCIS.png" alt="" className="logo" />
          <Link href="/Faculty-Homepage">
            <div className="homeIcon">
              <House color="#ffffff" strokeWidth={2} />
            </div>
          </Link>

          <Link href="/Faculty-Compliance">
            <div className="complianceIcon">
              <File color="#ffffff" strokeWidth={2} />
            </div>
          </Link>

          <div className="analyticsIcon">
            <ChartColumnBig color="#ffffff" strokeWidth={2} />
          </div>
          <div className="settingsIcon">
            <Cog color="#ffffff" strokeWidth={2} />
          </div>
        </div>
      </div>
      <div className="rightContainer">
        <div className="navBar">Hello Jayson!</div>

        <div className="modules">
          <div className="moduleLeft">
            <div className="moduleOne">
              <p>Needs Action</p>
              <hr />
              <ul>
                <li>Personal Information</li>
                <li>Educational Background</li>
                <li>Experiences</li>
                <li>Licences and Certifications</li>
                <li>Teaching Assignments</li>
                <li>Research Outputs</li>
                <li>Documents</li>
              </ul>
            </div>
            <div className="moduleTwo">
              <p>Recent Actions</p>
              <hr />
              <ul>
                <li>Personal Information</li>
                <li>Educational Background</li>
                <li>Experiences</li>
                <li>Licences and Certifications</li>
                <li>Teaching Assignments</li>
                <li>Research Outputs</li>
                <li>Documents</li>
              </ul>
            </div>
            <div className="moduleThree">
              <p>Compliance Status</p>
              <hr />
            </div>
          </div>
          <div className="moduleRight">testing</div>
        </div>
      </div>
    </div>
  );
}

export default newPage;
