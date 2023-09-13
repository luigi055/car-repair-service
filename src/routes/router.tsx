import { createBrowserRouter } from "react-router-dom";
import { homePath, newServicePath } from "./routes";

const router = createBrowserRouter([
	{
		path: homePath,
		Component() {
			return <h1>Home</h1>;
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
