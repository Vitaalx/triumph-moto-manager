export const ok = (message: string, data: unknown) => ({
	status: "000",
	message: message || "Success",
	data,
});
