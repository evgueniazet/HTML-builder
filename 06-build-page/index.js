const { DiffieHellmanGroup } = require('crypto');
const fs = require('fs');
const path = require('path');
const targetFolder = '06-build-page/styles';
const arr = [];

fs.mkdir('06-build-page/project-dist', { recursive: true }, err => {
  if (err) throw err;
});

fs.open('06-build-page/project-dist/index.html', 'w', (err) => {
  if (err) throw err;
});


const copyDir = () => {

  fs.mkdir('06-build-page/project-dist/assets', { recursive: true }, err => {
    if (err) throw err;
  });

  fs.mkdir('06-build-page/project-dist/assets/fonts', { recursive: true }, err => {
    if (err) throw err;
  });

  fs.mkdir('06-build-page/project-dist/assets/img', { recursive: true }, err => {
    if (err) throw err;
  });

  fs.mkdir('06-build-page/project-dist/assets/svg', { recursive: true }, err => {
    if (err) throw err;
  });


  fs.readdir('06-build-page/assets/fonts', (err, files) => {  // копирование папки fonts
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(`06-build-page/assets/fonts/${file}`, `06-build-page/project-dist/assets/fonts/${file}`, err => {
        if (err) throw err;
      });
    })
  });


  fs.readdir('06-build-page/assets/img', (err, files) => {  // копирование папки img
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(`06-build-page/assets/img/${file}`, `06-build-page/project-dist/assets/img/${file}`, err => {
        if (err) throw err;
      });
    })
  });

  fs.readdir('06-build-page/assets/svg', (err, files) => {  // копирование папки svg
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(`06-build-page/assets/svg/${file}`, `06-build-page/project-dist/assets/svg/${file}`, err => {
        if (err) throw err;
      });
    })
  });
};
copyDir();

fs.open('06-build-page/project-dist/style.css', 'w', (err) => {
  if (err) throw err;
});

fs.readdir(
  targetFolder,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (file.isFile()) {
        if (path.extname(`${targetFolder}/${file.name}`) == '.css') {
          fs.readFile(`${targetFolder}/${file.name}`, 'utf8', function (err, data) {
            if (err) throw err; 
            arr.push(data);
            fs.appendFile('06-build-page/project-dist/style.css', data, (err) => {
              if (err) throw err;
            });
          });
        }
      }
    }
    )
  }
);

const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, buffer) => {
      if (err) reject(err); else resolve(buffer);
    });
  });
};

const readDirAsync = (dirname) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, { withFileTypes: true }, (err, buffer) => {
      if (err) reject(err); else resolve(buffer);
    });
  });
};

const writeDataToFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) reject(err);
    });
  });
};



readFileAsync('06-build-page/template.html')
  .then(template => {
    readDirAsync('06-build-page/components')
      .then(files => {
        const objArray = [];
        const promises = files.map((file) => {
          const filePath = `06-build-page/components/${file.name}`;
          const fileName = file.name.substring(0, file.name.lastIndexOf('.'));

          objArray.push({
            fullName: file.name,
            name: fileName,
          });

          return readFileAsync(filePath);
        });

        Promise.all(promises).then((results) => {
          const filesArray = objArray.map((obj, index) => {
            obj.content = results[index];
            return obj;
          });

          filesArray.forEach((item) => {
            if (template.includes(item.name)) {
              template = template.replaceAll(`{{${item.name}}}`, item.content);
            }
          });    

         writeDataToFile('06-build-page/project-dist/index.html', template);
        });
      });
  });

