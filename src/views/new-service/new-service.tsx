import { Cover } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { NewServiceForm } from "./components/new-service-form";

function NewService() {
	return (
		<Cover as="main" topComponent={<Header />} bottomComponent={<Footer />}>
			<NewServiceForm />
		</Cover>
	);
}

export { NewService };
