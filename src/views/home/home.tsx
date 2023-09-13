import {
	Cover,
	Stack,
	Center,
	PadBox,
	Cluster,
	Grid,
} from "@rosepath/react-layouts";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { ServiceTrack } from "../../models/service-track";

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
						<Stack key={serviceTrack.firstName} gutter="size0">
							<Cluster as="p">
								<p>Customer: </p>
								<p>
									{serviceTrack.firstName} {serviceTrack.lastName}
								</p>
							</Cluster>
							<Cluster as="p">
								<p>Vehicle: </p>
								<p>
									{serviceTrack.brand} {serviceTrack.model} {serviceTrack.year}
								</p>
							</Cluster>

							<Grid>
								{serviceTrack?.services.map((service) => (
									<Stack key={`${service.code}${service.date}`}>
										<Cluster as="p">
											<p>service: </p>
											<p>
												{service.code} {service.date} {service.cost}
											</p>
										</Cluster>
										<PadBox>{service.description}</PadBox>
									</Stack>
								))}
							</Grid>
						</Stack>
					))}
				</PadBox>
			</Center>
		</Cover>
	);
}

export { Home };
