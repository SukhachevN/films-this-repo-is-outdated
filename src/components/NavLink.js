import React from "react";
import classNames from "classnames";
import { Link, useRouteMatch } from "react-router-dom";

function NavLink({ to, children }) {
  const match = useRouteMatch(to);
  return (
    <Link className={classNames("NavLink", { NavLinkMatch: match })} to={to}>
      {children}
    </Link>
  );
}

export { NavLink };
