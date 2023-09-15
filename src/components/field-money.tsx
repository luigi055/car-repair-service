import { Stack } from "@rosepath/react-layouts";
import { Field } from "react-final-form";

const FieldMoney = (props: {
	label: string;
	placeholder?: string;
	type: string;
	id: string;
	currency?: string;
	validate?: (value: string) => string | undefined;
}) => (
	<Field
		name={props.id}
		validate={props.validate}
		render={({ input, meta }) => (
			<Stack>
				<label className="label" htmlFor={props.id}>
					{props.label}
				</label>
				<div className="field has-addons ">
					<div className="control is-expanded ">
						<Stack>
							<input
								id={props.id}
								className="input"
								{...input}
								type={props.type}
								placeholder={props.placeholder}
							/>
							{meta.error && meta.touched && (
								<p className="help is-danger">{meta.error}</p>
							)}
						</Stack>
					</div>
					<p className="control">
						<a className="button is-static">{props.currency}</a>
					</p>
				</div>
			</Stack>
		)}
	/>
);

export { FieldMoney };
