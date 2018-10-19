const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const myModule = require('./jsonFileReader.js');//my file reader module
const fs = require('fs');
let users =[]

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')

function displayUsers(obj){//my function that compares the user input to the json file after the json file is parsed
  users=obj
}
myModule.readJson('users.json',displayUsers);//calling my module .passing the json file and the callback function
app.get('/', (req, res) => res.render('index',{users}))
app.get('/search', (req, res) => res.render('search'))
app.get('/addUser', (req, res) => res.render('addUser'))

app.post('/searchUser',(req,res)=>{
  res.render('searchResults',{data:req.body,users})
})
app.post('/add',(req,res)=>{
  users.push({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email
  })

  let data = JSON.stringify(users,null,2);
  fs.writeFileSync('users.json', data);
  //myModule.readJson('users.json',displayUsers);
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
