const rangeSelect = document.querySelector("#customRangeScale");
const btn = document.querySelector("#btn");

/* элементы для информирования */
const infoWidth = document.querySelector(".infoWidth");
const infoHeight = document.querySelector(".infoHeight");
const infoCornerType = document.querySelector(".infoCornerType");
const infoDublicate = document.querySelector(".infoDublicate");
const infoRotate = document.querySelector(".infoRotate");
const infoArea = document.querySelector(".infoArea");

/* вертикальных линии */
const verticalLinesInfo = document.querySelector(".vertical-lines-info");
const verticalLinesCoord = document.querySelector(".vertical-lines-coordinate");
/* горизонтальных линии */
const horizontalLinesInfo = document.querySelector(".horizontal-lines-info");
const horizontalLinesCoord = document.querySelector(
	".horizontal-lines-coordinate"
);
const btnSaveCosts = document.getElementById("btnSaveCosts");
let pgm25Cost = document.querySelector(`[data-js="25pgm"]`);
let pgm35Cost = document.querySelector(`[data-js="35pgm"]`);
let pgm45Cost = document.querySelector(`[data-js="45pgm"]`);
let pgm40Cost = document.querySelector(`[data-js="40pgm"]`);
let tapeCostHTML = document.querySelector(`[data-js="tape"]`);
let tapeCostSecondLayerHTML = document.querySelector(`[data-js="tape2"]`);
let tapeSecondLayerCoeff = document.querySelector(`[data-js="tape2coeff"]`);
// console.log(tapeCostSecondLayerHTML, tapeCostSecondLayerAreaHTML);
let zincCostHTML = document.querySelector(`[data-js="zink"]`);

function setCostValues() {
	pgm25Cost.value =
		localStorage.getItem("pgm25Cost") === null
			? 0
			: localStorage.getItem("pgm25Cost");
	pgm35Cost.value =
		localStorage.getItem("pgm35Cost") === null
			? 0
			: localStorage.getItem("pgm35Cost");
	pgm40Cost.value =
		localStorage.getItem("pgm40Cost") === null
			? 0
			: localStorage.getItem("pgm40Cost");
	pgm45Cost.value =
		localStorage.getItem("pgm45Cost") === null
			? 0
			: localStorage.getItem("pgm45Cost");
	tapeCostHTML.value =
		localStorage.getItem("tapeCost") === null
			? 0
			: localStorage.getItem("tapeCost");
	zincCostHTML.value =
		localStorage.getItem("zincCost") === null
			? 0
			: localStorage.getItem("zincCost");
	tapeCostSecondLayerHTML.value =
		localStorage.getItem("tape2Cost") == null
			? 0
			: localStorage.getItem("tape2Cost");
	tapeSecondLayerCoeff.value =
		localStorage.getItem("tape2coeff") == null
			? 0
			: localStorage.getItem("tape2coeff");
}
setCostValues();

function infoAboutSignV2() {
	if (sign.isDublicate) {
		infoHeight.innerHTML =
			"<strong>" +
			"1 часть: " +
			"<code>" +
			sign.height +
			" мм" +
			" (" +
			(sign.height / 1000).toFixed(2) +
			"м" +
			") " +
			"</code>" +
			(sign.isDublicate ? "<br>" : "") +
			"2 часть: " +
			"<code>" +
			sign.secondSign.height +
			" мм" +
			" (" +
			(sign.secondSign.height / 1000).toFixed(2) +
			"м" +
			")" +
			"</code>" +
			"</strong>";
		infoCornerType.innerHTML = "<code>40</code> (профильная труба)";
	} else {
		infoHeight.innerHTML =
			"<strong>" +
			"<code>" +
			sign.height +
			" мм" +
			" (" +
			(sign.height / 1000).toFixed(2) +
			"м" +
			") " +
			"</code>" +
			"</strong>";
		infoCornerType.innerHTML =
			"<code>" + sign.cornerType + "</code> (профильная труба)";
	}

	infoWidth.innerHTML =
		"<strong>" +
		"<code>" +
		sign.width +
		" мм" +
		" (" +
		(sign.width / 1000).toFixed(2) +
		"м" +
		")" +
		"</code>" +
		"</strong>";

	infoCornerType.innerHTML =
		sign.cornerType == 40
			? "<code>40</code> (профильная труба)"
			: sign.cornerType;

	infoDublicate.innerHTML = sign.isDublicate
		? "<code>Да</code>"
		: "<code>Нет</code>";
	infoRotate.innerHTML = sign.isRotate ? "<code>Да</code>" : "<code>Нет</code>";
	infoArea.innerHTML = `<code>${((sign.width * sign.height) / 1000000).toFixed(
		2
	)} м^2</code>`;
	infoArea.innerHTML += sign.isDublicate
		? `<br><strong>2 часть:</strong> <code>${(
				(sign.secondSign?.width * sign.secondSign?.height) /
				1000000
		  ).toFixed(2)} м^2</code>`
		: "";
}

let isHas25V;
let isHas35V;
let isHas45V;
let isHas40V;
let isHas25VD;
let isHas35VD;
let isHas45VD;
let isHas40VD;

