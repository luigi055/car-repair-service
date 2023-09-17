import { CarServiceTrack } from "../../../services/car-tracker";
import { ServiceTrack } from "../../service-track";

function adaptServiceTrackToCarService(
	serviceTrack: ServiceTrack
): CarServiceTrack {
	const { firstName, lastName, brand, model, year, services } = serviceTrack;

	return {
		firstName,
		lastName,
		make: brand,
		model,
		year,
		service: services.map(({ code, cost, date, description }) => ({
			code,
			cost,
			date,
			desc: description,
		})),
	};
}

export { adaptServiceTrackToCarService };
