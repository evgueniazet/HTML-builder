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

fs.readdir(targetFolder,
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (file.isFile()) {
        if (path.extname(`${targetFolder}/${file.name}`) == '.css') {
          fs.readFile(`${targetFolder}/${file.name}`, 'utf8', function (err, data) {
            if (err) throw err; // ошибка чтения файла
            arr.push(data);
            fs.appendFile('06-build-page/project-dist/style.css', data, (err) => {
              if (err) throw err;
            });
          });
        }
      }
    }
    )
  });


  fs.readFile('06-build-page/template.html', 'utf8', 
            function(error,data){
                if(error) throw error; 
                console.log(data);  
});