function infoAboutVerticalLines() {
	verticalLinesInfo.innerHTML = "";
	sign.verticalLinesReal.map((element, index) => {
		verticalLinesInfo.innerHTML +=
			"<strong>Высота:</strong>  " +
			"<code>" +
			element.height +
			" мм. (" +
			(element.height / 1000).toFixed(2) +
			" м.)" +
			"</code>" +
			"<strong>" +
			" Уголок: " +
			"<code>" +
			element.lineCornerType +
			"</code>" +
			"</strong>" +
			"<br>" +
			"<hr>";
	});

	isHas25V = sign.verticalLinesReal.filter(
		(item) => item.lineCornerType === 25
	);
	isHas35V = sign.verticalLinesReal.filter(
		(item) => item.lineCornerType === 35
	);
	isHas45V = sign.verticalLinesReal.filter(
		(item) => item.lineCornerType === 45
	);
	isHas40V = sign.verticalLinesReal.filter(
		(item) => item.lineCornerType === 40
	);

	if (sign.isDublicate) {
		isHas25VD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 25
		);
		isHas35VD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 35
		);
		isHas45VD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 45
		);
		isHas40VD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 40
		);
	}

	function printCommonInfo(cornerType) {
		let res = sign.verticalLinesReal.reduce((sum, item) => {
			if (item.lineCornerType === cornerType) {
				return sum + item.height;
			} else {
				return sum + 0;
			}
		}, 0);

		verticalLinesInfo.innerHTML +=
			`<strong>Общая длина ${cornerType} уголка: </strong>` +
			"<code>" +
			res +
			" мм." +
			" (" +
			(res / 1000).toFixed(2) +
			" м.) </code>" +
			"<br>";
	}

	function printCommonInfoDublicate(cornerType) {
		let res = sign.secondSign.verticalLinesReal.reduce((sum, item) => {
			if (item.lineCornerType === cornerType) {
				return sum + item.height;
			} else {
				return sum + 0;
			}
		}, 0);

		verticalLinesInfo.innerHTML +=
			`<strong>Общая длина 2 части ${cornerType} уголка: </strong>` +
			"<code>" +
			res +
			" мм." +
			" (" +
			(res / 1000).toFixed(2) +
			" м.) </code>" +
			"<br>";
	}

	if (isHas25V.length !== 0) {
		printCommonInfo(25);
		if (sign.isDublicate) {
			printCommonInfoDublicate(25);
		}
	}
	if (isHas35V.length !== 0) {
		printCommonInfo(35);
		if (sign.isDublicate) {
			printCommonInfoDublicate(35);
		}
	}
	if (isHas45V.length !== 0) {
		printCommonInfo(45);
		if (sign.isDublicate) {
			printCommonInfoDublicate(45);
		}
	}
	if (isHas40V.length !== 0) {
		printCommonInfo(40);
		if (sign.isDublicate) {
			printCommonInfoDublicate(40);
		}
	}
	verticalLinesInfo.innerHTML += `<strong>Общая длина каркаса ${
		sign.cornerType
	} уголка (верт. линии):</strong> <code>${sign.height * 2} мм. (${
		(sign.height * 2) / 1000
	} м.)</code><br>`;
	if (sign.isDublicate) {
		verticalLinesInfo.innerHTML += `<strong>Общая длина каркаса 2 части ${
			sign.secondSign.cornerType
		} уголка (верт. линии):</strong> <code>${sign.secondSign.height * 2} мм. (${
			(sign.secondSign.height * 2) / 1000
		} м.)</code>`;
	}
}

let isHas25H;
let isHas35H;
let isHas45H;
let isHas40H;
let isHas25HD;
let isHas35HD;
let isHas45HD;
let isHas40HD;

function infoAboutHorizontalLines() {
	horizontalLinesInfo.innerHTML = "";
	sign.horizontalLinesReal.map((element) => {
		horizontalLinesInfo.innerHTML +=
			"<strong>Длина:</strong>  " +
			"<code>" +
			element.width +
			" мм(" +
			(element.width / 1000).toFixed(2) +
			" м)" +
			"</code>" +
			"<strong>" +
			" Уголок: " +
			"<code>" +
			element.lineCornerType +
			"</code>" +
			"</strong>" +
			"<br>" +
			"<hr>";
	});

	isHas25H = sign.horizontalLinesReal.filter(
		(item) => item.lineCornerType === 25
	);
	isHas35H = sign.horizontalLinesReal.filter(
		(item) => item.lineCornerType === 35
	);
	isHas45H = sign.horizontalLinesReal.filter(
		(item) => item.lineCornerType === 45
	);
	isHas40H = sign.horizontalLinesReal.filter(
		(item) => item.lineCornerType === 40
	);

	if (sign.isDublicate) {
		isHas25HD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 25
		);
		isHas35HD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 35
		);
		isHas45HD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 45
		);
		isHas40HD = sign.secondSign.verticalLinesReal.filter(
			(item) => item.lineCornerType === 40
		);
	}

	function printCommonInfo(cornerType) {
		let res = sign.horizontalLinesReal.reduce((sum, item) => {
			if (item.lineCornerType === cornerType) {
				return sum + item.width;
			} else {
				return sum + 0;
			}
		}, 0);

		horizontalLinesInfo.innerHTML +=
			`<strong>Общая длина ${cornerType} уголка: </strong>` +
			"<code>" +
			res +
			"мм" +
			" (" +
			(res / 1000).toFixed(2) +
			" м) </code>" +
			"<br>";
	}

	function printCommonInfoDublicate(cornerType) {
		let res = sign.secondSign.horizontalLinesReal.reduce((sum, item) => {
			if (item.lineCornerType === cornerType) {
				return sum + item.width;
			} else {
				return sum + 0;
			}
		}, 0);

		horizontalLinesInfo.innerHTML +=
			`<strong>Общая длина 2 части ${cornerType} уголка: </strong>` +
			"<code>" +
			res +
			"мм" +
			" (" +
			(res / 1000).toFixed(2) +
			" м) </code>" +
			"<br>";
	}

	if (isHas25H.length !== 0) {
		printCommonInfo(25);
		if (sign.isDublicate) {
			printCommonInfoDublicate(25);
		}
	}
	if (isHas35H.length !== 0) {
		printCommonInfo(35);
		if (sign.isDublicate) {
			printCommonInfoDublicate(35);
		}
	}
	if (isHas45H.length !== 0) {
		printCommonInfo(45);
		if (sign.isDublicate) {
			printCommonInfoDublicate(45);
		}
	}
	if (isHas40H.length !== 0) {
		printCommonInfo(40);
		if (sign.isDublicate) {
			printCommonInfoDublicate(40);
		}
	}
	// каркас

	horizontalLinesInfo.innerHTML += `<strong>Общая длина каркаса ${
		sign.cornerType
	} уголка (гор. линии):</strong> <code>${sign.width * 2} мм. (${
		(sign.width * 2) / 1000
	} м.)</code><br>`;
	if (sign.isDublicate) {
		horizontalLinesInfo.innerHTML += `<strong>Общая длина каркаса 2 части ${
			sign.secondSign.cornerType
		} уголка (гор. линии):</strong> <code>${sign.secondSign.width * 2} мм. (${
			(sign.secondSign.width * 2) / 1000
		} м.)</code>`;
	}
}

function sortLinesByPos(array, key) {
	function compareLines(a, b) {
		if (+a[key + "0"] > +b[key + "0"]) return 1;
		if (+a[key + "0"] == +b[key + "0"]) return 0;
		if (+a[key + "0"] < +b[key + "0"]) return -1;
	}

	array.sort(compareLines);
}

