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

	expect(ui.loading.get()).toBeInTheDocument();
});

describe("Testing the Home page", () => {
	it("should show the correct header with the name of the app and the call to action for registering a new service", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeInTheDocument();
		});

		expect(ui.brandHomeLink.get()).toBeInTheDocument();
		expect(ui.newServiceLink.get()).toBeInTheDocument();
	});

	it("should show all the initial records coming from the api", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeInTheDocument();
		});

		expect(ui.serviceTrackCard.getAll()).toHaveLength(4);
	});

	it("should show all elements of a service track information card", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeInTheDocument();
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

		expect(
			firstServiceInformation.getByText("Service: 1001")
		).toBeInTheDocument();
		expect(
			firstServiceInformation.getByText("Cost: $36.42")
		).toBeInTheDocument();
		expect(
			firstServiceInformation.getByText("March 13, 2019")
		).toBeInTheDocument();
		expect(
			firstServiceInformation.getByText("Description: Oil change")
		).toBeInTheDocument();

		const secondServiceInformation = within(services[1]);

		expect(
			secondServiceInformation.getByText("Service: 1003")
		).toBeInTheDocument();
		expect(
			secondServiceInformation.getByText("Cost: $206.14")
		).toBeInTheDocument();
		expect(
			secondServiceInformation.getByText("March 13, 2019")
		).toBeInTheDocument();
		expect(
			secondServiceInformation.getByText("Description: A/C recharge")
		).toBeInTheDocument();
	});

	it("should show the correct footer information", async () => {
		render(<App />);

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeInTheDocument();
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

		expect(ui.firstNameField.get()).toBeInTheDocument();
		expect(ui.lastNameField.get()).toBeInTheDocument();
		expect(ui.vehicleMakeField.get()).toBeInTheDocument();
		expect(ui.vehicleModelField.get()).toBeInTheDocument();
		expect(ui.vehicleYearField.get()).toBeInTheDocument();
		expect(ui.serviceCodeField.get()).toBeInTheDocument();
		expect(ui.serviceDateField.get()).toBeInTheDocument();
		expect(ui.serviceCostField.get()).toBeInTheDocument();
		expect(ui.serviceDescriptionField.get()).toBeInTheDocument();
		expect(ui.createButton.get()).toBeInTheDocument();
		expect(ui.createButton.get()).toBeDisabled();
	});

	it("should enable the button when the user start filling any field", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get()).toBeDisabled();

		await user.type(ui.firstNameField.get(), "Pedro");

		expect(ui.createButton.get()).not.toBeDisabled();
	});

	it("should show all the required field's messages when the user try to submit without filling these fields", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get()).toBeDisabled();
		expect(ui.codeRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.dateRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.costRequiredMessage.query()).not.toBeInTheDocument();

		await user.type(ui.firstNameField.get(), "Pedro");

		expect(ui.createButton.get()).not.toBeDisabled();

		await user.click(ui.createButton.get());

		expect(ui.codeRequiredMessage.query()).toBeInTheDocument();
		expect(ui.dateRequiredMessage.query()).toBeInTheDocument();
		expect(ui.costRequiredMessage.query()).toBeInTheDocument();
	});

	it("should create a new service registration", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get()).toBeDisabled();
		expect(ui.codeRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.dateRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.costRequiredMessage.query()).not.toBeInTheDocument();

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

		expect(ui.successMessage.get()).toBeInTheDocument();
		expect(ui.takeMeHomeCTA.get()).toBeInTheDocument();
		expect(ui.registerAnotherServiceCTA.get()).toBeInTheDocument();
	});

	it("should see the new registration in home page when the user clicks on the take me home button", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get()).toBeDisabled();
		expect(ui.codeRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.dateRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.costRequiredMessage.query()).not.toBeInTheDocument();

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

		expect(ui.successMessage.get()).toBeInTheDocument();

		await user.click(ui.takeMeHomeCTA.get());

		await waitFor(() => {
			expect(ui.serviceTrackListSection.get()).toBeInTheDocument();
		});

		expect(ui.serviceTrackCard.getAll()).toHaveLength(5);

		const serviceInformationArticle = within(ui.serviceTrackCard.getAll()[0]);

		expect(
			serviceInformationArticle.getByText("Pedro Luis La Rosa")
		).toBeInTheDocument();
		expect(
			serviceInformationArticle.getByText("Citroen C4 Grand Picasso 2012")
		).toBeInTheDocument();

		const services = serviceInformationArticle.getAllByRole("region", {
			name: "service information",
		});

		expect(services).toHaveLength(1);

		const firstServiceInformation = within(services[0]);

		expect(
			firstServiceInformation.getByText("Service: 1001")
		).toBeInTheDocument();
		expect(
			firstServiceInformation.getByText("Cost: $20.00")
		).toBeInTheDocument();
		expect(
			firstServiceInformation.getByText("December 9, 2023")
		).toBeInTheDocument();
		expect(
			firstServiceInformation.getByText(
				"Description: flat tired & Oil Change 2"
			)
		).toBeInTheDocument();
	});

	it("should go back to the registration service form to add another service registration", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(ui.newServiceLink.get());

		expect(ui.createButton.get()).toBeDisabled();
		expect(ui.codeRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.dateRequiredMessage.query()).not.toBeInTheDocument();
		expect(ui.costRequiredMessage.query()).not.toBeInTheDocument();

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

		expect(ui.firstNameField.get()).toHaveDisplayValue("");
		expect(ui.lastNameField.get()).toHaveDisplayValue("");
		expect(ui.vehicleMakeField.get()).toHaveDisplayValue("");
		expect(ui.vehicleModelField.get()).toHaveDisplayValue("");
		expect(ui.vehicleYearField.get()).toHaveDisplayValue("");
		expect(ui.serviceCodeField.get()).toHaveDisplayValue("");
		expect(ui.serviceDateField.get()).toHaveDisplayValue("");
		expect(ui.serviceCostField.get()).toHaveDisplayValue("");
		expect(ui.serviceDescriptionField.get()).toHaveDisplayValue("");
	});
});
