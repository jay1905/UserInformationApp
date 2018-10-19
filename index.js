const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const myModule = require('./jsonFileReader.js');//my file reader module
const fs = require('fs');
let users =[]

app.use(express.static(__dirname + '/public'));//declaring my paths for css
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')

function displayUsers(obj){//my function that compares the user input to the json file after the json file is parsed
  users=obj//after i parse the json file i store in a value for later use
}
myModule.readJson('users.json',displayUsers);//calling my module .passing the json file and the callback function
app.get('/', (req, res) => res.render('index',{users}))//request for pages
app.get('/search', (req, res) => res.render('search'))
app.get('/addUser', (req, res) => res.render('addUser'))

app.post('/searchUser',(req,res)=>{
  res.render('searchResults',{data:req.body,users})//search results are stored in req.body
})
app.post('/add',(req,res)=>{//request to add user
  users.push({//add user to my array users
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email
  })
  let data = JSON.stringify(users,null,2);// get my new array ready for writing to json file
  fs.writeFileSync('users.json', data);//update the json file
  res.redirect('/')//redirect to the home page to display the users
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
