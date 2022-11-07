// const fs = require('fs');
// const readableStream = fs.createReadStream('01-read-file/text.txt');
// readableStream.on('data', chunk => console.log(chunk.length));

const fs = require('fs');
const stream = fs.ReadStream('01-read-file/text.txt', 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));