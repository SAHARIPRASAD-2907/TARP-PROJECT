import React from "react";
import {withRouter} from 'react-router-dom';
import "./menu-item.scss";


const MenuItem = ({ title, imageUrl, size, history,linkUrl,match }) => (
  <div
    onClick={()=>history.push(`${match.url}${linkUrl}`)}
    className={`${size} menu-item`}
    style={{
      backgroundImage: `url(${imageUrl})`,
    }}
  >
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <h1 className="title">{title}</h1>
      <span className="subtitle">TRY NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
