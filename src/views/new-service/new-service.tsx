import { Cover, Stack } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

function NewService() {
	return (
		<Cover as={Stack} topComponent={<Header />} bottomComponent={<Footer />}>
			New Service
		</Cover>
	);
}

export { NewService };
