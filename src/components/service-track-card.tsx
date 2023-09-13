import { ServiceTrack } from "../models/service-track";
import { Stack, Cluster, Grid } from "@rosepath/react-layouts";
import { ServiceCard } from "./service-card";

interface ServiceTrackCardProps {
	serviceTrack: ServiceTrack;
}

function ServiceTrackCard({ serviceTrack }: ServiceTrackCardProps) {
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
					<ServiceCard
						key={`${service.code}${service.date}`}
						service={service}
					/>
				))}
			</Grid>
		</Stack>
	);
}

export { ServiceTrackCard };
export type { ServiceTrackCardProps };
