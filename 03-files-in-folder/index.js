const fs = require('fs');

const targetFolder = '03-files-in-folder/secret-folder';

fs.readdir(targetFolder, 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        if (file.isFile()) {
          fs.stat(`${targetFolder}/${file.name}`, (error, stats) => {
            if (error) {
            }
            else {
              const fileNameArr = file.name.split('.');
              const ext = fileNameArr[fileNameArr.length - 1];
              let name = '';

              fileNameArr.forEach((item, index) => {
                if (index !== fileNameArr.length - 1) {
                  if (index === 0) {
                    name = item;
                  } else {
                    name = `${name}.${item}`;
                  }
                }
              });

              fileWeight = (stats.size / 1024).toFixed(3) + 'kb';
              console.log(`${name}-${ext}-${fileWeight}`);
            }
          }); 
        }
      })
    }
  });


