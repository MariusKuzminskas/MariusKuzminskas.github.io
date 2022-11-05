const vienasIkiTrylika = [
  'nulis',
  'vienas',
  'du',
  'trys',
  'keturi',
  'penki',
  'šeši',
  'septyni',
  'aštuoni',
  'devyni',
  'dešimt',
  'vienuolika',
  'dvylika',
  'trylika',
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
  const pirmaDalis = getIkiTrylika(getSkaiciusPagalVieta(num, 2));
  return `${pirmaDalis}olika`;
}

// 40 50 60 ...
// pirmas skaicius is vienetu plius asdesimt
// keturi + asdesimt
// penki + asdesimt
function getApvaliosDesimtys(num) {
  const pirmasSk = getIkiTrylika(getSkaiciusPagalVieta(num, 1));
  if (pirmasSk === 'du') return 'dvidešimt';
  if (pirmasSk === 'trys') return 'trisdešimt';
  return `${pirmasSk}adešimt`;
}

// 21 22
// 40 1
// 50 2
// keturiasdesimt vienas
// 21 - 99
function getDvimTo99(num) {
  const desimtis = getApvaliosDesimtys(getSkaiciusPagalVieta(num, 1));
  const antrasSk = getIkiTrylika(getSkaiciusPagalVieta(num, 2));
  if (antrasSk === 'nulis') return `${desimtis}`;
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
  const kiekSimtuSk = getSkaiciusPagalVieta(num, 1);
  const kiekSimtuZodziais = getIkiTrylika(kiekSimtuSk);
  const likutisPoSimtu = String(num).slice(1);
  // debugger;
  const likutisPoSimtuZodziais =
    likutisPoSimtu === '00' ? '' : ` ${skaiciusToLt(Math.abs(likutisPoSimtu))}`;
  const simtasSimtai = kiekSimtuSk === 1 ? 'šimtas' : 'šimtai';
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
  const numString = String(num);
  const kiekTukstSk = numString.slice(0, numString.length - 3);
  const kiekTukstZodziais = skaiciusToLt(kiekTukstSk);
  const likutisPoTukst = numString.slice(numString.length - 3);

  const likutisPoTuksZodziais =
    likutisPoTukst === '000' ? '' : ` ${skaiciusToLt(Math.abs(likutisPoTukst))}`;
  const tuksSuTeisingaGalune = getTuksTeisingaGalune(kiekTukstSk);
  return `${kiekTukstZodziais} ${tuksSuTeisingaGalune}${likutisPoTuksZodziais}`;
}
// getUpToMillion(11223);

// helper ==============================
function getSkaiciusPagalVieta(num, vieta) {
  return +String(num).charAt(vieta - 1);
}
function howManyDigits(num) {
  return num.toString().length;
}
// 1k is
// 2k - 9k iai
// 10k - 19 ciu
// 20k 30k 40k iu
// 21k is
// 100k iu

function getTuksTeisingaGalune(tuksSk) {
  // debugger;
  tuksSk = String(Math.abs(tuksSk));
  const keliazenklisSk = howManyDigits(tuksSk);
  if (tuksSk == 1) return 'tūkstantis';
  if (tuksSk < 10 && tuksSk != 0) return 'tūkstančiai';
  if (tuksSk < 21) return 'tūkstančių';
  if (keliazenklisSk === 2) {
    if (tuksSk.slice(-1) == '1') return 'tūkstantis';
    if (tuksSk.slice(-1) == '0') return 'tūkstančių';
    return 'tūkstančiai';
  }
  if (keliazenklisSk === 3) {
    // return "<aprasyti kaip yra su trizenklem tukstanciu galunem>";
    return getTuksTeisingaGalune(tuksSk.slice(-2));
  }
}

function skaiciusToLt(num) {
  if (num < 0) throw new Error('galimi tik teigiami skaiciai');
  if (num < 14) return getIkiTrylika(num);
  if (num < 20) return getketuriolikaDevyniolika(num);
  if (num < 100) return getDvimTo99(num);
  if (num < 1000) return getTrizenliks(num);
  if (num < 1000000) return getUpToMillion(num);
  return console.warn('neaprasytas atvejis');
}

const removeWhiteSpace = (string) => {
  return string.replace(/\s+/g, '');
};
const leaveOnlyNumberCharacters = (string) => {
  return string.match(/[0-9\.]?/g).join('');
};

function skaiciusToLtSuCentais(num) {
  if (isNaN(parseFloat(num))) {
    // console.log('NAN');
    num = removeWhiteSpace(num);
    num = leaveOnlyNumberCharacters(num);
    // return;
  }
  // console.log('parseFloat(num) ===', parseFloat(num));
  num = parseFloat(num).toFixed(2);
  const sk = num.toString().split('.')[0];
  const ct = num.toString().split('.')[1];
  // console.log({ sk, ct });
  const ct00 = ct === '00' ? '0' : ct;
  return `${skaiciusToLt(sk)} eur, ${ct00}ct.`;
}

// console.log(`
// skaiciusToLt(345) -> ${skaiciusToLtSuCentais('$ 2,725.34')}
// `);
