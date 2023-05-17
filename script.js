// Get the input box and button elements
const inputBox = document.getElementById("input-box");
const generateButton = document.getElementById("generate-button");

// Get the QR code div and error message div
const qrCodeDiv = document.getElementById("qr-code");
const errorMessageDiv = document.getElementById("error-message");

// Get the save button element
const saveButton = document.getElementById("save-button");

// Add an event listener to the generate button
generateButton.addEventListener("click", () => {
	// Get the user's input
	const userInput = inputBox.value.trim();

	// If the user's input is empty, display an error message
	if (userInput === "") {
		errorMessageDiv.innerHTML = "Please enter a valid link";
		qrCodeDiv.innerHTML = "";
		saveButton.disabled = true;
		return;
	}

	// Generate the QR code
	qrCodeDiv.innerHTML = "";
	const qrCode = new QRCode(qrCodeDiv, {
		text: userInput,
		width: 200,
		height: 200,
		colorDark: "#7289da",
		colorLight: "white",
		correctLevel: QRCode.CorrectLevel.H
	});

	// Clear the error message
	errorMessageDiv.innerHTML = "";

	// Enable the save button
	saveButton.disabled = false;
});

// Add an event listener to the save button
saveButton.addEventListener("click", () => {
	// Get the data URL of the QR code image
	const dataUrl = qrCodeDiv.querySelector("img").src;

	// Create a new anchor element with the data URL as the href attribute
	const link = document.createElement("a");
	link.href = dataUrl;

	// Set the filename of the download
	link.download = "qr-code.png";

	// Add the anchor element to the page and click it to trigger the download
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
});
