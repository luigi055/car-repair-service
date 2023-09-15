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
			<div className="field">
				<label className="label" htmlFor={props.id}>
					{props.label}
				</label>
				<div className="control is-expanded ">
					<input
						id={props.id}
						className="input"
						{...input}
						type={props.type}
						placeholder={props.placeholder}
						defaultValue={props.defaultValue}
					/>
				</div>
				{meta.touched && meta.error && (
					<p className="help is-danger">{meta.error}</p>
				)}
			</div>
		)}
	/>
);

export { FieldText };
