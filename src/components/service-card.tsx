import { ServiceTrack } from "../models/service-track";
import { Stack, PadBox, Cluster, Grid } from "@rosepath/react-layouts";

interface ServiceCardProps {
	serviceTrack: ServiceTrack;
}

function ServiceCard({ serviceTrack }: ServiceCardProps) {
	return (
		<Stack gutter="size0">
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
	);
}

export { ServiceCard };
export type { ServiceCardProps };
