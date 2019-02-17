const mongoCollection = require("./mongoCollections");
const articles = mongoCollection.articles;
const uuid = require("node-uuid");
//var xss = require("xss")

let exportedMethods = {

    async addText(text) {
        const textCollection = await articles();
        let newText = {
            _id: uuid.v4(),
            rText: text
        }
        console.log("New text", text)
        const insertTextDB = await textCollection.insertOne(newText);
        if (insertTextDB.insertedCount === 0) throw "Could not add Text";
        return text;
    }
}


module.exports = exportedMethods;