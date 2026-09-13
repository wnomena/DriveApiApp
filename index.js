const express = require("express")
const FileStatus = require("./lib/downloader");
const ConvertBufferToRealFile = require("./lib/bufferConverter")

const app = express()
const port = 11111

app.use((req,res,next) => {
    console.log(req.url)
    next()
})


app.get("/teste",(req,res) => {
    return res.json("Bonjour")
})

app.get("/driveGetter",(req,res) => {
    //Ce variable est une fonction qui prend en paramettre l'identifiant de l'image dans google drive et il retourne une promesse qui varetourner le retour le 'api de google drive
    const fileStatus = FileStatus("1p_r84Rhu5E1YeA7uLjfZB-POB3FEiiEA")
    fileStatus.then((p) => {
        let buf = new Buffer.from(Array.from(p.data._readableState.buffer).at(0))
        console.log(Array.from(p.data._readableState.buffer).at(0)[1].toString())    
        //Cette fonction est pour la convertion du buffer de sortie de lapi de google pour le convertir en réel image, il prend en paramettre le buffer, l'extension de l'image sortie aussi du resultat de l'api, et un callback de sortie pour le résultat
        ConvertBufferToRealFile(buf,p.headers.get('content-type').split("/")[1],function ({message,status}) {
            console.log("message")
        })

        //Transformation du Buffer en fichier dur depuis le module  FS

        return res.json({message : "Mande de api t6 olana"})
}).catch((error) => {
    console.log(error)
    return res.status(500).json({
        message : "Misy olana",
        error : error
    })
})
})

app.listen(port,() => console.log("Server Up"))

//182Jr-3FaduKYMNxprmnxcaFjHFDXS5sf