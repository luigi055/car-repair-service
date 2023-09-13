import { Cover, Stack, Center, PadBox } from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { ServiceTrack } from "../../models/service-track";
import { ServiceCard } from "../../components/service-card";

interface HomeProps {
	serviceTracks: ServiceTrack[];
}

function Home(props: HomeProps) {
	return (
		<Cover as={Stack} topComponent={<Header />} bottomComponent={<Footer />}>
			<Center as={Stack} maxWidth={"768px"}>
				<PadBox as="section">
					{props.serviceTracks.map((serviceTrack) => (
						// TODO:
						// Since the service doesn't provide id per record
						// I had to use the combination of the first name and the last name
						<ServiceCard
							key={serviceTrack.firstName}
							serviceTrack={serviceTrack}
						/>
					))}
				</PadBox>
			</Center>
		</Cover>
	);
}

export { Home };
