import data from "./track-mock-data";
let mockDB = data.slice();

interface Service {
	code: number;
	desc: string;
	date: string;
	cost: string;
}

interface CarServiceTrack {
	firstName: string;
	lastName: string;
	year: number;
	make: string;
	model: string;
	service: Service[];
}

interface GetCarServiceTrackRequest {
	tracks: CarServiceTrack[];
}

interface PostCarServiceTrackRequest {
	track: CarServiceTrack;
}

class CarTrackerService {
	public async getCarServiceTracks() {
		return new Promise<GetCarServiceTrackRequest>((resolve) => {
			setTimeout(
				() => resolve({ tracks: mockDB.slice().reverse() }),
				Math.random() * 1000
			);
		});
	}

	public async postCarServiceTracks(data: CarServiceTrack) {
		return new Promise<PostCarServiceTrackRequest>((resolve) => {
			setTimeout(() => {
				mockDB.push(data);
				resolve({ track: data });
			}, Math.random() * 1000);
		});
	}

	public async reset() {
		mockDB = data.slice();
	}
}

export { CarTrackerService };
export type { Service, CarServiceTrack as CarServiceTrack };
