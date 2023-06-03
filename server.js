const express = require('express');
const ejs = require('ejs');
var path = require('path');
const qrcode = require("qrcode");

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const app = express();

// view engine setup
console.log('--dirname',__dirname);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/',(req,res) => {
    res.render('index');
});

app.post("/generate-qr", (req, res, next) => {
    try{
        const { url } = req.body;
        if(!url.trim()) return res.status(404).json({"error":"Enter a valid url"});
        qrcode.toDataURL(url, (err, row) => {
            if (err) res.send("Something went wrong!!");
                res.render("qrcode", { title : url, qr_code: row });
            });
    }catch(err){
        res.status(500).json({error : err.message});
    }
});

app.listen(PORT,(err) =>{
    if(err) console.log(err);
    console.log(`server listening on http://localhost/${PORT}`);
});

