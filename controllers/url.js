const {nanoid}= require("nanoid")
const URL = require('../models/url')

async function GenerateNewShortURL(req,res) {
const body = req.body;
if(!body.url){
    return res.status(400).json({error:'url is required'})
}
    const shorterurl = nanoid(8)
    await URL.create({
        shortId:shorterurl,
        redirectURL:body.url,
        visitHistory:[],

    })

    return res.render("home",{id:shorterurl})
}

module.exports={
    GenerateNewShortURL,
}