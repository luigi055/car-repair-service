import { Center, PadBox } from "@rosepath/react-layouts";

function Footer() {
	return (
		<PadBox
			as="footer"
			padding="size3"
			className="has-background-grey-darker has-text-white"
		>
			<Center as="p" hasTextCentered>
				Made by Pedro La Rosa
			</Center>
		</PadBox>
	);
}

export { Footer };
