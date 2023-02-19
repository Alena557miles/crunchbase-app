export function getValue(response) {
	const companyName = response.map((obj) => {
		return obj.identifier.value;
	});

	const short_description = response.map((obj) => {
		return obj.short_description;
	});
	const uuid = response.map((obj) => {
		return obj.identifier.uuid;
	});
	return [companyName, short_description, uuid];
}
