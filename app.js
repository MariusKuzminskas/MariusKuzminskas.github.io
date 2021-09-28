"use strict"; // here we go again

console.log(skaiciusToLt(9999));

const el = {
  input: document.getElementById("in"),
  output: document.getElementById("out"),
};

const output = el.output.textContent;

el.input.addEventListener("input", function () {
  let entered = this.value;
  if (isNaN(+entered)) {
    el.output.textContent = "neskaicius";
  } else {
    let zodziai = skaiciusToLt(+entered);
    zodziai = zodziai.charAt(0).toUpperCase() + zodziai.slice(1);
    el.output.textContent = zodziai;
  }
});
