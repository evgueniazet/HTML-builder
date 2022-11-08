const fs = require('fs');
const path = require('path');
const targetFolder = '05-merge-styles/styles';
const arr = [];

fs.open('05-merge-styles/project-dist/bundle.css', 'w', (err) => {
  if(err) throw err;
});


fs.readdir(targetFolder,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (file.isFile()) {
        if (path.extname(`${targetFolder}/${file.name}`) == '.css') {
          fs.readFile( `${targetFolder}/${file.name}`, 'utf8', function (err, data ) {
            if (err) throw err; 
            arr.push(data);
            fs.appendFile('05-merge-styles/project-dist/bundle.css', data, (err) => {
              if(err) throw err;
          });
          });
        }
      }
    }
    )
  });
