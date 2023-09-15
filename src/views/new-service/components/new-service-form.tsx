import { Center, Stack, PadBox, Cluster } from "@rosepath/react-layouts";
import { Form, Field } from "react-final-form";
import { CarTrackerService } from "../../../services/car-tracker";
import { FieldText } from "../../../components/field-text";
import { FieldMoney } from "../../../components/field-money";
import { formatMoney } from "../../../toolkit/format-money";
import { formatDate } from "../../../toolkit/format-date";
import { useState } from "react";
import { SuccessDialog } from "./success-dialog";

const requiredWithMessage = (message: string) => (value: string) =>
	value ? undefined : message;

interface NewServiceFormFields {
	firstName: string;
	lastName: string;
	make: string;
	model: string;
	year: number;
	code: number;
	date: string;
	cost: number;
	description: string;
}

function NewServiceForm() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	async function handleFormSubmit(values: NewServiceFormFields) {
		const carService = new CarTrackerService();
		const format = {
			firstName: values.firstName,
			lastName: values.lastName,
			make: values.make,
			model: values.model,
			year: values.year,
			service: [
				{
					code: values.code,
					date: formatDate(new Date(values.date)),
					cost: formatMoney(values.cost, "USD"),
					desc: values.description,
				},
			],
		};
		await carService.postCarServiceTracks(format);
		setIsDialogOpen(true);
	}

	return (
		<PadBox padding="size4">
			<Center className="box " maxWidth={"756px"}>
				<h3 className="title is-3">Service Registration</h3>
				<Form
					onSubmit={handleFormSubmit}
					render={({ handleSubmit, form, submitting, pristine }) => (
						<Stack as="form" gutter="size5" onSubmit={handleSubmit}>
							<Cluster as={"fieldset"} gutter="size4">
								<legend className="title is-4">Customer Information</legend>

								<FieldText
									id="firstName"
									label="First name"
									type="text"
									placeholder="Enter the customer's first name"
								/>

								<FieldText
									id="lastName"
									label="Lastname"
									type="text"
									placeholder="Enter the customer's last name"
								/>
							</Cluster>

							<Cluster as={"fieldset"} gutter="size4">
								<legend className="title is-4">Vehicle Details</legend>

								<FieldText
									id="make"
									label="Make"
									type="text"
									placeholder="Eg: Ford"
								/>

								<FieldText
									id="model"
									label="Model"
									type="text"
									placeholder="Eg: Fiesta"
								/>

								<FieldText
									id="year"
									label="Year"
									type="number"
									placeholder="Eg: year"
								/>
							</Cluster>

							<Stack as="fieldset" gutter="size4">
								<legend className="title is-4">Service</legend>
								<Cluster gutter="size4">
									<FieldText
										id="code"
										label="Code"
										type="number"
										placeholder="Eg: 1005"
										validate={requiredWithMessage("Code is required")}
									/>
									<FieldText
										id="date"
										label="Date"
										type="date"
										defaultValue={formatDate(new Date())}
										validate={requiredWithMessage("Date is required")}
									/>
									<FieldMoney
										id="cost"
										label="Cost"
										type="number"
										placeholder="Eg. 50"
										currency="USD"
										validate={requiredWithMessage("Cost is required")}
									/>
								</Cluster>

								<div className="field">
									<label className="label" htmlFor="description">
										Description
									</label>
									<div className="control is-expanded ">
										<Field
											className="textarea"
											name="description"
											id="description"
											component="textarea"
											placeholder="brief description of the service"
										/>
									</div>
								</div>
							</Stack>

							<Cluster justify="end">
								<button
									className={`button is-primary `}
									type="submit"
									disabled={submitting || pristine}
								>
									Create
								</button>
							</Cluster>

							<SuccessDialog
								isOpen={isDialogOpen}
								onNewServiceClick={() => {
									form.reset();
									setIsDialogOpen(false);
								}}
							/>
						</Stack>
					)}
				/>
			</Center>
		</PadBox>
	);
}

export { NewServiceForm };
