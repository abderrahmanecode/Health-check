const express = require('express')

const app = express();
const cors = require('cors')
const axios = require('axios');
const { response } = require('express');
const { Timestamp } = require('mongodb');
const  timeago = require('timeago.js');

app.use(cors({ origin: '*' }))
// use json parser for post data
app.use(express.json())



let serverList = [
    {alias:"test1",url:'http://localhost:3001',port:3001},
    {alias:"test2",url:'http://localhost:3002',port:3002},
    {alias:"test3",url:'http://localhost:3003',port:3003}
    //{alias:"Calendar app",url:'http://localhost:3000',port:3000}
    //{alias:"Google",url:'https://www.google.com'},
    //{alias:"Wafa Assurance",url:'https://www.wafaassurance.ma'},
    //{alias:"Wafa Assurance",url:'https://www.wafaassurance.com'},//on va tester un site inexistant
    //{alias:"Facebook",url:'https://www.facebook.com'},
    //{alias:"Figma",url:'https://www.figma.com'}
]


async function pingServer(server) {
    //test if server is running  and return the response code
    try {
        const response = await axios.get(server)
        return response.status
    } catch (error) {
        return 0
    }  
}
//function return date of running server
function getServerTime() {
    let date = new Date().toISOString()
    
    return date
}


async function pingAllServers() {
   
    
    let serverListWithResponseCode = []
    for (let i = 0; i < serverList.length; i++) {
        let server = serverList[i]
        serverList[i].timest
        if(server.Timestamp===''){
            server.Timestamp = new Date().getTime();
        }
        
        let status = server.status;
        let build = require ('D:/Abdo files/Health_check/test servers/'+server.alias+'/package.json')
        let VS = build.version
        let responseCode = await pingServer(server.url)
           
       /* if(responseCode == 200) { 
              if(server.status== undefined ){
                 
                 serverListWithResponseCode.push({
                 name: server.alias,
                 responseCode: responseCode,
                 status : "UP",
                 url: server.url,
                 port: server.port,
                 base: server.base,
                 version: VS
                   })
                   server.status = 'Up'
                   console.log(`${server.url} is ${server.status}`)
                 } 
             else{
                    server.DateTime=getServerTime();
                    serverListWithResponseCode.push({
                    name: server.alias,
                    responseCode: responseCode,
                    status : "UP",
                    url: server.url,
                    port: server.port,
                    base: server.base,
                    version: VS,
                    DateTime: getServerTime()
                      })
                      console.log(`${server.url} is ${status} since  `)
                 }
               } 
        else { 
         //  let counter = 0
                if(status==undefined){
                        status = "Down"
                        serverListWithResponseCode.push({
                        name: server.alias,
                        responseCode: responseCode,
                        status : "DOWN",
                        url: server.url,
                        port: server.port,
                        base: server.base,
                        version: VS
                        })
                        console.log(`${server.alias} is ${status}`)
                    }
                else {
                    dateT = getServerTime();
                    serverListWithResponseCode.push({
                    name: server.alias,
                    responseCode: responseCode,
                    status : "DOWN",
                    url: server.url,
                    port: server.port,
                    base: server.base,
                    version: VS,
                    datetime: dateT
                           })
                           console.log(`${server.alias} is ${status} since ${datetime}`)
                      }
                }
            }
            return serverListWithResponseCode
        */
         try{
           const response = await axios.get(server.url)
              if(response.status == 200){
                console.log(`${server.url} is Up since ${timeago.format(server.Timestamp)}`);
              }
              if(server.status!="UP"){
                server.status = "UP"
                server.Timestamp = new Date().getTime(); 
              }
         }
         catch(error){
            console.log(`${server.url} is Down since ${timeago.format(server.Timestamp)}`);
         }
         if (server.status=="UP"){
            server.status="DOWN"
            server.Timestamp = new Date().getTime();
         }
        }
}         
app.get('/api/servers', async (req, res) => {
    try{
        let response = pingAllServers()
        res.json(response);
        }
    catch(e){
        console.log(e);
    }
})
app.post('/api/servers', async (req, res) => {
    
    let server = req.body
    let found = false
    for (let i = 0; i < serverList.length; i++) {
        if (serverList[i].url == server.url) {
            found = true
            break
        }
    }
    if (!found) {
        serverList.push(server)
        res.json({ message: 'server added' })
    }
    else {
        res.json({ message: 'server already in list'})
    }
}
)
 
app.put('/update', async (req, res) => {
    let server = req.body
    let found = false
    for (let i = 0; i < serverList.length; i++) {
        if (serverList[i].url == server.url) {
            found = true
            serverList[i] = server
            break
        }
    }
    if (!found) {
        serverList.push(server)
        res.json({ message: 'server added' })
    }
    else {
        res.json({ message: 'server already in list' })
    }
}
)

app.delete('/delete', async (req, res) => {
    let server = req.body
    let found = false
    for (let i = 0; i < serverList.length; i++) {
        if (serverList[i].url == server.url) {
            found = true
            serverList.splice(i, 1)
            break
        }
    }
        if (!found) {
        res.json({ message: 'server not in list' })
        }
    else {
        res.json({ message: 'server deleted' })
    }
})
app.listen(3004, () => {
    console.log('Server listening on port 3004')
})
