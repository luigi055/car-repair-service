import { createBrowserRouter } from "react-router-dom";
import { homePath, newServicePath } from "./routes";
import { Home } from "../views/home";

const router = createBrowserRouter([
	{
		path: homePath,
		Component() {
			return <Home />;
		},
	},
	{
		path: newServicePath,
		Component() {
			return <h1>Create service</h1>;
		},
	},
	{
		path: "*",
		Component() {
			return <h1>Not found</h1>;
		},
	},
]);

export { router };
