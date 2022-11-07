const fs = require('fs');
const path = require('path');
const targetFolder = '05-merge-styles/styles';
const arr = [];

fs.open('05-merge-styles/project-dist/bundle.css', 'w', (err) => {
  if(err) throw err;
  console.log('File created');
});


fs.readdir(targetFolder,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    console.log(files);

    files.forEach(file => {
      if (file.isFile()) {
        console.log('1', `${targetFolder}/${file.name}`);
        console.log('2', path.extname(`${targetFolder}/${file.name}`));
        if (path.extname(`${targetFolder}/${file.name}`) == '.css') {
          console.log('3', file);
          fs.readFile( `${targetFolder}/${file.name}`, 'utf8', function (err, data ) {
            if (err) throw err; // ошибка чтения файла
            arr.push(data);
            console.log('arr', arr);
            fs.appendFile('05-merge-styles/project-dist/bundle.css', data, (err) => {
              if(err) throw err;
              console.log('Data has been added!');
          });
          });
        }
      }


    }
    )


  });





console.log('Привет петушара');