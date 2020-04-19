const form = document.querySelector(".form");
const cardNumber = document.querySelector(".cardNumber");
const cardName = document.querySelector(".cardName");
const cardCvv = document.querySelector(".cardCvv");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const numberMask = "################";
const numberInput = form['number'];
const invalidInfo = document.querySelector('.form--input__invalid-info');

const validateCreditCardNumber = cardNumber => {

	cardNumber = cardNumber.split(' ').join("");
	if (parseInt(cardNumber) <= 0 || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
    numberInput.classList.add('invalid')
		return false;
  }
	var numArray = new Array();
	for (var i = 0; i < cardNumber.length; i++) {
    numArray[numArray.length] = cardNumber.charCodeAt(i) - 48;
	}
	numArray.reverse();
	var sum = 0;
	for (var i = 0; i < numArray.length; i++) {
    var tmp = numArray[i];
		if ((i % 2) != 0) {
      tmp *= 2;
			if (tmp > 9) {
        tmp -= 9;
			}
		}
		sum += tmp;
  }

  if ((sum % 10) != 0) {
    numberInput.classList.remove('valid')
    numberInput.classList.add('invalid')
    invalidInfo.style.display = 'block';
  } else if ((sum % 10) == 0 && cardNumber >= 16){
    numberInput.classList.remove('invalid')
    numberInput.classList.add('valid')
    invalidInfo.style.display = 'none';
  }
}

const mapCardNumber = str => {
  const html = str.split("").map((char, index) => {
    if (index > 0 && index % 4 === 0) {
      return `<span> </span><div class='numberItem'>${char}</div>`;
    } else {
      return `<div class='numberItem'>${char}</div>`;
    }
  });
  cardNumber.innerHTML = html.join("");
};

const displayInput = e => {
  const value = form[e.target.name].value.trim();
  if (e.target.name === "number" && value !== null) {
    if (value === "") {
      mapCardNumber(numberMask);
    } else {
      mapCardNumber(value);
      validateCreditCardNumber(value)
    }
  } else if (e.target.name === "name") {
    cardName.textContent = value;
  } else if (e.target.name === "cvv") {
    cardCvv.textContent = value;
  } else if (e.target.name == "date--month") {
    cardMonth.textContent = cardMonth.textContent.replace(/[^]*/, value);
  } else if (e.target.name === "date--year") {
    cardYear.textContent = cardYear.textContent.replace(
      /[^]*/,
      value.slice(2, 4)
    );
  }
};

mapCardNumber(numberMask);
form.addEventListener("keyup", e => displayInput(e));
form.addEventListener("change", e => displayInput(e));
