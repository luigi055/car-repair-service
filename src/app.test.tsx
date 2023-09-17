import { byLabelText, byRole, byText } from "testing-library-selector";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, describe } from "vitest";
import App from "./app";

const ui = {
	brandHomeLink: byRole("link", { name: "Car Service Tracker" }),
	newServiceLink: byRole("link", { name: "Register new service" }),
	firstNameField: byRole("textbox", { name: "First name" }),
	lastNameField: byRole("textbox", { name: "Last name" }),
	vehicleMakeField: byRole("textbox", { name: "Make" }),
	vehicleModelField: byRole("textbox", { name: "Model" }),
	vehicleYearField: byRole("spinbutton", { name: "Year" }),
	serviceCodeField: byRole("spinbutton", { name: "Code" }),
	serviceDateField: byLabelText("Date"),
	serviceCostField: byRole("spinbutton", { name: "Cost" }),
	serviceDescriptionField: byRole("textbox", { name: "Description" }),
	createButton: byRole("button", { name: "Create" }),
	successMessage: byText("The service has been successfully created!"),
	takeMeHomeCTA: byRole("link", { name: "Take me home!" }),
	customerRowText: byText("Customer:"),
};

describe("Testing the Home page", () => {
	it("should display the brand text as heading", async () => {
		const user = userEvent.setup();
		render(<App />);

		await waitFor(() => {
			expect(ui.brandHomeLink.get()).toBeDefined();
		});

		expect(ui.brandHomeLink.get()).toBeDefined();

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

		await user.type(ui.serviceDateField.get(), "2020-01-02");
		await user.type(ui.serviceCodeField.get(), "1001");
		await user.type(ui.serviceCostField.get(), "20");

		await user.click(ui.createButton.get());

		await waitFor(() => {
			expect(ui.successMessage.get()).toBeDefined();
		});

		await user.click(ui.takeMeHomeCTA.get());

		await waitFor(() => {
			expect(ui.customerRowText.getAll()).toBeDefined();
		});
		screen.debug();
	});
});
