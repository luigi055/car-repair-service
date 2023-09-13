import { Service } from "../models/service-track";
import { Stack, PadBox, Cluster } from "@rosepath/react-layouts";

interface ServiceCardProps {
	service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
	return (
		<Stack key={`${service.code}${service.date}`}>
			<Cluster as="p">
				<p>service: </p>
				<p>
					{service.code} {service.date} {service.cost}
				</p>
			</Cluster>
			<PadBox>{service.description}</PadBox>
		</Stack>
	);
}

export { ServiceCard };
export type { ServiceCardProps };
