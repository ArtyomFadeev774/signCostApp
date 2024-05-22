// const message = document.querySelector(".notify__message--hidden");
// const cross = document.querySelector(".notify__cross");
// const textMsg = document.querySelector(".notify__text");

function showMessage(text) {
	// textMsg.innerHTML = text;
	// message.classList.remove("notify__message--hidden");
	// message.classList.add("notify__message");
	// isShownMessage = true;
	Toastify({
		text,
		duration: 3000,
		newWindow: true,
		close: true,
		gravity: "top", // `top` or `bottom`
		position: "right", // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		className: "test",
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
			position: "fixed",
			zIndex: "3",
		},
		onClick: function () {}, // Callback after click
	}).showToast();
}

// function hideMessage() {
// 	message.classList.add("notify__message--hidden");
// 	message.classList.remove("notify__message");
// 	isShownMessage = false;
// }

// cross.addEventListener("click", hideMessage);

// let timeClose;
// let isShownMessage = false;

// setInterval(() => {
// 	if (message.classList.contains("notify__message")) {
// 		timeClose = setTimeout(hideMessage, 5000);
// 	}
// }, 500);
