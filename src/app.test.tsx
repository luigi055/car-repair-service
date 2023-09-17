import { byLabelText, byRole } from "testing-library-selector";
import { userEvent } from "@testing-library/user-event";
import { render, waitFor, within } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import App from "./app";

const ui = {
	brandHomeLink: byRole("link", { name: "Car Service Tracker" }),
	newServiceLink: byRole("link", { name: "Register new service" }),
	serviceTrackListSection: byRole("heading", { name: "Service track List:" }),
	serviceTrackCard: byRole("article", { name: "service track information" }),
	footerInformation: byRole("contentinfo", { name: "" }),
	firstNameField: byRole("textbox", { name: "First name" }),
	lastNameField: byRole("textbox", { name: "Last name" }),
	vehicleMakeField: byRole("textbox", { name: "Make" }),
	vehicleModelField: byRole("textbox", { name: "Model" }),
	vehicleYearField: byRole("spinbutton", { name: "Year" }),
	serviceCodeField: byRole("spinbutton", { name: "Code" }),
	serviceDateField: byLabelText("Date"),
	serviceCostField: byRole("spinbutton", { name: "Cost" }),
	serviceDescriptionField: byRole("textbox", { name: "Description" }),
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

	it("should show all elements of a service track information card", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeDefined();
		});

		// the third article is going to be used as model since it contains more than one services
		const serviceInformationArticle = within(ui.serviceTrackCard.getAll()[2]);

		expect(serviceInformationArticle.getByText("Ralph Benson"));
		expect(serviceInformationArticle.getByText("Honda Civic 2014"));

		const services = serviceInformationArticle.getAllByRole("region", {
			name: "service information",
		});

		expect(services).toHaveLength(2);

		const firstServiceInformation = within(services[0]);

		expect(firstServiceInformation.getByText("Service: 1001")).toBeDefined();
		expect(firstServiceInformation.getByText("Cost: $36.42")).toBeDefined();
		expect(firstServiceInformation.getByText("March 13, 2019")).toBeDefined();
		expect(
			firstServiceInformation.getByText("Description: Oil change")
		).toBeDefined();

		const secondServiceInformation = within(services[1]);

		expect(secondServiceInformation.getByText("Service: 1003")).toBeDefined();
		expect(secondServiceInformation.getByText("Cost: $206.14")).toBeDefined();
		expect(secondServiceInformation.getByText("March 13, 2019")).toBeDefined();
		expect(
			secondServiceInformation.getByText("Description: A/C recharge")
		).toBeDefined();
	});

	it("should show the correct footer information", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeDefined();
		});

		expect(ui.footerInformation.get().textContent).toBe(
			"Made by Pedro La Rosa"
		);
	});
});

describe("Testing new service registration page", () => {
	it("should show all fields of the new service registration form", async () => {
		const user = userEvent.setup();
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeDefined();
		});

		await user.click(ui.newServiceLink.get());

		expect(ui.firstNameField.get()).toBeDefined();
		expect(ui.lastNameField.get()).toBeDefined();
		expect(ui.vehicleMakeField.get()).toBeDefined();
		expect(ui.vehicleModelField.get()).toBeDefined();
		expect(ui.vehicleYearField.get()).toBeDefined();
		expect(ui.serviceCodeField.get()).toBeDefined();
		expect(ui.serviceDateField.get()).toBeDefined();
		expect(ui.serviceCostField.get()).toBeDefined();
		expect(ui.serviceDescriptionField.get()).toBeDefined();
	});
});
