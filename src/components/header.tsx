import { NavLink, NavLinkProps } from "react-router-dom";
import { PadBox, Switcher } from "@rosepath/react-layouts";
import { homePath, newServicePath } from "../routes";

function Header() {
	const generateActiveClass: NavLinkProps["className"] = ({ isActive }) => {
		if (isActive) return "active";
		return "";
	};

	return (
		<PadBox
			as={Switcher}
			padding="size5"
			align="center"
			justify="start"
			gutter="size3"
			switchAt="20rem"
			className="has-background-primary is-justify-content-space-between"
		>
			<NavLink to={homePath} className={generateActiveClass}>
				<h1 className="title is-4 ">Car Service Tracker</h1>
			</NavLink>
			<NavLink to={newServicePath} className={generateActiveClass}>
				<p className="button is-link is-dark">Register new service</p>
			</NavLink>
		</PadBox>
	);
}

export { Header };