function calculation() {
	let res = document.querySelector(".result");

	// вертикальные линии
	// console.log(sign, isHas25V, isHas35V, isHas40V, isHas45V);
	let sum25V = 0;
	let sum35V = 0;
	let sum45V = 0;
	let sum40V = 0; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	let sum25VD;
	let sum35VD;
	let sum45VD;
	let sum40VD;
	if (isHas25V.length !== 0) {
		sum25V = isHas25V.reduce((acc, item) => {
			return acc + item.height;
		}, 0);
		sum25V /= 1000;
		sum25V *= +pgm25Cost.value; //руб
	}
	if (isHas35V.length !== 0) {
		sum35V = isHas35V.reduce((acc, item) => {
			return acc + item.height;
		}, 0);
		sum35V /= 1000;
		sum35V *= +pgm35Cost.value; //руб
	}
	if (isHas45V.length !== 0) {
		sum45V = isHas45V.reduce((acc, item) => {
			return acc + item.height;
		}, 0);
		sum45V /= 1000;
		sum45V *= +pgm45Cost.value; // руб
	}
	if (isHas40V.length !== 0) {
		sum45V = isHas40V.reduce((acc, item) => {
			return acc + item.height;
		}, 0);
		sum40V /= 1000;
		sum40V *= +pgm40Cost.value; // руб
	}
	if (sign.isDublicate) {
		if (isHas25VD.length !== 0) {
			sum25VD = isHas25VD.reduce((acc, item) => {
				return acc + item.height;
			}, 0);
			sum25VD /= 1000;
			sum25VD *= +pgm25Cost.value; // руб
		}
		if (isHas35VD.length !== 0) {
			sum35VD = isHas35VD.reduce((acc, item) => {
				return acc + item.height;
			}, 0);
			sum35VD /= 1000;
			sum35VD *= +pgm35Cost.value; // руб
		}
		if (isHas45VD.length !== 0) {
			sum45VD = isHas45VD.reduce((acc, item) => {
				return acc + item.height;
			}, 0);
			sum45VD /= 1000;
			sum45VD *= +pgm45Cost.value; // руб
		}
		if (isHas40VD.length !== 0) {
			sum40VD = isHas40VD.reduce((acc, item) => {
				return acc + item.height;
			}, 0);
			sum40VD /= 1000;
			sum40VD *= +pgm40Cost.value; // руб
		}
	}

	res.innerHTML = "";
	res.innerHTML += "<h5>Вертикальные линии:</h5>";

	sortLinesByPos(sign.verticalLinesReal, "x");
	sortLinesByPos(sign.verticalLines, "x");
	if (sign.isDublicate) {
		sortLinesByPos(sign.secondSign.verticalLinesReal, "x");
		sortLinesByPos(sign.secondSign.verticalLines, "x");
	}
	sign.verticalLinesReal.forEach((element, index, arr) => {
		res.innerHTML +=
			`<div style="display: inline" data-js="Vinfo-${index}">` +
			`<button onClick=removeAllV(${index})>` +
			`<i class="bi bi-archive"></i>` +
			"</button>" +
			" Уголок: " +
			"<code>" +
			element.lineCornerType +
			"(" +
			(element.height / 1000).toFixed(2) +
			" м)" +
			`${index === arr.length - 1 ? "" : " + "}` +
			"</code></div>";
	});
	const h = sign.height + sign.secondSign?.height;

	if (h >= 2300 && h <= 2500) {
		res.innerHTML += "<br/>";
		res.innerHTML += "<h5>2 часть знака (вертикальные линии):</h5>";
		sign.secondSign.verticalLinesReal.forEach((element, index, arr) => {
			res.innerHTML +=
				`<div style="display: inline" data-js="VDinfo-${index}">` +
				`<button onClick=removeAllV(${index})>` +
				`<i class="bi bi-archive"></i>` +
				"</button>" +
				" Уголок: " +
				"<code>" +
				element.lineCornerType +
				"(" +
				(element.height / 1000).toFixed(2) +
				" м)" +
				`${index === arr.length - 1 ? "" : " + "}` +
				"</code></div>";
		});
	}

	let overSumV = 0;
	let overSumVD = 0;
	overSumV = sum25V === undefined ? overSumV : overSumV + sum25V;
	overSumV = sum35V === undefined ? overSumV : overSumV + sum35V;
	overSumV = sum40V === undefined ? overSumV : overSumV + sum40V;
	overSumV = sum45V === undefined ? overSumV : overSumV + sum45V;
	// second sign sum calculation
	overSumVD = sum25VD === undefined ? overSumVD : overSumVD + sum25VD;
	overSumVD = sum35VD === undefined ? overSumVD : overSumVD + sum35VD;
	overSumVD = sum45VD === undefined ? overSumVD : overSumVD + sum45VD;
	overSumVD = sum40VD === undefined ? overSumVD : overSumVD + sum40VD;

	let endSumV = overSumV + overSumVD; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
	// console.log(endSumV), 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
	res.innerHTML += "<br>";
	res.innerHTML += `<h5 class="badge text-bg-primary text-wrap fs-5 mt-2">Стоимость вертикальных уголков: ${endSumV
		.toFixed()
		.toString()} руб.</h5>`;

	// горизонтальные линии

	res.innerHTML += "<h5>Горизонтальные линии:</h5>";

	let sum25H = 0;
	let sum35H = 0;
	let sum40H = 0;
	let sum45H = 0;

	let sum25HD;
	let sum35HD;
	let sum45HD;
	let sum40HD;

	if (isHas25H.length !== 0) {
		sum25H = isHas25H.reduce((acc, item) => {
			return acc + item.width;
		}, 0);
		sum25H /= 1000;
		sum25H *= +pgm25Cost.value; //руб
	}
	if (isHas35H.length !== 0) {
		sum35H = isHas35H.reduce((acc, item) => {
			return acc + item.width;
		}, 0);
		sum35H /= 1000;
		sum35H *= +pgm35Cost.value; //руб
	}
	if (isHas45H.length !== 0) {
		sum45H = isHas45H.reduce((acc, item) => {
			return acc + item.width;
		}, 0);
		sum45H /= 1000;
		sum45H *= +pgm45Cost.value; //руб
	}
	if (isHas40H.length !== 0) {
		sum40H = isHas40H.reduce((acc, item) => {
			return acc + item.width;
		}, 0);
		sum40H /= 1000;
		sum40H *= +pgm40Cost.value; //руб
	}
	if (sign.isDublicate) {
		if (isHas25HD.length !== 0) {
			sum25HD = isHas25HD.reduce((acc, item) => {
				return acc + item.width;
			}, 0);
			sum25HD /= 1000;
			sum25HD *= +pgm25Cost.value; //руб
		}
		if (isHas35HD.length !== 0) {
			sum35HD = isHas35HD.reduce((acc, item) => {
				return acc + item.width;
			}, 0);
			sum35HD /= 1000;
			sum35HD *= +pgm35Cost.value; //руб
		}
		if (isHas45HD.length !== 0) {
			sum45HD = isHas45HD.reduce((acc, item) => {
				return acc + item.width;
			}, 0);
			sum45HD /= 1000;
			sum45HD *= +pgm45Cost.value; //руб
		}
		if (isHas40HD.length !== 0) {
			sum40HD = isHas40HD.reduce((acc, item) => {
				return acc + item.width;
			}, 0);
			sum40HD /= 1000;
			sum40HD *= +pgm40Cost.value; //руб
		}
	}

	sign.horizontalLinesReal.forEach((element, index, array) => {
		res.innerHTML +=
			`<div style="display: inline" data-js="Hinfo-${index}">` +
			`<button onClick=removeH(${index})>` +
			`<i class="bi bi-archive"></i>` +
			"</button>" +
			" Уголок: " +
			"<code>" +
			element.lineCornerType +
			"(" +
			(element.width / 1000).toFixed(2) +
			" м)" +
			`${index === array.length - 1 ? "" : " + "}` +
			"</code></div>";
	}); // не делаю то же самое для дубликата в гор. линиях, т.к. если знак дублируется, то высота каждой части слишком мала, чтобы вставлять гор. линии

	let overSumH = 0;
	let overSumHD = 0;
	overSumH = sum25H === undefined ? overSumH : overSumH + sum25H;
	overSumH = sum35H === undefined ? overSumH : overSumH + sum35H;
	overSumH = sum45H === undefined ? overSumH : overSumH + sum45H;
	overSumH = sum40H === undefined ? overSumH : overSumH + sum40H;
	// second sign
	overSumHD = sum25HD === undefined ? overSumHD : overSumHD + sum25HD;
	overSumHD = sum35HD === undefined ? overSumHD : overSumHD + sum35HD;
	overSumHD = sum45HD === undefined ? overSumHD : overSumHD + sum45HD;
	overSumHD = sum40HD === undefined ? overSumHD : overSumHD + sum40HD;

	let endSumH = overSumH + overSumHD;

	res.innerHTML += sign.horizontalLinesReal.length === 0 ? "" : "<br>";
	res.innerHTML += `<h5 class="badge text-bg-primary text-wrap fs-5 mt-2">Стоимость горизонтальных уголков: ${endSumH
		.toFixed()
		.toString()} руб.</h5>`;

	// каркас
	const cost = document.querySelector(
		`[data-js="${sign.cornerType}pgm"]`
	).value;
	const verticalFrameCost = (sign.height / 1000) * 2 * cost; // считает 2 линии
	const horizontalFrameCost = (sign.width / 1000) * 2 * cost; // считает 2 линии
	let verticalFrameCostD = 0;
	let horizontalFrameCostD = 0;

	res.innerHTML += "<h5>Каркас:</h5>";
	res.innerHTML += `верт. линии: ${verticalFrameCost.toFixed()} руб.<br>`;
	res.innerHTML += `гор. линии: ${horizontalFrameCost.toFixed()} руб.<br>`;
	// для дубликата
	if (sign.isDublicate) {
		verticalFrameCostD = (sign.secondSign.height / 1000) * 2 * cost;
		horizontalFrameCostD = (sign.secondSign.width / 1000) * 2 * cost;
		res.innerHTML += "<h5>2 часть знака:</h5>";
		res.innerHTML += `верт. линии: ${verticalFrameCostD.toFixed()} руб.<br>`;
		res.innerHTML += `гор. линии: ${horizontalFrameCostD.toFixed()} руб.<br>`;
	}
	const endSumFrame =
		(verticalFrameCostD === 0
			? verticalFrameCost
			: verticalFrameCost + verticalFrameCostD) +
		(horizontalFrameCostD === 0
			? horizontalFrameCost
			: horizontalFrameCost + horizontalFrameCostD);
	res.innerHTML += `<h5 class="badge text-bg-primary text-wrap fs-5 mt-2">Стоимость каркаса: ${endSumFrame.toFixed()} руб.</h5>`;

	// Плёнка (1 слой)
	const tapeCostSqMeter = tapeCostHTML.value;
	let signArea = (sign.width * sign.height) / 1000000; //метры
	let secondSignArea = 0;
	let secondSignTapeCost = 0;
	const tapeCost = signArea * tapeCostSqMeter;
	res.innerHTML += "<h5>Плёнка (первый слой):</h5>";
	res.innerHTML += `${tapeCost.toFixed()} руб.<br>`;
	// secondSign
	if (sign.isDublicate) {
		secondSignArea = (sign.secondSign.width * sign.secondSign.height) / 1000000;
		secondSignTapeCost = secondSignArea * tapeCostSqMeter;
		res.innerHTML += "<h5>2 часть знака:</h5>";
		res.innerHTML += `${secondSignTapeCost.toFixed()} руб.<br>`;
	}
	const endSumTape = tapeCost + secondSignTapeCost;
	res.innerHTML += `<h5 class="badge text-bg-primary text-wrap fs-5 mt-2">Стоимость плёнки (1 слой): ${endSumTape.toFixed()} руб.</h5>`;

	// Плёнка (2 слой)

	const tapeCostSecondLayer = tapeCostSecondLayerHTML.value;
	const secondLayerCoeff = tapeSecondLayerCoeff.value / 100;
	let totalWidth = document.querySelector("#inputWidthData").value;
	let totalHeight = document.querySelector("#inputHeightData").value;
	let tapeSecondLayerCostFinal =
		((totalWidth * totalHeight) / 1000000) *
		tapeCostSecondLayer *
		secondLayerCoeff;
	res.innerHTML += "<h5>Плёнка (второй слой):</h5>";
	res.innerHTML += `${tapeSecondLayerCostFinal.toFixed()} руб.<br>`;
	res.innerHTML += `<h5 class="badge text-bg-primary text-wrap fs-5 mt-2">Стоимость плёнки (2 слой): ${tapeSecondLayerCostFinal.toFixed()} руб.</h5>`;

	// Оцинковка
	const costZincSqMeter = zincCostHTML.value;
	const zincCost = signArea * costZincSqMeter;
	let secondSignZincCost = 0;
	res.innerHTML += "<h5>Оцинковка:</h5>";
	res.innerHTML += `${zincCost.toFixed()} руб.<br>`;
	if (sign.isDublicate) {
		secondSignZincCost = secondSignArea * costZincSqMeter;
		res.innerHTML += "<h5>2 часть знака:</h5>";
		res.innerHTML += `${secondSignZincCost.toFixed()} руб.<br>`;
	}
	const endSumZinc = zincCost + secondSignZincCost;
	res.innerHTML += `<h5 class="badge text-bg-primary text-wrap fs-5 mt-2">Стоимость оцинковки: ${endSumZinc.toFixed()} руб.</h5>`;

	// общая стоимость
	res.innerHTML += "<h3>Общая стоимость материалов:</h3>";
	res.innerHTML += `<h5>~${(
		endSumV +
		endSumH +
		endSumFrame +
		endSumTape +
		tapeSecondLayerCostFinal +
		endSumZinc
	).toFixed()} руб.</h5>`;
}

