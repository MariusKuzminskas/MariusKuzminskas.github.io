const vienasIkiTrylika = [
  "nulis",
  "vienas",
  "du",
  "trys",
  "keturi",
  "penki",
  "šeši",
  "septyni",
  "aštuoni",
  "devyni",
  "dešimt",
  "vienuolika",
  "dvylika",
  "trylika",
];

/**
 * grazina zodziu skaicius nuo 1 iki trylikos
 * @param {number} num nuo 1 iki 13
 * @returns
 */
function getIkiTrylika(num) {
  return vienasIkiTrylika[num];
}

// 14 - 19
// antras skaicius plius olika
// keturi + olika
function getketuriolikaDevyniolika(num) {
  let pirmaDalis = getIkiTrylika(getSkaiciusPagalVieta(num, 2));
  return `${pirmaDalis}olika`;
}

// 40 50 60 ...
// pirmas skaicius is vienetu plius asdesimt
// keturi + asdesimt
// penki + asdesimt
function getApvaliosDesimtys(num) {
  let pirmasSk = getIkiTrylika(getSkaiciusPagalVieta(num, 1));
  if (pirmasSk === "du") return "dvidešimt";
  if (pirmasSk === "trys") return "trisdešimt";
  return `${pirmasSk}adešimt`;
}

// 21 22
// 40 1
// 50 2
// keturiasdesimt vienas
// 21 - 99
function getDvimTo99(num) {
  let desimtis = getApvaliosDesimtys(getSkaiciusPagalVieta(num, 1));
  let antrasSk = getIkiTrylika(getSkaiciusPagalVieta(num, 2));
  if (antrasSk === "nulis") return `${desimtis}`;
  return `${desimtis} ${antrasSk}`;
}

// 101
// vienas simtas ir vienas
// 134
// vienas simtas ir 34

// 353
// trys simtai ir 53

// isvada jei skaicius trizenklis
// pirmas skaicius yra nuo 1 iki 9 + simtai
// prideam 'ir' ir pabaiga gaunasi dvizenklis kuri mes jau aprasem
function getTrizenliks(num) {
  let kiekSimtuSk = getSkaiciusPagalVieta(num, 1);
  let kiekSimtuZodziais = getIkiTrylika(kiekSimtuSk);
  let likutisPoSimtu = String(num).slice(1);
  // debugger;
  likutisPoSimtuZodziais =
    likutisPoSimtu === "00" ? "" : " " + skaiciusToLt(Math.abs(likutisPoSimtu));
  let simtasSimtai = kiekSimtuSk === 1 ? "šimtas" : "šimtai";
  return `${kiekSimtuZodziais} ${simtasSimtai}${likutisPoSimtuZodziais}`;
}

// 1432
// {nauja           } + skaiciusToLt(432)
// vienas tusktantis keturi simtai trisdesim du
// 1,000
// 10,000
// 100,000
function getUpToMillion(num) {
  // debugger;
  let numString = String(num);
  let kiekTukstSk = numString.slice(0, numString.length - 3);
  let kiekTukstZodziais = skaiciusToLt(kiekTukstSk);
  let likutisPoTukst = numString.slice(numString.length - 3);

  likutisPoTuksZodziais =
    likutisPoTukst === "000" ? "" : " " + skaiciusToLt(Math.abs(likutisPoTukst));
  let tuksSuTeisingaGalune = getTuksTeisingaGalune(kiekTukstSk);
  return `${kiekTukstZodziais} ${tuksSuTeisingaGalune}${likutisPoTuksZodziais}`;
}
// getUpToMillion(11223);

// helper ==============================
function getSkaiciusPagalVieta(num, vieta) {
  return +String(num).charAt(vieta - 1);
}
function howManyDigits(num) {
  return num.toString().lenght;
}
// 1k is
//2k - 9k iai
// 10k - 19 ciu
// 20k 30k 40k iu
// 21k is
// 100k iu

function getTuksTeisingaGalune(tuksSk) {
  // debugger;
  tuksSk = String(Math.abs(tuksSk));
  let keliazenklisSk = tuksSk.length;
  if (tuksSk == 1) return "tūkstantis";
  if (tuksSk < 10 && tuksSk != 0) return "tūkstančiai";
  if (tuksSk < 21) return "tūkstančių";
  if (keliazenklisSk === 2) {
    if (tuksSk.slice(-1) == "1") return "tūkstantis";
    if (tuksSk.slice(-1) == "0") return "tūkstančių";
    return "tūkstančiai";
  }
  if (keliazenklisSk === 3) {
    // return "<aprasyti kaip yra su trizenklem tukstanciu galunem>";
    return getTuksTeisingaGalune(tuksSk.slice(-2));
  }
}

function skaiciusToLt(num) {
  if (num < 0) throw new Error("galimi tik teigiami skaiciai");
  if (num < 14) return getIkiTrylika(num);
  if (num < 20) return getketuriolikaDevyniolika(num);
  if (num < 100) return getDvimTo99(num);
  if (num < 1000) return getTrizenliks(num);
  if (num < 1000000) return getUpToMillion(num);
  return console.warn("neaprasytas atvejis");
}
console.log(`
skaiciusToLt(345) -> ${skaiciusToLt(2725)}
`);
2725;
