const fs = require('fs');
const copyDir = () => {

  fs.mkdir('04-copy-directory/files-copy', { recursive: true }, err => {
    if (err) throw console.log('Папка уже создана!');
  });

  fs.readdir('04-copy-directory/files', (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      console.log('file', file);      
      fs.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`, err => {
         if(err) throw err; 
      });
    })
  });

};

copyDir();
