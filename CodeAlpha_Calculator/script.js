let buttons = document.querySelectorAll("button");
let input = document.querySelector("#value");
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let valueSelected = e.target.innerText;

        console.log(valueSelected);

        if (valueSelected === "C") {
            input.value = "";
        } else if (valueSelected === "=") {
            let result = eval(input.value);
            input.value = result;
        } else if (valueSelected === "+/-") {
            input.value *= -1;
        } else {
            input.value += valueSelected;
        }
    });
});