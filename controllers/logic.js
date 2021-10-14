var DB = require("../models/tmpDB.json"); //import model
const fs = require("fs"); // for writing file => save data
const tmpDB = DB;

class logic {
    async CreatePolitic(req) {
        var FunctionName = "[CreatePolitic]";
        console.log(req)
        let Fname = req.Fname;
        let Lname = req.Lname;
        let University = req.University;
        let PartyName = req.PartyName

        let msg; //object for respond
        let data; //data for insert to DB
        try {
            data = {
                //Data
                Fname: Fname,
                Lname: Lname,
                University: University,
                PartyName: PartyName,
            };
            tmpDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(tmpDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/tmpDB.json", jsonString, (err) => {
                if (err) {
                    console.log(" Write file fail ", err);
                } else {
                    console.log(" Write file success");
                }
            });


            msg = {
                StatusCode: 201,
                Data: tmpDB,
              };
            return msg;
        } catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`,
            };

            console.log(messageError);
            return messageError;
        }
    }

}
module.exports = logic;