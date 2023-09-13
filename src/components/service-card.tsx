import { Service } from "../models/service-track";
import { Stack, PadBox, Cluster } from "@rosepath/react-layouts";

interface ServiceCardProps {
	service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
	return (
		<PadBox
			className="box has-background-grey-darker has-text-white-bis"
			padding={["size3", "size4", "size4"]}
		>
			<Stack gutter="size3" key={`${service.code}${service.date}`}>
				<div className="is-flex is-justify-content-space-between">
					<p className="">
						Service:{"  "}
						<strong className=" has-text-white-bis">{service.code}</strong>
					</p>
					<p className="is-size-7">{service.date}</p>
				</div>
				<Cluster as="p">
					<p>Cost: {service.cost}</p>
				</Cluster>
				<PadBox>Description: {service.description}</PadBox>
			</Stack>
		</PadBox>
	);
}

export { ServiceCard };
export type { ServiceCardProps };
