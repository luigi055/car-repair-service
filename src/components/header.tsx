import { NavLink, NavLinkProps } from "react-router-dom";
import { PadBox } from "@rosepath/react-layouts";
import { homePath, newServicePath } from "../routes";

function Header() {
	const generateActiveClass: NavLinkProps["className"] = ({ isActive }) => {
		if (isActive) return "active";
		return "";
	};

	return (
		<PadBox padding="size5">
			<NavLink to={homePath} className={generateActiveClass}>
				Car Service Tracker
			</NavLink>
			<NavLink to={newServicePath} className={generateActiveClass}>
				Register new service
			</NavLink>
		</PadBox>
	);
}

export { Header };
