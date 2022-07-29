const express = require('express')
const app = express();
const cors = require('cors')
// use cors to allow cross origin resource sharing
app.use(cors({ origin: '*' }))
var pjson = require('./package.json');
console.log(pjson.version);
// define / on get
app.get('/', (req, res) => {
    res.send('Yes, I am alive')
    }
)

//listen on port 3003

app.listen(3003, () => {
    console.log("listening on port 3003")})
