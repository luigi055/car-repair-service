import { Cover, Stack } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

function Home() {
	return (
		<Cover as={Stack} topComponent={<Header />} bottomComponent={<Footer />}>
			HOme
		</Cover>
	);
}

export { Home };
