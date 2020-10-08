import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = (props) => (
  <div>
    <ul className="nav nav-tab bg-secondary" style={{ fontSize: "100" }}>
      {!isAuthenticated() && (
        <Fragment>
          <li>
            <Link
              className="nav-link"
              style={isActive(props.history, "/")}
              to="/"
            >
              Signin
            </Link>
          </li>

          <li>
            <Link
              className="nav-link"
              style={isActive(props.history, "/signup")}
              to="/signup"
            >
              Signup
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li>
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                props.history.push("/");
              })
            }
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);
export default withRouter(Menu);
