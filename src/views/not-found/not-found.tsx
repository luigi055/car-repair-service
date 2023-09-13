import { Cover, Stack } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

function NotFound() {
	return (
		<Cover as={Stack} topComponent={<Header />} bottomComponent={<Footer />}>
			Not Found
		</Cover>
	);
}

export { NotFound };
