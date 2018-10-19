
var fs = require('fs');//include fs for reading files

exports.readJson=function(filename, callback){//exports so i can include my module in another file

  fs.readFile(filename, function (err, data) {//read the passed in json file

       callback(JSON.parse(data))//callback the function we have passed in. give the parsed json file as parameter
      
    });
}
