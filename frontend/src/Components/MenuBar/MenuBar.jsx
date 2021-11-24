import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons/faEllipsisH";
import { faHashtag } from "@fortawesome/free-solid-svg-icons/faHashtag";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { AuthContext } from "../../Context/auth-context";
import { NavLink } from "react-router-dom";
import { Col, Button } from "react-bootstrap";

const MenuBar = () => {
  const auth = useContext(AuthContext);
  let logo = {
    href: "/home",
  };
  let compose = {
    name: "Post",
    icon: faPlusCircle,
  };
  let list = [
    {
      name: "Home",
      href: "/home",
      icon: faHome,
    },
    {
      name: "Explore",
      href: "/explore",
      icon: faHashtag,
    },
    {
      name: "Profile",
      href: `/user`,
      icon: faUser,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: faBell,
      count: 0,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: faEllipsisH,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: faEnvelope,
    },
  ];
  return (
    <Col className="d-flex flex-column align-items-end vh-100 overflow-y-auto mr-sm-n3 mr-md-0 mr-xl-3 hide-scroll">
      <div style={{ paddingRight: "7rem" }} className="my-2 mr-xl-auto ml-xl-4">
          <FontAwesomeIcon style={{color: "#1DA1F2"}} className="m-2" size="3x" icon={faTwitter} />
      </div>
      <div className="ml-0 d-flex flex-column mb-2 align-items-start">
        {list.map((itm) => {
          
          return (
            <div
              key={itm.name}
              className="d-flex align-items-top position-relative"
            >
              <NavLink
                to={itm.href}
                className={` px-xl-2 py-xl-1 p-1 mb-2 mx-lg-0 mx-auto btn btn-naked-primary rounded-pill font-weight-bold btn-lg d-flex align-items-center`}
                activeClassName="active"
              >
                <FontAwesomeIcon className="m-2" size="lg" icon={itm.icon} />
                <span className="d-none d-xl-block mr-2">{itm.name}</span>
              </NavLink>
            </div>
          );
        })}
      </div>

      <Button
        style={{ width: "10rem",margin:"auto", paddingLeft:"2.5rem" }}
        className="d-flex btn btn-primary font-weight-bold outline-warning rounded-pill"
        variant="dark"
        size="lg"
        onClick={auth.logout}
      >
        Logout
      </Button>
    </Col>
  );
};

export default MenuBar;
