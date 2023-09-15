import { Center, Stack, PadBox, Cluster, Cover } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Link } from "react-router-dom";
import { homePath } from "../../routes";

function NotFound() {
	return (
		<Cover as={"main"} topComponent={<Header />} bottomComponent={<Footer />}>
			<Center>
				<PadBox className="box has-background-primary" padding="size4">
					<PadBox className="box has-background-white">
						<Stack as={Center} hasTextCentered>
							<h2 className="title is-5 has-text-black-ter">
								Ops! This page doesn't exist
							</h2>
							<Stack as={Center} hasTextCentered gutter="size4">
								<Cluster as={Center} gutter="size4">
									<Link to={homePath} className="button is-link is-light">
										Take me back home
									</Link>
								</Cluster>
							</Stack>
						</Stack>
					</PadBox>
				</PadBox>
			</Center>
		</Cover>
	);
}

export { NotFound };