function removeV(index) {
	const div = document.querySelector(`[data-js="Vinfo-${index}"]`);
	div.remove();
	sign.verticalLinesReal.splice(index, 1);
	sign.verticalLines.splice(index, 1);
	infoAboutVerticalLines();
	calculation();
	sign.draw(ctx);
}

function removeVD(index) {
	const div = document.querySelector(`[data-js="VDinfo-${index}"]`);
	div.remove();
	sign.secondSign.verticalLinesReal.splice(index, 1);
	sign.secondSign.verticalLines.splice(index, 1);
	infoAboutVerticalLines();
	calculation();
	sign.draw(ctx);
}

function removeAllV(index) {
	removeV(index);
	const h = sign.height + sign.secondSign.height;
	if (h >= 2300 && h <= 2500) {
		sign.isDublicate = true;
		removeVD(index);
	}
}

function removeH(index) {
	const div = document.querySelector(`[data-js="Hinfo-${index}"]`);
	div.remove();
	sign.horizontalLinesReal.splice(index, 1);
	sign.horizontalLines.splice(index, 1);
	infoAboutHorizontalLines();
	calculation();
	sign.draw(ctx);
}

let sign;
let canvas = document.getElementById("example");
ctx = canvas.getContext("2d");

btn.addEventListener("click", () => {
	let w = document.querySelector("#inputWidthData").value;
	let h = document.querySelector("#inputHeightData").value;
	let scale = +rangeSelect.value;
	sign = new Sign(w, h, scale);
	main();
	// infoAboutSign()
});

