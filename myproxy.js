const express = require('express')
const request = require('request')

const app = express();
const serverRequest = request.defaults({
    "proxy": "http://proxy.azot.kmr:3128",
})

app.all('/', (req, res) => {
    // console.log(res)
    let url = "http://google.com" + req.url
    req.pipe(serverRequest(url)).pipe(res)
});

app.listen(3001);
