const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.querySelector('.clear-btn');

let firstVal = 0;
let operatorVal = '';
let readyForSecondVal = false; //it's ready after getting first value AND operator

const operations = {
	'+': (num1, num2) => Number(num1) + num2,
	'-': (num1, num2) => num1 - num2,
	'*': (num1, num2) => num1 * num2,
	'/': (num1, num2) => (num2 === 0 ? 'ERROR' : num1 / num2),
	'=': (num1, num2) => num2
};

//NUMBER BTNS HANDLER =================
const takeNumber = num => {
	if (readyForSecondVal) {
		calcDisplay.textContent = num;
		readyForSecondVal = false;
	} else {
		if (calcDisplay.textContent === '0') {
			calcDisplay.textContent = num;
		} else {
			calcDisplay.textContent += num;
		}
	}
};
//-------------------------------------

// DECIMAL BTN HANDLER ================
const addDecimal = () => {
	if (!calcDisplay.textContent.includes('.')) {
		calcDisplay.textContent += '.';
	}
	if (readyForSecondVal) {
		calcDisplay.textContent = '0.';
		readyForSecondVal = false;
	}
};
//-------------------------------------

// OPERATOR BTNS HANDLER ==============
const useOperator = operator => {
	const currentDisplayVal = Number(calcDisplay.textContent);

	if (readyForSecondVal) {
		operatorVal = operator;
		return;
	}

	if (!firstVal) {
		//take first value and operator
		firstVal = currentDisplayVal;
	} else {
		//first value already exists, take operator (and second value from display)
		const calculate = operations[operatorVal](firstVal, currentDisplayVal);
		calcDisplay.textContent = calculate;
		firstVal = calculate;
	}

	readyForSecondVal = true;
	operatorVal = operator;
};
//-------------------------------------

// CLEAR BTN HANDLER ==================
const reset = () => {
	calcDisplay.textContent = '0';
	firstVal = 0;
	operatorVal = '';
	readyForSecondVal = false;
};
//-------------------------------------

inputBtns.forEach(btn => {
	if (btn.classList.length === 0) {
		btn.addEventListener('click', () => takeNumber(btn.value));
	} else if (btn.classList.contains('operator')) {
		btn.addEventListener('click', e => {
			useOperator(e.target.value);
		});
	} else if (btn.classList.contains('decimal')) {
		btn.addEventListener('click', addDecimal);
	} else if (btn.classList.contains('clear-btn')) {
		btn.addEventListener('click', reset);
	}
});
