const randomcreatorstring = require("randomstring")


function CreateRandomFileName() {
    return randomcreatorstring.generate(Math.floor(Math.random() * (32 - 15) + 15))
}

module.exports = CreateRandomFileName