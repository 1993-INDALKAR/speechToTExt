const mongoCollections = require("../setting/mongoCollection");
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

module.exports = {

    async createUser(userDetails) {
        try {

            const userCollection = await users();
            console.log("newUser");
            let hash = await bcrypt.hashSync(userDetails.password, 10);

            let newUser = {
                _id: uuidv1(),
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.emailAddress,
                password: hash
            }

            console.log(newUser);

            const insertInfo = await userCollection.insertOne(newUser);

            if (insertInfo.insertedCount === 0) return { message: "Could not Create User" };
            const newId = insertInfo.insertedId;
            const user = await this.getUser(newId);
            console.log(user);
            return user;

        }
        catch (e) {
            console.log(e);
        }
    },

    async checkUser(loginDetail) {
        try {

            const userCollection = await users();

            const user = await userCollection.findOne({ email: loginDetail.userName });

            if (user === null) return { message: `Something is wrong with Username or Password` };

            // console.log(user);

            let passwordCheck = await bcrypt.compareSync(loginDetail.password, user.password);

            console.log(passwordCheck);

            if (passwordCheck) {
                if (user.hasOwnProperty("colleagues")) {
                    return { success: true, colleagues: true }
                }
                else {
                    return { success: false, colleagues: false }
                }
            }
            else {

                return { message: `Something is wrong with Username or Password` };
            }

            // user = await userCollection

        }
        catch (e) {
            console.log(e);
        }
    },

    async getUser(id) {
        try {

            if (typeof id != "string") {
                return { message: "id is not a string in getRecipe function" };
            }

            if (!id) return { message: "Please Provide an ID." };

            const userCollection = await users();



            const user = await userCollection.findOne({ _id: id });

            if (user === null) return { message: `There is no such user with the ID "${id}" in database.` };

            return user;
        }
        catch (e) {
            console.log(e);
        }
    }

}