const express=require("express");
// const login=require("./logger");
const { func } = require("Joi");
const morgan=require("morgan");
const config=require("config");
const app=express();
const Joi =require("Joi");

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
console.log("aplicacion", config.get("nombre"))
console.log("Base de datos", config.get("configBD.host"))

// //creacion de un middleware
// app.use(login);

// app.use(function(req,res,next){
//     console.log("autenticando...");
//     next();
// })

//Uso de middleware desde terceros
app.use(morgan("tiny"));

const usuarios=[
    {id:1,nombre:"Luis"},
    {id:2,nombre:"Maria"},
    {id:3,nombre:"Santiago"}
]

app.get("/",(req,res)=>{
    res.send("hola mundo");
})

app.get("/api/usuarios",(req,res)=>{
    res.send(usuarios);
})

app.get("/api/usuarios/:nombre/:id",(req,res)=>{
    let usuario=usuarioExistente(req.params.id);
    if(!usuario){res.status(404).send("Usuario no encontrado")};

    res.send(usuario);
})

app.post("/api/usuarios",(req,res)=>{    
   const {error,value}= validarUsuario(req.body.nombre);
   if(!error){
    const usuario={
        id: usuarios.length+1,
        nombre: value.nombre,
    }

    usuarios.push(usuario);
    res.send(usuario);
    console.log(usuarios);
   }else{
    res.status(404).send(error.message);
   }

    
})

app.put("/api/usuarios/:id",(req,res)=>{
    
    let usuario=usuarioExistente(req.params.id);
    if(!usuario){res.status(404).send("Usuario no encontrado")};

    

    const {error,value}= validarUsuario(req.body.nombre)
    if(error){
        res.status(404).send(error.message);
        return;
    }

    usuario.nombre=value.nombre;
    res.send(usuario)


});

app.delete("/api/usuarios/:id",(req,res)=>{
    let usuario=usuarioExistente(req.params.id);
    if(!usuario){res.status(404).send("Usuario no encontrado");return;};

    let indece=usuarios.indexOf(usuario);
    usuarios.splice(indece,1);

    res.send(usuarios); 


})



const port =process.env.PORT || 300;

app.listen(port,()=>{
    console.log(`Este es el puerto ${port}`)
})

function usuarioExistente(id){
    return(usuarios.find(u=>u.id===parseInt(id)));
}

function validarUsuario(nom){
    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .required(),
    });

    return(schema.validate({ nombre: nom}));
}