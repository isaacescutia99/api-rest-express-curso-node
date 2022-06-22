const express=require("express");
const Joi = require('joi');

const app=express();
/**array de objetos de nombre */
const usuarios=[
    {id:1,nombre:"Sofia",edad:22},
    {id:2,nombre:"Maria",edad:23},
    {id:3,nombre:"Jose",edad:24},
    {id:4,nombre:"Luis",edad:25},
]


/**Metodo get */
app.get("/api/usuarios",(req,res)=>{
    res.send(usuarios);
})

function loggin(req,res,next){
    console.log("login");
    next();
}

module.exports = loggin;