export default function fetch(url, options) {
	return window
		.fetch(url, options)
		.then((response) => checkStatus(response))
		.then((response) => response.text())
		.then((text) => {
			try {
				return JSON.parse(text);
			} catch (err) {
				return text;
			}
		});
}

function checkStatus(response) {
	if (response.ok) {
		return response;
	}

	throw new Error(getErrorMessage(response.status));
}

function getErrorMessage(status) {
	switch (status) {
		case 404:
			return 'Not found';
		default:
			return status;
	}
}
