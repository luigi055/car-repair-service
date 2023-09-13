import { Cover } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

function NewService() {
	return (
		<Cover as="main" topComponent={<Header />} bottomComponent={<Footer />}>
			New Service
		</Cover>
	);
}

export { NewService };
