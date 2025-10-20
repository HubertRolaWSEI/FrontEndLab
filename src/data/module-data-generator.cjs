const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..', '..');
const dataDir = path.join(projectRoot, 'data');
const namesFile = path.join(dataDir, 'names.txt');
const outputFile = path.join(projectRoot, 'src', 'module-data.js');

const count = Number(process.argv[2]) || 10;

if (fs.existsSync(outputFile)) {
  console.log('module-data.js already exists. Skipping generation.');
  process.exit(0);
}

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function readNamesLibrary() {
  try {
    const raw = fs.readFileSync(namesFile, 'utf8');
    return raw
      .split(/\s+/)
      .map(s => s.trim())
      .filter(n => n.length > 0);
  } catch (err) {
    console.error('Failed to read names library at', namesFile);
    throw err;
  }
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateBirthDate(startYear = 1960, endYear = 2010) {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const maxDay = [1,3,5,7,8,10,12].includes(Number(month)) ? 31 : (month === '02' ? 28 : 30);
  const day = String(Math.floor(Math.random() * maxDay) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generatePhone() {
  const parts = [
    String(Math.floor(100 + Math.random() * 900)),
    String(Math.floor(100 + Math.random() * 900)),
    String(Math.floor(100 + Math.random() * 900)),
  ];
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
}

function generatePeople(names, howMany) {
  const emailCounter = new Map();
  const domain = 'wsei.edu.pl';
  const people = [];
  for (let i = 0; i < howMany; i++) {
    const name = pickRandom(names);
    const current = (emailCounter.get(name) || 0) + 1;
    emailCounter.set(name, current);
    const emailLocal = `${name.toLowerCase()}.${current}`
      .replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l')
      .replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/ż/g,'z').replace(/ź/g,'z');
    people.push({
      id: i + 1,
      name,
      birthDate: generateBirthDate(),
      email: `${emailLocal}@${domain}`,
      phone: generatePhone(),
    });
  }
  return people;
}

function writeModuleFile(people) {
  ensureDirExists(path.dirname(outputFile));
  const content = `export const people = ${JSON.stringify(people, null, 2)};\n`;
  fs.writeFileSync(outputFile, content, 'utf8');
  console.log('module-data.js generated at', outputFile);
}

(function main() {
  ensureDirExists(dataDir);
  const names = readNamesLibrary();
  if (names.length === 0) {
    console.error('Names library is empty. Add names to data/names.txt');
    process.exit(1);
  }
  const people = generatePeople(names, count);
  writeModuleFile(people);
})();


