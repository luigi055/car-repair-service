import { Box } from "@rosepath/react-box";
import { Field } from "react-final-form";

const FieldText = (props: {
	label: string;
	placeholder?: string;
	type: string;
	id: string;
	defaultValue?: string;
	currency?: string;
	validate?: (value: string) => string | undefined;
}) => (
	<Field
		name={props.id}
		validate={props.validate}
		render={({ input, meta }) => (
			<Box className="field">
				<label className="label" htmlFor={props.id}>
					{props.label}
				</label>
				<Box className="control is-expanded ">
					<input
						id={props.id}
						className="input"
						{...input}
						type={props.type}
						placeholder={props.placeholder}
						defaultValue={props.defaultValue}
					/>
				</Box>
				{meta.touched && meta.error && (
					<p className="help is-danger">{meta.error}</p>
				)}
			</Box>
		)}
	/>
);

export { FieldText };
