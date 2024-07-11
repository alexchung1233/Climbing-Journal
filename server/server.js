const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, '..', 'app', 'dist');
const port = process.env.PORT || 5000;
app.use(express.static(publicPath));
app.get('*', (res, req) => {res.sendFile(path.join(publicPath, 'index.html'))});

app.listen(port, ()=>{console.log('Listening on port %d', port)});