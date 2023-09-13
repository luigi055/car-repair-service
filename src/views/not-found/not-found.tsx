import { Cover } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

function NotFound() {
	return (
		<Cover as={"main"} topComponent={<Header />} bottomComponent={<Footer />}>
			Not Found
		</Cover>
	);
}

export { NotFound };
