function formatDate(date: number | Date | undefined) {
	return new Intl.DateTimeFormat(window.navigator.language, {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

export { formatDate };
