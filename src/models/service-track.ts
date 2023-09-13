interface Customer {
	firstName: string;
	lastName: string;
}

interface Vehicle {
	year: number;
	make: string;
	model: string;
}

interface Money {
	amount: number;
	currency: string;
}

interface Service {
	code: number;
	description: string;
	date: string;
	cost: Money;
}

interface ServiceTrack {
	firstName: string;
	lastName: string;
	year: number;
	make: string;
	model: string;
	services: Service[];
}

export type { Customer, Vehicle, Money, Service, ServiceTrack };