// f(20) => 1; f(1) => 20

rangeSelect.addEventListener("change", (event) => {
	document.querySelector("#scaleValue").innerText = 21 - event.target.value;
	if (sign) {
		sign.scale = +event.target.value;
		btn.click();
		// main();
	}
});

class Line {
	constructor(x_start, y_start, x_end, y_end, cornerType) {
		this.x0 = x_start.toFixed(2);
		this.y0 = y_start.toFixed(2);
		this.x1 = x_end.toFixed(2);
		this.y1 = y_end.toFixed(2);
		this.width = Math.abs(this.x0 - this.x1);
		this.height = Math.abs(this.y0 - this.y1);
		this.lineCornerType = cornerType;
	}
}

class Sign {
	constructor(width, height, scale) {
		this.width = Number(width);
		this.height = Number(height);
		this.cornerType; //тип уголка знака
		this.verticalLines =
			[]; /* хранятся координаты измененные, для отрисовки, они зависят от scale*/
		this.horizontalLines =
			[]; /* хранятся координаты измененные, для отрисовки, они зависят от scale*/
		this.verticalLinesReal =
			[]; /* хранятся координаты измененные, для отрисовки, они зависят от scale*/
		this.horizontalLinesReal =
			[]; /* хранятся координаты измененные, для отрисовки, они зависят от scale*/

		this.isRotate = false; /* поворачиваем ли мы знак */
		this.dx = 10; //смещение от края canvas
		this.dy = 10; //смещение от края canvas
		this.scale = scale; /* Коэффициент масштабирования */
		this.isDublicate = false; /* является ли знак дублирующим (состоящим из двух маленьких) */
		this.isSecondDublicate = false; /* является ли знак дублирующим (состоящим из двух маленьких) */
		this.secondSign;
		this.verticalStep; /*вертикальный шаг линий для отрисовки */
		this.horizontalStep; /*горизонтальный шаг линий для отрисовки */
		this.secondSingVerticalStep; /* вертикальный шаг линий знака дубликата */
		this
			.secondSingHorizontalStep; /* горизонтальный шаг линий знака дубликата */

		/* В реальных координатах */
		this.verticalStepReal; /*вертикальный шаг линий для отрисовки */
		this.horizontalStepReal; /*горизонтальный шаг линий для отрисовки */
		this
			.secondSingVerticalStepReal; /* вертикальный шаг линий знака дубликата */
		this
			.secondSingHorizontalStepReal; /* горизонтальный шаг линий знака дубликата */
	}

