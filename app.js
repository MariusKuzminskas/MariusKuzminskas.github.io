'use strict'; // here we go again

// console.log(skaiciusToLt(9999));

const el = {
  input: document.getElementById('in'),
  output: document.getElementById('out'),
  ivesta: document.getElementById('iv'),
};

const output = el.output.textContent;

el.input.addEventListener('input', function () {
  let entered = this.value;

  // if (isNaN(+entered)) {
  //   el.output.textContent = 'neskaicius';
  // } else {
  let zodziai = skaiciusToLtSuCentais(entered);
  zodziai = zodziai.charAt(0).toUpperCase() + zodziai.slice(1);
  el.output.textContent = zodziai;
  el.ivesta.textContent = 'Įvesta į laukelį: ' + this.value;
  this.value = leaveOnlyNumberCharacters(removeWhiteSpace(entered));
  // if (zodziai.toString().startsWith('Undefinded')) {
  //   el.output.textContent = 'neskaicius';
  // }
  // }
});
