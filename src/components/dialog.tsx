import { Imposter } from "@rosepath/react-layouts";
import { HTMLAttributes } from "react";

interface DialogProps extends HTMLAttributes<HTMLElement> {
	isOpen: boolean;
}

function Dialog(props: DialogProps) {
	const { className, isOpen, children, ...rest } = props;
	if (!isOpen) return null;
	return (
		<div className={`${className} dialog`}>
			<Imposter placement="middle" {...rest}>
				{children}
			</Imposter>
		</div>
	);
}

export { Dialog };
