import { Cover } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { NewServiceForm } from "./components/new-service-form";

function NewService() {
	return (
		<div className="has-background-primary has-text-black-bis">
			<Cover as="main" topComponent={<Header />} bottomComponent={<Footer />}>
				<NewServiceForm />
			</Cover>
		</div>
	);
}

export { NewService };
