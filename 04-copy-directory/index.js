const fs = require('fs');
const filesCopy = '04-copy-directory/files-copy';
const files = '04-copy-directory/files';

const copyDir = () => {

  fs.stat(filesCopy, function (err) {
    if (!err) {     
      fs.readdir(filesCopy, (err, filesCopy) => {
        if (err) throw err;
        filesCopy.forEach(fileCopy => {
          fs.unlink(`04-copy-directory/files-copy/${fileCopy}`, function(err){
            if (err) {
                console.log(err);
            } else {                
                fs.readdir(files, (err, files) => {
                  if (err) throw err;          
                  files.forEach(file => {
                    fs.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`, err => {                      
                    });
                  })
                });
            }
        });
        })
      });
    }
    else if (err.code === 'ENOENT') {
      fs.mkdir(filesCopy, { recursive: true }, err => {
        if (err) throw console.log('Папка уже создана!');
      });

      fs.readdir(files, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
          fs.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`, err => {
            if (err) throw err;
          });
        })
      });
    }
  });
};

copyDir();


