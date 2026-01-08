const express = require('express')
const {connectmongodb} = require('./connect')
const urlroute = require('./routes/url')
const URL = require('./models/url')
const staticroute = require('./routes/static-route')
const app = express()
const PORT = process.env.PORT ||8001
const path = require('path')


connectmongodb('mongodb://127.0.0.1:27017/short-url')
.then(()=>{
    console.log(`Connected successfully`)
})

app.set("view engine" , "ejs")
app.set("views",path.resolve("./views"))


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/url",urlroute)
app.use("/",staticroute)

app.get('/:shortId',async(req,res)=>{
const shortId = req.params.shortId

if (shortId === 'favicon.ico') {
        return res.status(204).end();
    }
const entry = await URL.findOneAndUpdate(
    {shortId},
    {$push:{visitHistory:{timestamp:Date.now()}}},
    { new: true }
)

  if (!entry) {
        return res.status(404).send("Short URL does not exist");
    }

res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>{
    console.log(`Server has started at Port:${PORT}` )
})