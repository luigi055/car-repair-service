import { byLabelText, byRole, byText } from "testing-library-selector";
import { userEvent } from "@testing-library/user-event";
import { render, waitFor, within } from "@testing-library/react";
import { it, expect, describe, beforeEach } from "vitest";
import App from "./app";
import { CarTrackerService } from "./services/car-tracker";

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
	codeRequiredMessage: byText("Code is required"),
	dateRequiredMessage: byText("Date is required"),
	costRequiredMessage: byText("Cost is required"),
	createButton: byRole("button", { name: "Create" }),
	successMessage: byRole("heading", {
		name: "The service has been successfully created!",
	}),
	takeMeHomeCTA: byRole("link", { name: "Take me home!" }),
	registerAnotherServiceCTA: byRole("button", {
		name: "Register another service",
	}),
	loading: byText("Loading..."),
};

it("should show the loading spinner when the page is loading", () => {
	render(<App />);

	expect(ui.loading.get()).toBeDefined();
});

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
	beforeEach(() => {
		const carTrackerService = new CarTrackerService();
		carTrackerService.reset();
	});

	it("should show all fields of the new service registration form", async () => {
		const user = userEvent.setup();
		render(<App />);

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
		expect(ui.createButton.get()).toBeDefined();
		expect(ui.createButton.get().disabled).toBe(true);
	});

	it("should enable the button when the user start filling any field", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get().disabled).toBe(true);

		await user.type(ui.firstNameField.get(), "Pedro");

		expect(ui.createButton.get().disabled).toBe(false);
	});

	it("should show all the required field's messages when the user try to submit without filling these fields", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get().disabled).toBe(true);
		expect(ui.codeRequiredMessage.query()).toBeNull();
		expect(ui.dateRequiredMessage.query()).toBeNull();
		expect(ui.costRequiredMessage.query()).toBeNull();

		await user.type(ui.firstNameField.get(), "Pedro");

		expect(ui.createButton.get().disabled).toBe(false);
		expect(ui.codeRequiredMessage.query()).toBeDefined();
		expect(ui.dateRequiredMessage.query()).toBeDefined();
		expect(ui.costRequiredMessage.query()).toBeDefined();
	});

	it("should create a new service registration", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get().disabled).toBe(true);
		expect(ui.codeRequiredMessage.query()).toBeNull();
		expect(ui.dateRequiredMessage.query()).toBeNull();
		expect(ui.costRequiredMessage.query()).toBeNull();

		await user.type(ui.firstNameField.get(), "Pedro");
		await user.type(ui.lastNameField.get(), "La Rosa");
		await user.type(ui.vehicleMakeField.get(), "Citroen");
		await user.type(ui.vehicleModelField.get(), "C4 Grand Picasso");
		await user.type(ui.vehicleYearField.get(), "2011");
		await user.type(ui.serviceDateField.get(), "2020-01-02");
		await user.type(ui.serviceCodeField.get(), "1001");
		await user.type(ui.serviceCostField.get(), "20");
		await user.type(
			ui.serviceDescriptionField.get(),
			"flat tired & Oil Change"
		);

		await user.click(ui.createButton.get());

		await waitFor(() => {
			expect(ui.successMessage.get());
		});

		expect(ui.successMessage.get()).toBeDefined();
		expect(ui.takeMeHomeCTA.get()).toBeDefined();
		expect(ui.registerAnotherServiceCTA.get()).toBeDefined();
	});

	it("should see the new registration in home page when the user clicks on the take me home button", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get().disabled).toBe(true);
		expect(ui.codeRequiredMessage.query()).toBeNull();
		expect(ui.dateRequiredMessage.query()).toBeNull();
		expect(ui.costRequiredMessage.query()).toBeNull();

		await user.type(ui.firstNameField.get(), "Pedro Luis");
		await user.type(ui.lastNameField.get(), "La Rosa");
		await user.type(ui.vehicleMakeField.get(), "Citroen");
		await user.type(ui.vehicleModelField.get(), "C4 Grand Picasso");
		await user.type(ui.vehicleYearField.get(), "2012");
		await user.type(ui.serviceDateField.get(), "2023-12-09");
		await user.type(ui.serviceCodeField.get(), "1001");
		await user.type(ui.serviceCostField.get(), "20");
		await user.type(
			ui.serviceDescriptionField.get(),
			"flat tired & Oil Change 2"
		);

		await user.click(ui.createButton.get());

		await waitFor(() => {
			expect(ui.successMessage.get());
		});

		expect(ui.successMessage.get()).toBeDefined();

		await user.click(ui.takeMeHomeCTA.get());

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeDefined();
		});

		expect(ui.serviceTrackCard.getAll()).toHaveLength(5);

		const serviceInformationArticle = within(ui.serviceTrackCard.getAll()[0]);

		expect(serviceInformationArticle.getByText("Pedro Luis La Rosa"));
		expect(
			serviceInformationArticle.getByText("Citroen C4 Grand Picasso 2012")
		);

		const services = serviceInformationArticle.getAllByRole("region", {
			name: "service information",
		});

		expect(services).toHaveLength(1);

		const firstServiceInformation = within(services[0]);

		expect(firstServiceInformation.getByText("Service: 1001")).toBeDefined();
		expect(firstServiceInformation.getByText("Cost: $20.00")).toBeDefined();
		expect(firstServiceInformation.getByText("December 9, 2023")).toBeDefined();
		expect(
			firstServiceInformation.getByText(
				"Description: flat tired & Oil Change 2"
			)
		).toBeDefined();
	});

	it("should go back to the registration service form to add another service registration", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get().disabled).toBe(true);
		expect(ui.codeRequiredMessage.query()).toBeNull();
		expect(ui.dateRequiredMessage.query()).toBeNull();
		expect(ui.costRequiredMessage.query()).toBeNull();

		await user.type(ui.firstNameField.get(), "Pedro");
		await user.type(ui.lastNameField.get(), "La Rosa");
		await user.type(ui.vehicleMakeField.get(), "Citroen");
		await user.type(ui.vehicleModelField.get(), "C4 Grand Picasso");
		await user.type(ui.vehicleYearField.get(), "2011");
		await user.type(ui.serviceDateField.get(), "2020-01-02");
		await user.type(ui.serviceCodeField.get(), "1001");
		await user.type(ui.serviceCostField.get(), "20");
		await user.type(
			ui.serviceDescriptionField.get(),
			"flat tired & Oil Change"
		);

		await user.click(ui.createButton.get());

		await waitFor(() => {
			expect(ui.successMessage.get());
		});

		await user.click(ui.registerAnotherServiceCTA.get());

		expect(ui.firstNameField.get().value).toBe("");
		expect(ui.lastNameField.get().value).toBe("");
		expect(ui.vehicleMakeField.get().value).toBe("");
		expect(ui.vehicleModelField.get().value).toBe("");
		expect(ui.vehicleYearField.get().value).toBe("");
		expect(ui.serviceCodeField.get().value).toBe("");
		expect(ui.serviceDateField.get().value).toBe("");
		expect(ui.serviceCostField.get().value).toBe("");
		expect(ui.serviceDescriptionField.get().value).toBe("");
	});
});
