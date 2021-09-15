import React from "react";
import classNames from "classnames";
import { Link, useRouteMatch } from "react-router-dom";

function NavLink({ to, children }) {
  const match = useRouteMatch(to);
  const className = classNames("NavLink", { NavLinkMatch: match });
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export { NavLink };
