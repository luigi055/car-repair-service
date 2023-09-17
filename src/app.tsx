import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./styles/styles.css";
import { Loading } from "./views/loading";

function App() {
	return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

export default App;