	/* рассчет линий знака (новый рабочий вариант) */
	calculateV2() {
		this.verticalLines = [];
		this.horizontalLines = [];
		this.isRotate = false;

		if (this.height > 2500) {
			showMessage(
				"Высота знака не может быть больше 2500. Расчёт некорректный!"
			);
		}
		if (this.width > 6000) {
			showMessage("Ширина не может быть больше 6000. Расчёт некорректный!");
		}
		if (this.height > 2300 && this.height <= 2500) {
			/* знак делится на две части */
			/* 1 часть высотой 1250 всегда, вторая часть меньше  */
			this.secondSign = new Sign(this.width, this.height - 1250, this.scale);
			this.secondSign.isDublicate = true; /* важно установить, чтобы его каркас был 40 профильная труба  */
			this.secondSign.calculateWithRealCoordinate(); /* рассчитываем вторую часть знака */
			this.secondSign.calculateV2(); /* рассчитываем знака для отрисовки */
			this.height = 1250;
			this.isDublicate = true; /* важно установить, чтобы его каркас был 40 профильная труба */
			// this.calculateWithRealCoordinate() /* рассчитываем первую часть знака */
		}
		if (this.width / this.scale >= 4000 / this.scale) {
			this.cornerType = 45; /* 45 уголок каркаса */
			if (this.isDublicate) {
				this.cornerType = 40; /* профильная труба */
			}
			if (this.height / this.scale > 1250 / this.scale) {
				/* вертикально создаем 35 уголок с шагом 1250, горизонтально создаем 25 уголок с шагом (высота знака / 2) */

				/* Создаем вертикальные линии*/
				this.verticalStep = 1250 / this.scale;
				let x_start = 1250 / this.scale; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStep / this.scale);
					i++
				) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						35
					);
					x_start += this.verticalStep;
				}

				/* Создаем горизонтальные линии, в данном случае она 1 в позиции (высота знака / 2) */
				this.horizontalStep = this.height / 2 / this.scale;
				/* x0 - 0, y0 - h/2, x1 - width, y1 - h/2 */
				this.createHorizontalLine(
					this.cornerType / this.scale,
					this.horizontalStep,
					(this.width - this.cornerType) / this.scale,
					this.horizontalStep,
					25
				);
			} else {
				/* вертикально создаем 35 уголок с шагом 2500, горизонтального уголка нет */
				/* А также, надо создать 25 вертикальные уголки с шагом 2500 / 3 */

				/* Создаем вертикальные линии*/
				this.verticalStep = 2500 / this.scale;
				let x_start = 2500 / this.scale; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStep / this.scale);
					i++
				) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						35
					);
					x_start += this.verticalStep;
				}

				/* создаем 25 уголки до первой 35 линии (левая часть знака) ЗДЕСЬ ВАЖНО ДЕЛИТЬ НА 2.9, ЕСЛИ ДЕЛИТЬ НА 3 ТО 25 УГОЛОК ВСТАНЕТ В ТОЧКУ 35 УГОЛКА*/
				x_start = 2500 / 2.9 / this.scale;
				let microStep = 2500 / 2.9 / this.scale;
				for (let i = 0; i < Math.floor(2500 / microStep / this.scale); i++) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						25
					);
					x_start += 2500 / 2.9 / this.scale;
				}

				/* создаем 25 уголки после первой 35 линии (правая часть знака) */
				x_start = 2500 / this.scale + 2500 / 3 / this.scale;
				microStep = 2500 / 3 / this.scale;
				for (
					let i = 0;
					i < Math.floor((this.width - 2500) / microStep / this.scale);
					i++
				) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						25
					);
					x_start += 2500 / 3 / this.scale;
				}

				/* Может быть и продолжение, тут пока не знаю как делать, есть только вариант рекурсии. Сейчас знак не больше 5000*/
			}
		}
		if (
			this.width / this.scale < 4000 / this.scale &&
			this.width / this.scale >= 2250 / this.scale
		) {
			this.cornerType = 35;
			if (this.isDublicate) {
				this.cornerType = 40; /* профильная труба */
			}
			if (this.height / this.scale > 1250 / this.scale) {
				/* Создаем вертикальные линии 35 уголка */
				this.verticalStep = 1250 / this.scale;
				let x_start = 1250 / this.scale; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStep / this.scale);
					i++
				) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						35
					);
					x_start += this.verticalStep;
				}

				/* Создаем горизонтальные линии, в данном случае она 1 в позиции (высота знака / 2) */
				this.horizontalStep = this.height / 2 / this.scale;
				/* x0 - 0, y0 - h/2, x1 - width, y1 - h/2 */
				this.createHorizontalLine(
					this.cornerType / this.scale,
					this.horizontalStep,
					(this.width - this.cornerType) / this.scale,
					this.horizontalStep,
					25
				);
			} else {
				/* вертикально создаем 35 уголок с шагом 2500, горизонтального уголка нет */
				/* А также, надо создать 25 вертикальные уголки с шагом 2500 / 3 */

				/* Создаем вертикальные линии*/
				this.verticalStep = 2500 / this.scale;
				let x_start = 2500 / this.scale; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStep / this.scale);
					i++
				) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						35
					);
					x_start += this.verticalStep;
				}

				/* создаем 25 уголки до первой 35 линии (левая часть знака) */
				x_start = 2500 / 2.9 / this.scale;
				let microStep = 2500 / 2.9 / this.scale;
				for (let i = 0; i < Math.floor(2500 / microStep / this.scale); i++) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						25
					);
					x_start += 2500 / 2.9 / this.scale;
				}

				/* создаем 25 уголки после первой 35 линии (правая часть знака) */
				x_start = 2500 / this.scale + 2500 / 3 / this.scale;
				microStep = 2500 / 3 / this.scale;
				for (
					let i = 0;
					i < Math.floor((this.width - 2500) / microStep / this.scale);
					i++
				) {
					this.createVerticalLine(
						x_start,
						this.cornerType / this.scale,
						x_start,
						(this.height - this.cornerType) / this.scale,
						25
					);
					x_start += 2500 / 3;
				}

				/* Может быть и продолжение, тут пока не знаю как делать, есть только вариант рекурсии. Сейчас знак не больше 5000*/
			}
		}

		if (
			this.width / this.scale >= 1000 / this.scale &&
			this.width / this.scale < 2250 / this.scale
		) {
			this.cornerType = 25;
			if (this.isDublicate) {
				this.cornerType = 40; /* профильная труба */
			}
			if (this.height / this.scale > 1200 / this.scale) {
				if (this.height / this.scale > 1500 / this.scale) {
					/* вертикально уголок 25 с шагом (длина знака / 2) */
					/* горизонтально уголок 25 с шагом (высота знака / 2) */
					this.isRotate = true;
				}
				/* Создаем вертикальные линии 25 уголка, в данном случае она 1 */
				this.verticalStep = this.width / 2 / this.scale;
				this.createVerticalLine(
					this.verticalStep,
					this.cornerType / this.scale,
					this.verticalStep,
					(this.height - this.cornerType) / this.scale,
					25
				);
				/* Создаем горизонтальные линии, в данном случае она 1 в позиции (высота знака / 2) */
				this.horizontalStep = this.height / 2 / this.scale;
				this.createHorizontalLine(
					this.cornerType / this.scale,
					this.horizontalStep,
					(this.width - this.cornerType) / this.scale,
					this.horizontalStep,
					25
				);
			} else {
				/* вертикально уголок 25 с шагом (длина знака / 2) */
				/* Создаем вертикальные линии 25 уголка, в данном случае она 1 */
				this.verticalStep = this.width / 2 / this.scale;
				this.createVerticalLine(
					this.verticalStep,
					this.cornerType / this.scale,
					this.verticalStep,
					(this.height - this.cornerType) / this.scale,
					25
				);
			}
		}

		if (this.width < 1000) {
			showMessage("Длина не может быть меньше 1000");
		}
	}
	/* рассчет знакак в реальных координатах, для сметы и цен */
	calculateWithRealCoordinate() {
		this.horizontalLinesReal = [];
		this.verticalLinesReal = [];
		this.isRotate = false;
		if (this.height > 2300 && this.height <= 2500) {
			/* знак делится на две части */
			/* 1 часть высотой 1250 всегда, вторая часть меньше  */
			this.secondSign = new Sign(this.width, this.height - 1250, this.scale);
			this.secondSign.isDublicate = true; /* важно установить, чтобы его каркас был 40 профильная труба  */
			this.secondSign.calculateWithRealCoordinate(); /* рассчитываем вторую часть знака */
			this.height = 1250;
			this.isDublicate = true; /* важно установить, чтобы его каркас был 40 профильная труба */
			// this.calculateWithRealCoordinate() /* рассчитываем первую часть знака */
		}
		if (this.width >= 4000) {
			this.cornerType = 45; /* 45 уголок каркаса */
			if (this.isDublicate) {
				this.cornerType = 40; /* профильная труба */
			}
			if (this.height > 1250) {
				/* вертикально создаем 35 уголок с шагом 1250, горизонтально создаем 25 уголок с шагом (высота знака / 2) */

				/* Создаем вертикальные линии*/
				this.verticalStepReal = 1250;
				let x_start = 1250; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStepReal);
					i++
				) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						35
					);
					x_start += this.verticalStepReal;
				}

				/* Создаем горизонтальные линии, в данном случае она 1 в позиции (высота знака / 2) */
				this.horizontalStepReal = this.height / 2;
				/* x0 - 0, y0 - h/2, x1 - width, y1 - h/2 */
				this.createHorizontalLineReal(
					this.cornerType,
					this.horizontalStepReal,
					this.width - this.cornerType,
					this.horizontalStepReal,
					25
				);
			} else {
				/* вертикально создаем 35 уголок с шагом 2500, горизонтального уголка нет */
				/* А также, надо создать 25 вертикальные уголки с шагом 2500 / 3 */

				/* Создаем вертикальные линии*/
				this.verticalStepReal = 2500;
				let x_start = 2500; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStepReal);
					i++
				) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						35
					);
					x_start += this.verticalStepReal;
				}

				/* создаем 25 уголки до первой 35 линии (левая часть знака) */
				x_start = 2500 / 3;
				let microStep =
					2500 / 3 +
					10; /* !!! надо сделать прибавление, иначе в 35 уголок встанет еще и 25( */
				for (let i = 0; i < Math.floor(2500 / microStep); i++) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						25
					);
					x_start += 2500 / 3;
				}

				/* создаем 25 уголки после первой 35 линии (правая часть знака) */
				x_start = 2500 + 2500 / 3;
				microStep =
					2500 / 3 +
					10; /* !!! надо сделать прибавление, иначе в 35 уголок встанет еще и 25( */
				for (let i = 0; i < Math.floor((this.width - 2500) / microStep); i++) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						25
					);
					x_start += 2500 / 3;
				}

				/* Может быть и продолжение, тут пока не знаю как делать, есть только вариант рекурсии. Сейчас знак не больше 5000*/
			}
		}
		if (this.width < 4000 && this.width >= 2250) {
			this.cornerType = 35;
			if (this.isDublicate) {
				this.cornerType = 40; /* профильная труба */
			}
			if (this.height > 1250) {
				/* Создаем вертикальные линии 35 уголка */
				this.verticalStepReal = 1250;
				let x_start = 1250; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStepReal);
					i++
				) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						35
					);
					x_start += this.verticalStepReal;
				}

				/* Создаем горизонтальные линии, в данном случае она 1 в позиции (высота знака / 2) */
				this.horizontalStepReal = this.height / 2;
				/* x0 - 0, y0 - h/2, x1 - width, y1 - h/2 */
				this.createHorizontalLineReal(
					this.cornerType,
					this.horizontalStepReal,
					this.width - this.cornerType,
					this.horizontalStepReal,
					25
				);
			} else {
				/* вертикально создаем 35 уголок с шагом 2500, горизонтального уголка нет */
				/* А также, надо создать 25 вертикальные уголки с шагом 2500 / 3 */

				/* Создаем вертикальные линии*/
				this.verticalStepReal = 2500;
				let x_start = 2500; /*точка старта для отрисовки */
				for (
					let i = 0;
					i < Math.floor(this.width / this.verticalStepReal);
					i++
				) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						35
					);
					x_start += this.verticalStepReal;
				}

				/* создаем 25 уголки до первой 35 линии (левая часть знака) */
				x_start = 2500 / 3;
				let microStep =
					2500 / 3 +
					10; /* !!! надо сделать прибавление, иначе в 35 уголок встанет еще и 25( */
				for (let i = 0; i < Math.floor(2500 / microStep); i++) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						25
					);
					x_start += 2500 / 3;
				}

				/* создаем 25 уголки после первой 35 линии (правая часть знака) */
				x_start = 2500 + 2500 / 3;
				microStep =
					2500 / 3 +
					10; /* !!! надо сделать прибавление, иначе в 35 уголок встанет еще и 25( */
				for (let i = 0; i < Math.floor((this.width - 2500) / microStep); i++) {
					this.createVerticalLineReal(
						x_start,
						this.cornerType,
						x_start,
						this.height - this.cornerType,
						25
					);
					x_start += 2500 / 3;
				}

				/* Может быть и продолжение, тут пока не знаю как делать, есть только вариант рекурсии. Сейчас знак не больше 5000*/
			}
		}

		if (this.width >= 1000 && this.width < 2250) {
			this.cornerType = 25;
			if (this.isDublicate) {
				this.cornerType = 40; /* профильная труба */
			}
			if (this.height > 1200) {
				if (this.height > 1500) {
					/* ИНВЕРСИЯ, МЕНЯЕМ МЕСТАМИ ВЫСОТУ И ШИРИНУ И ПРОГОНЯЕМ ЧЕРЕЗ АЛГОРИТМ СНОВА !*/
					this.isRotate = true;
				}
				console.log("Поворачиваем знак!");
				/* вертикально уголок 25 с шагом (длина знака / 2) */
				/* горизонтально уголок 25 с шагом (высота знака / 2) */
				/* Создаем вертикальные линии 25 уголка, в данном случае она 1 */
				this.verticalStepReal = this.width / 2;
				this.createVerticalLineReal(
					this.verticalStepReal,
					this.cornerType,
					this.verticalStepReal,
					this.height - this.cornerType,
					25
				);

				/* Создаем горизонтальные линии, в данном случае она 1 в позиции (высота знака / 2) */
				this.horizontalStepReal = this.height / 2;
				this.createHorizontalLineReal(
					this.cornerType,
					this.horizontalStepReal,
					this.width - this.cornerType,
					this.horizontalStepReal,
					25
				);
			} else {
				/* вертикально уголок 25 с шагом (длина знака / 2) */
				/* Создаем вертикальные линии 25 уголка, в данном случае она 1 */
				this.verticalStepReal = this.width / 2;
				this.createVerticalLineReal(
					this.verticalStepReal,
					this.cornerType,
					this.verticalStepReal,
					this.height - this.cornerType,
					25
				);
			}
		}

		if (this.width < 1000) {
			showMessage("Длина не может быть меньше 1000");
		}
	}

	draw(ctx) {
		ctx.clearRect(0, 0, 1500, 1500); /*Чистим поле*/
		if (this.isDublicate) {
			this.drawSign(ctx, 0);
			ctx.fillStyle = "#00F";
			ctx.font = "bold 20pt Arial";
			ctx.fillText(
				"X2",
				this.width / this.scale + 10,
				this.height / this.scale
			);
		} else {
			this.drawSign(ctx, 0);
		}
	}

	drawSign(ctx, dy) {
		ctx.lineWidth = 4;
		ctx.strokeStyle = "blue";
		ctx.strokeRect(
			0,
			0 + dy,
			this.width / this.scale,
			this.height / this.scale + dy
		);

		/* стили текста */
		ctx.fillStyle = "#00F";
		ctx.font = "bold 8pt Arial";

		ctx.fillText(String(this.cornerType), 2, 12 + dy);

		/* отрисовка вертикальных */
		ctx.beginPath();

		ctx.lineWidth = 2;
		ctx.strokeStyle = "red";

		ctx.fillStyle = "#d08d8d";
		ctx.font = "bold 8pt Arial";

		for (let line of this.verticalLines) {
			let x0 = Math.floor(line.x0);
			let x1 = Math.floor(line.x1);
			let y0 = Math.floor(line.y0);
			let y1 = Math.floor(line.y1);
			ctx.moveTo(x0, y0 + dy); // перемещаемся в стартовую позицию
			ctx.lineTo(x1, y1 + dy); // перемещаемся в стартовую позицию
			ctx.stroke();
			ctx.fillText(String(line.lineCornerType), x0, y0 + 12 + dy);
		}

		/* отрисовка горизонтальных */
		if (this.horizontalLines.length != 0) {
			ctx.beginPath();

			ctx.lineWidth = 2;
			ctx.strokeStyle = "green";

			ctx.fillStyle = "#008000";
			ctx.font = "bold 8pt Arial";
			for (let line of this.horizontalLines) {
				let x0 = Math.floor(line.x0);
				let x1 = Math.floor(line.x1);
				let y0 = Math.floor(line.y0);
				let y1 = Math.floor(line.y1);
				ctx.moveTo(x0, y0 + dy); // перемещаемся в стартовую позицию
				ctx.lineTo(x1, y1 + dy); // перемещаемся в стартовую позицию
				ctx.stroke();
				ctx.fillText(
					String(line.lineCornerType),
					line.x0 + 2,
					line.y0 + 12 + dy
				);
			}
		}
	}

	createLine(x0, y0, x1, y1, cornerType) {
		return new Line(x0, y0, x1, y1, cornerType);
	}

	createVerticalLine(x0, y0, x1, y1, cornerType) {
		this.verticalLines.push(this.createLine(x0, y0, x1, y1, cornerType));
	}
	createHorizontalLine(x0, y0, x1, y1, cornerType) {
		this.horizontalLines.push(this.createLine(x0, y0, x1, y1, cornerType));
	}

	createVerticalLineReal(x0, y0, x1, y1, cornerType) {
		this.verticalLinesReal.push(this.createLine(x0, y0, x1, y1, cornerType));
	}
	createHorizontalLineReal(x0, y0, x1, y1, cornerType) {
		this.horizontalLinesReal.push(this.createLine(x0, y0, x1, y1, cornerType));
	}
}

