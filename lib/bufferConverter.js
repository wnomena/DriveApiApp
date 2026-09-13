const fs = require("fs")
const path = require("path")
const futureFilename = require("./randomfilename")
const { isArrayBufferView } = require("util/types")

function BufferCOnverterWithfs(buffer,ext,callback) {
    console.log(buffer instanceof Buffer)
    //Ce variable est pour déterminer l'accueil de l'image une fois convertir en image avec les information reccuillit, en paramettre, buffer pour les données de l'images, l'extetion du fichier qui va être créer ainsi qu'un paramettre call back pour la sortie
    const futureFilePath = path.join(__dirname + "/.." + `/assests/${futureFilename()}.${ext}`)
    try {
        //Ce méthode est pour créer le fichier depuis le modèle FS et retourne les résultats en callback avev les status selon le status
        fs.writeFileSync(futureFilePath,buffer)
        callback({
            message : "Image créer",
            status : 1
        })
    } catch (error) {
        callback({
            message : error,
            status : 2
        })
    }
    

}

module.exports = BufferCOnverterWithfs