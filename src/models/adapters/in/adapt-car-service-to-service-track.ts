import { CarServiceTrack } from "../../../services/car-tracker";
import { ServiceTrack } from "../../service-track";

function adaptCarServiceToServiceTrack(
	carServiceTrack: CarServiceTrack
): ServiceTrack {
	const { firstName, lastName, make, model, year, service } = carServiceTrack;

	return {
		firstName,
		lastName,
		brand: make,
		model,
		year,
		services: service.map(({ code, cost, date, desc }) => ({
			code,
			cost,
			date,
			description: desc,
		})),
	};
}

export { adaptCarServiceToServiceTrack };
