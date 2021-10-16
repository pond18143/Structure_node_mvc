var DB1 = require("../models/AssignmentDB.json"); //import model
var DB2 = require("../models/TurnInDB.json"); //import model
const fs = require("fs"); // for writing file => save data
const AssignmentDB = DB1;
const TurnInDB = DB2;

class logic {
    CreatePolitic(req) {
        var FunctionName = "[CreatePolitic]";
        console.log("InPut" ,req)
        let Assignment = req.Assignment;
        let Detail = req.Detail;
        let DueDate = req.DueDate;
        let StudentId = req.StudentId
        let StudentId2 = req.StudentId2



        let msg; //object for respond
        let data; //data for insert to DB
        try {
            // check req Assignment
            if (Assignment == null) {
                return "require Assignment"
            }
            // check req StudentId
            if (StudentId == null) {
                return "require StudentId"
            }
            data = {
                //Data res
                Assignment: Assignment,
                Detail: Detail,
                DueDate: DueDate,
                StudentId: StudentId,
                StudentId2: StudentId2  ,
            };
            AssignmentDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(AssignmentDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/AssignmentDB.json", jsonString, (err) => {
                if (err) {
                    console.log(" JSON File Created Failed! ", err);
                } else {
                    console.log(" JSON File Created!");
                }
            });

            msg = {
                Data: AssignmentDB,
              };
            console.log("Create Assignment success")
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

    TurnIn(req) {
        var FunctionName = "[TurnIn]";
        console.log("InPut" ,req)
        let IdStudent = req.IdStudent
        let AssignmentName = req.AssignmentName;
        let TextAnswer = req.TextAnswer;
        let TurnInDate = new Date();

        let msg; //object for respond
        let data; //data for insert to DB

        try {
            // check req IdStudent
            if (IdStudent == null) {
                return "require IdStudent"
            }
            // check req AssignmentName
            if (AssignmentName == null) {
                return "require AssignmentName"
            }
            data = {
                //Data res
                IdStudent: IdStudent,
                AssignmentName: AssignmentName,
                TextAnswer: TextAnswer,
                TurnInDate: TurnInDate,
            };
            TurnInDB.push(data);

            //Convert Value to JSON
            let jsonString = JSON.stringify(TurnInDB, null, 2);

            //Write data to JSON file => Save data
            fs.writeFileSync("./models/TurnInDB.json", jsonString, (err) => {
                if (err) {
                    console.log(" JSON File Created Failed! ", err);
                } else {
                    console.log(" JSON File Created!");
                }
            });

            msg = {
                Data: AssignmentDB,
            };
            console.log("TurnIn Success")
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

    GetAssignment(req) {
        var FunctionName = "[GetAssignment]";
        let summary = []
        let data

        for (let i = 0; i < AssignmentDB.length; i++) {
            // ส่งงานแล้วทันเวลา
            if (TurnInDB[i].IdStudent == AssignmentDB[i].StudentId || TurnInDB[i].IdStudent == AssignmentDB[i].StudentId2) {
                if (TurnInDB[i].TurnInDate < AssignmentDB[i].DueDate) {
                    data = {
                        //Data
                        Assignment_id: AssignmentDB[i].Assignment,
                        Student: TurnInDB[i].IdStudent,
                        summarize: "ส่งงานแล้วทันเวลา"
                    };
                    summary.push(data);
                }
                // ส่งงานแล้วช้ากว่ากําหนด
                if (TurnInDB[i].TurnInDate >= AssignmentDB[i].DueDate) {
                    data = {
                        //Data
                        Assignment_id: AssignmentDB[i].Assignment,
                        Student: TurnInDB[i].IdStudent,
                        summarize: "ส่งงานแล้วช้ากว่ากําหนด"
                    };
                    summary.push(data);
                }
            }
            // ยังไม่ส่งงาน
            if (TurnInDB[i].IdStudent != AssignmentDB[i].StudentId || TurnInDB[i].IdStudent != AssignmentDB[i].StudentId2) {
                data = {
                    //Data
                    Assignment_id: AssignmentDB[i].Assignment,
                    Student: TurnInDB[i].IdStudent,
                    summarize: "ยังไม่ส่งงาน"
                };
                summary.push(data);
            }

        }
        //Convert Value to JSON
        let jsonString = JSON.stringify(summary, null, 2);

        //Write data to JSON file => Save data
        fs.writeFileSync("./models/SummaryDB.json", jsonString, (err) => {
            if (err) {
                console.log(" JSON File Created Failed! ", err);
            } else {
                console.log(" JSON File Created!");
            }
        });
    }
}
module.exports = logic;