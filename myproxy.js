const express = require('express')
const request = require('request')

const app = express();
const serverRequest = request.defaults({
    "proxy": "http://proxy.azot.kmr:3128",
    // "proxy": "http://proxy.azot.kmr:3128",
})

app.all('*', (req, res) => {
    console.log(res)
    // let url = "http://t.me" + req.url
    // let url = req
    let url = req.url
    req.pipe(serverRequest(url)).pipe(res)
    // req.pipe(serverRequest(url)).pipe(res)
});

app.listen(3001);
