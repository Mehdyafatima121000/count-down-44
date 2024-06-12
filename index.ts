#! /usr/bin/env node
import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns"
import { log } from "console";
import { clearScreenDown } from "readline";

const res = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the amount of second",
    validate: (input)=>{
        if(isNaN(input)){
            return "please enter valuid number"
        }else if (input > 60){
            return "seconds must be in 60"

        }else{
            return true;
        }
    }
});

let input = res.userInput
function startTime(val:number){
    const inTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date (inTime);
    setInterval((()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currentTime);

        if (timeDiff <= 0){
            console.log("Timer has expired");
            process.exit()
        }
        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
}),1000)
}
startTime(input)