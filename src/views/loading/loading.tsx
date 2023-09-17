import { Center, Cover } from "@rosepath/react-layouts";

function Loading() {
	return (
		<Cover topComponent={<></>} bottomComponent={<></>}>
			<Center
				hasChildrenCentered
				hasTextCentered
				maxWidth={"22.5rem"}
				className="is-align-content-center"
			>
				<h2 className="title is-4">Loading...</h2>
				<progress className="progress is-small is-primary" max="100">
					15%
				</progress>
			</Center>
		</Cover>
	);
}

export { Loading };
