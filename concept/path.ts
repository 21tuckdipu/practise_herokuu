
const path = require("path");

//fetching the Current Directoy and File Name
console.log("CurrentDirectory",__dirname);
// console.log("File Name",__filename);

//GET THE FILE-OPRATIONS
// let filePath = path.basename('/user/module/test.txt');
// console.log(filePath)
// filePath = path.basename('/user/module/test.txt',".txt");
// console.log(filePath);

//fetch the extension path
// const fileExtension = path.extname("index.html")
// console.log(fileExtension)

//joins
const filePath = path.join("/users","docx","log.txt");
console.log(filePath);
const filePath_02 = path.join("../users","./parents","log.txt");
console.log(filePath_02);

//extensions
const filePathOperations = path.join(__dirname,"..","upload-file","averageCount.txt")
console.log("PathOperaton : ",filePathOperations)