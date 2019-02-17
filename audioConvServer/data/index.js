const mongoCollections = require("../setting/mongoCollection");
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');
var cookie = "";
module.exports = {

    setCookie(id) {
        this.cookie = id;
    },

    getCookie() {
        return this.cookie;
    },

    async createUser(userDetails) {
        try {

            const userCollection = await users();
            // console.log(userDetails);
            var hashed;

            // await bcrypt.hash(userDetails.password, 10, (err, hash) => {
            //     // if (hashed) {
            //         hashed = hash;
            //         // next();
            //     // }
            // });
            // console.log(userDetails.password + "hgv");

            // await bcrypt.genSalt(10,  (err, salt) => {
            // bcrypt.hash(userDetails.password, 10, function (err, hash) {
            //     // Store hash in your password DB.
            //     hashed = hash;
            // });
            // });
            // console.log(userDetails.password)
            // ;            await bcrypt.hash(userDetails.password, null,null, function (err, hash) {
            //                         // Store hash in your password DB.
            //                         hashed = hash;
            //                     });

            // let hash = await bcrypt.hash(userDetails.password, 16);

            let newUser = {
                _id: uuidv1(),
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.emailAddress,
                password: userDetails.password
            }

            // console.log(newUser);

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

            // let passwordCheck = await bcrypt.compareSync(loginDetail.password, user.password);

            let passwordCheck = loginDetail.password == user.password ? true : false;

            // console.log(passwordCheck);

            if (passwordCheck) {
                if (user.hasOwnProperty("colleagues")) {
                    return { success: true, colleagues: true, _id: user._id }
                }
                else {
                    return { success: false, colleagues: false, _id: user._id }
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

    async saveColleagues(colleagues) {

        // console.log(this.getCookie());
        try {
            let id = this.getCookie();

            const userCollection = await users();

            let user = await this.getUser(id);

            // console.log(JSON.parse(colleagues));

            let updateData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                colleagues: JSON.parse(colleagues)
            }
            console.log("updateData" + updateData);

            let updateCommand = {
                $set: updateData
            };

            const query = {
                _id: id
                // _id: id
            };

            user = await userCollection.updateOne(query, updateCommand);

            if (user == null) {
                return { message: "Could notUpdate Form" };
            }

            console.log(user);
            user = await this.getUser(id);

            return user;
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
            console.log(user);
            if (user === null) return { message: `There is no such user with the ID "${id}" in database.` };

            return user;
        }
        catch (e) {
            console.log(e);
        }
    }

}