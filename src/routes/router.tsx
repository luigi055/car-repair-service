import { createBrowserRouter, useLoaderData } from "react-router-dom";
import { homePath, newServicePath } from "./routes";
import { Home } from "../views/home";
import { NewService } from "../views/new-service";
import { NotFound } from "../views/not-found";
import { CarTrackerService } from "../services/car-tracker";
import { ServiceTrack } from "../models/service-track";
import { RootErrorBoundary } from "./error-boundary/root-error-boundary";
import { adaptCarServiceToServiceTrack } from "../models/adapters/in/adapt-car-service-to-service-track";

const router = createBrowserRouter([
	{
		path: homePath,
		async loader() {
			const carTracker = new CarTrackerService();
			const { tracks } = await carTracker.getCarServiceTracks();
			return tracks.map(adaptCarServiceToServiceTrack);
		},
		errorElement: <RootErrorBoundary />,
		Component() {
			const data = useLoaderData() as ServiceTrack[];
			return <Home serviceTracks={data} />;
		},
	},
	{
		path: newServicePath,
		errorElement: <RootErrorBoundary />,
		Component() {
			return <NewService />;
		},
	},
	{
		path: "*",
		errorElement: <RootErrorBoundary />,
		Component() {
			return <NotFound />;
		},
	},
]);

export { router };