сalculation = {
	isDublicate: false,
	horizontalLinesReal: [],
	verticalLinesReal: [],
	isRotate: false,
	width: 0,
	height: 0,
	cornerType: 0,
};

btnSaveCosts.addEventListener("click", function (event) {
	localStorage.setItem("pgm25Cost", pgm25Cost.value);
	localStorage.setItem("pgm35Cost", pgm35Cost.value);
	localStorage.setItem("pgm40Cost", pgm40Cost.value);
	localStorage.setItem("pgm45Cost", pgm45Cost.value);
	localStorage.setItem("tapeCost", tapeCostHTML.value);
	localStorage.setItem("zincCost", zincCostHTML.value);
	localStorage.setItem("tape2Cost", tapeCostSecondLayerHTML.value);
	localStorage.setItem("tape2coeff", tapeSecondLayerCoeff.value);
	setCostValues();
});

function main() {
	sign.calculateV2(); /*калькуляция линий */
	sign.calculateWithRealCoordinate();
	console.log(sign);
	infoAboutSignV2();
	infoAboutVerticalLines();
	infoAboutHorizontalLines();
	sign.draw(ctx); /* отрисовка знака */
	calculation(); //отрисовка калькуляции и результатов
	sign.isDublicate = false; /*!!! c предыдущей отрисовки убираем дубликат */
}
