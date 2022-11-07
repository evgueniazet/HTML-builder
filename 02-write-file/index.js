const fs = require('fs');

function fileHandler() {

  fs.open('02-write-file/02-write-text.txt', 'w', (err) => {
    if (err) throw err;
    console.log('Write text!');
  });

};
fileHandler();

const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let writer = fs.createWriteStream('02-write-file/02-write-text.txt');
readlineInterface.on('line', async (name) => {
  const finalText = 'Uvidimsia, krasotka...';

  process.stdin.setRawMode(true);
  process.stdin.on("keypress", function (chunk, key) {
    if (key && key.name === "c" && key.ctrl) {
      console.log(finalText);
      process.exit();
    }
  });

  if (name == 'exit') {
    console.log(finalText);
    readlineInterface.close();
  } else {
    writer.write(name + '\n');
  }
});