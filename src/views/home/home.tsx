import { Cover, Stack, Center, PadBox } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { ServiceTrack } from "../../models/service-track";
import { ServiceTrackCard } from "../../components/service-track-card";

interface HomeProps {
	serviceTracks: ServiceTrack[];
}

function Home(props: HomeProps) {
	return (
		<Cover as="main" topComponent={<Header />} bottomComponent={<Footer />}>
			<PadBox padding="size5">
				<Center as={Stack} maxWidth={"768px"}>
					<Stack as="section">
						<h2 className="title is-4">Service track List:</h2>
						{props.serviceTracks.map((serviceTrack) => (
							// TODO:
							// Since the service doesn't provide id per record
							// I had to use the combination of the first name and the last name
							<ServiceTrackCard
								key={serviceTrack.firstName}
								serviceTrack={serviceTrack}
							/>
						))}
					</Stack>
				</Center>
			</PadBox>
		</Cover>
	);
}

export { Home };
