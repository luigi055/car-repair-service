import { NavLink, NavLinkProps } from "react-router-dom";
import { PadBox, Switcher } from "@rosepath/react-layouts";
import { homePath, newServicePath } from "../routes";

function Header() {
	const generateActiveClass: NavLinkProps["className"] = ({ isActive }) => {
		if (isActive) return "active";
		return "";
	};

	return (
		<PadBox padding="size5" className="has-background-primary">
			<Switcher gutter="size1" className="is-justify-content-space-between">
				<NavLink to={homePath} className={generateActiveClass}>
					<h1 className="title is-4">Car Service Tracker</h1>
				</NavLink>
				<NavLink to={newServicePath} className={generateActiveClass}>
					Register new service
				</NavLink>
			</Switcher>
		</PadBox>
	);
}

export { Header };
