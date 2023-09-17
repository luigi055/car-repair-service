import { byRole } from "testing-library-selector";
import { render, waitFor } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import App from "./app";

const ui = {
	brandHomeLink: byRole("link", { name: "Car Service Tracker" }),
	newServiceLink: byRole("link", { name: "Register new service" }),
	serviceTrackListSection: byRole("heading", { name: "Service track List:" }),
	serviceTrackCard: byRole("article", { name: "service track information" }),
};

describe("Testing the Home page", () => {
	it("should show the correct header with the name of the app and the call to action for registering a new service", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeDefined();
		});

		expect(ui.brandHomeLink.get()).toBeDefined();
		expect(ui.newServiceLink.get()).toBeDefined();
	});

	it("should show all the initial records coming from the api", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeDefined();
		});

		expect(ui.serviceTrackCard.getAll()).toHaveLength(4);
	});
});
