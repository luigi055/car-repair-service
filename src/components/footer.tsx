import { Center, PadBox } from "@rosepath/react-layouts";

function Footer() {
	return (
		<PadBox as="footer" padding="size4">
			<Center as="p" hasTextCentered>
				Made by Pedro La Rosa
			</Center>
		</PadBox>
	);
}

export { Footer };
