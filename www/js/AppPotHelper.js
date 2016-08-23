function nullToBlank(str) {
	return str == null ? "" : str;
}

function throwErrorIfErrorStatus (response) {
	if (response.data.status === "error") {
		var error = new Error(response.data.description);
		error.code = response.data.errCode;
		throw error;
	}
}