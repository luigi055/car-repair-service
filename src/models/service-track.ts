interface Customer {
	firstName: string;
	lastName: string;
}

interface Vehicle {
	year: number;
	brand: string;
	model: string;
}

interface Service {
	code: number;
	description: string;
	date: string;
	cost: string;
}

type ServiceTrack = Customer & Vehicle & { services: Service[] };

export type { Customer, Vehicle, Service, ServiceTrack };
