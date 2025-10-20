const fs = require('fs');
const path = require('path');

const count = Number(process.argv[2]) || 5;


const namesPath = path.join(__dirname, 'names.txt');
const outputPath = path.join(__dirname, 'src', 'module-data.js');


if (fs.existsSync(outputPath)) {
  console.log('Plik src/module-data.js już istnieje — pomijam generowanie.');
  process.exit(0);
}


function randomDate() {
  const year = Math.floor(Math.random() * (2005 - 1980 + 1)) + 1980;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


function randomPhone() {
  const a = String(Math.floor(100 + Math.random() * 900));
  const b = String(Math.floor(100 + Math.random() * 900));
  const c = String(Math.floor(100 + Math.random() * 900));
  return `${a}-${b}-${c}`;
}


fs.readFile(namesPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Błąd odczytu names.txt:', err);
    return;
  }


  const names = data.split(/\s+/).map(s => s.trim()).filter(n => n.length > 0);

  const nameCounts = {}; 
  const people = [];

  for (let i = 0; i < count; i++) {
    const name = names[Math.floor(Math.random() * names.length)];
    const key = name.toLowerCase();
    nameCounts[key] = (nameCounts[key] || 0) + 1;

    people.push({
      id: i + 1,
      name: name,
      birthDate: randomDate(),
      email: `${key}${nameCounts[key]}@wsei.edu.pl`,
      phone: randomPhone()
    });
  }

 
  const content = `export const people = ${JSON.stringify(people, null, 2)};`;


  fs.writeFile(outputPath, content, (err) => {
    if (err) {
      console.error('Błąd zapisu pliku module-data.js:', err);
    } else {
      console.log('Plik src/module-data.js został wygenerowany.');
    }
  });
});
