import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "@rosepath/react-layouts/dist/output.css";
import "./styles/styles.css";

function App() {
	return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
