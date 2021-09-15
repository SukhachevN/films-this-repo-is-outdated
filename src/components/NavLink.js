import classNames from "classnames";
import { Link, useRouteMatch } from "react-router-dom";

function NavLink(props) {
  const match = useRouteMatch(props.to);
  const className = classNames("NavLink", { NavLinkMatch: match });
  return <Link className={className} {...props} />;
}

export { NavLink };
