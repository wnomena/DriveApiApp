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
    //Ce variable est une fonction qui prend en paramettre l'identifiant de l'image dans google drive et il retourne une promesse qui va retourner le résultat de l'api de google drive
    const fileStatus = FileStatus("1p_r84Rhu5E1YeA7uLjfZB-POB3FEiiEA")
    fileStatus.then((p) => {
        const ext = p.headers.get('content-type').split("/")[1]

        // Collecte propre de tous les chunks du stream
        const chunks = []
        p.data.on("data", (chunk) => {
            chunks.push(chunk)
        })

        p.data.on("end", () => {
            // Concaténation de tous les chunks en un seul Buffer complet
            const buf = Buffer.concat(chunks)
            console.log("Buffer total reçu :", buf.length, "octets")

            //Cette fonction est pour la convertion du buffer de sortie de lapi de google pour le convertir en réel image, il prend en paramettre le buffer, l'extension de l'image sortie aussi du resultat de l'api, et un callback de sortie pour le résultat
            ConvertBufferToRealFile(buf, ext, function ({message, status}) {
                console.log("Résultat conversion :", message)
            })

            //Transformation du Buffer en fichier dur depuis le module FS
            return res.json({message : "Mande de api t6 olana"})
        })

        p.data.on("error", (err) => {
            console.log("Erreur stream :", err)
            return res.status(500).json({
                message : "Erreur lecture stream",
                error : err.message
            })
        })
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