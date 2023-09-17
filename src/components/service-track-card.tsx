import { ServiceTrack } from "../models/service-track";
import { Stack, Cluster, PadBox, Sidebar } from "@rosepath/react-layouts";
import { ServiceCard } from "./service-card";

interface ServiceTrackCardProps {
	serviceTrack: ServiceTrack;
}

function ServiceTrackCard({ serviceTrack }: ServiceTrackCardProps) {
	return (
		<PadBox
			as="article"
			aria-label="service track information"
			className="box has-background-primary"
		>
			<Stack gutter="size4">
				<Sidebar fraction="1/2">
					<Cluster as="p">
						Customer:{" "}
						<strong>
							{serviceTrack.firstName} {serviceTrack.lastName}
						</strong>
					</Cluster>
					<Cluster as="p">
						Vehicle:{" "}
						<strong>
							{serviceTrack.brand} {serviceTrack.model} {serviceTrack.year}
						</strong>
					</Cluster>
				</Sidebar>

				<PadBox className="box has-background-success-light">
					<h3 className="title is-6">Services:</h3>
					{serviceTrack?.services.map((service) => (
						<ServiceCard
							key={`${service.code}${service.date}`}
							service={service}
						/>
					))}
				</PadBox>
			</Stack>
		</PadBox>
	);
}

export { ServiceTrackCard };
export type { ServiceTrackCardProps };
