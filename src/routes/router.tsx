import { createBrowserRouter } from "react-router-dom";
import { homePath, newServicePath } from "./routes";
import { Home } from "../views/home";
import { NewService } from "../views/new-service";
import { NotFound } from "../views/not-found";

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
			return <NewService />;
		},
	},
	{
		path: "*",
		Component() {
			return <NotFound />;
		},
	},
]);

export { router };
