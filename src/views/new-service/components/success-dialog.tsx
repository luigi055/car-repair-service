import { Center, Stack, PadBox, Cluster } from "@rosepath/react-layouts";
import { Link } from "react-router-dom";
import { Dialog } from "../../../components/dialog";
import { homePath } from "../../../routes";

interface SuccessDialogProps {
	isOpen: boolean;
	onNewServiceClick: () => void;
}

function SuccessDialog(props: SuccessDialogProps) {
	const { isOpen, onNewServiceClick } = props;
	return (
		<Dialog isOpen={isOpen}>
			<PadBox className="box has-background-primary" padding="size4">
				<PadBox className="box has-background-white">
					<Stack as={Center} hasTextCentered>
						<h2 className="title is-5 has-text-black-ter">
							The service has been successfully created!
						</h2>
						<p className="subtitle is-6 ">
							You can see the new track in the home page
						</p>
						<Stack as={Center} hasTextCentered gutter="size4">
							<strong>Do you want to register another service?</strong>
							<Cluster as={Center} gutter="size4">
								<button
									className="button is-success is-light"
									onClick={onNewServiceClick}
								>
									Register another service
								</button>
								<Link to={homePath} className="button is-link is-light">
									Take me home!
								</Link>
							</Cluster>
						</Stack>
					</Stack>
				</PadBox>
			</PadBox>
		</Dialog>
	);
}

export { SuccessDialog };
