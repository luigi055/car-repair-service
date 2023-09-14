function formatMoney(amount: number, isoCurrency: string) {
	return new Intl.NumberFormat(window.navigator.language, {
		style: "currency",
		currency: isoCurrency,
		maximumFractionDigits: 2,
	}).format(amount);
}

export { formatMoney };
