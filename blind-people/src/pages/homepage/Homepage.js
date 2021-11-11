import React from "react";
import Directory from "../../components/directory/Directory";
import "./home-page.scss";
const HomePage = ({ history }) => (
  <div className="homepage">
    <Directory history={history} />
  </div>
);

export default HomePage;
