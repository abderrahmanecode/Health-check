const express = require('express')
const app = express();
const cors = require('cors')
// use cors to allow cross origin resource sharing
app.use(cors({ origin: '*' }))

var pjson = require('./package.json');
console.log(pjson.version);

var path = __dirname;
var result =path.replace(/\\/gi, "/");
console.log("Current directory:", result+"/package.json");


 

// define / on get
app.get('/', (req, res) => {

    res.send('I am alive')

    }
)

//listen on port 3001

app.listen(3001, () => {
    console.log("listening on port 3001")})
