
const input=require("readline-sync")
const fs =require("fs")
function file(mobile,info){
    if(fs.existsSync("user_data.json")){
        data_dict=JSON.parse(fs.readFileSync("user_data.json"))
        data_dict[mobile] = info
        fs.writeFileSync("user_data.json",JSON.stringify(data_dict,null,4))
        return data = {mobile:info}
    }
    else{
        let data_dict = {}
        data_dict[mobile] = info
        fs.writeFileSync("user_data.json",JSON.stringify(data_dict,null,4))
        return data = {mobile:info}
    }
}
function signup(data_dict){
    mobile=input.questionInt("enter your mobile number :- ")
    let len=String(mobile)
    if(len.length==10){
        if(!(mobile in data_dict)){
            let user_name=input.question("enter your name :- ")
            let gmail=input.question("enter your G-mail :- ")
            let password = pass()
            let info={"user_name":user_name,"password":password,"gmail":gmail}
            let data = file(mobile,info)
            console.log("you are sign up in your A.c",data);
            return option(mobile)
        }
        else{
            console.log("Account with this number already exists!! Try LogIn!!  ");
            return option()
        }
    }
    else{
        console.log("you are dail 10 digit number !!");
        return option()
    }
}
function pass(){
    password=input.question("enter your password :- ")
    if(password.length>=8){
        if((password >= 'a' && password <= 'z') ||(password >= 'A' && password <= 'Z') ||(password >= '0' && password <= '9') ||password.includes('!') ||password.includes('@') ||password.includes('#')){
            return password
        }
        else{
            console.log("your pasword must be one capital letter , one small letter,one number and also speical chercter ");
             return pass()
        }
    }
    else{
        console.log("your password length is not greter and equel to 8 digits !!!");
        return pass()
    }
}
function login(){
    let data_dict=JSON.parse(fs.readFileSync("user_data.json"))
    let mobile=input.questionInt("enter your login mobile :-  ")
    let len=String(mobile)
    if(len.length==10){
        if(mobile in data_dict){
            let pass=input.question("enter your login password :- ")
            if(pass==data_dict[mobile]["password"]){
                console.log("your A.C is succecfully login");
                opretion(mobile)
            }
            else{
                console.log("your password is wrong ");
                return option(mobile)
            }
        }
        else{
            console.log("your phone number  is wrong. ");
            return option(mobile)
        }
    }
    else{
        console.log("your mobile number is less in 10 try again!!!");
        return option(mobile)
    }
}
function read(mobile){
    data_dict=JSON.parse(fs.readFileSync("user_data.json"))
    console.log("you are sign up in your A.c",data_dict[mobile]);
    opretion(mobile)
}
function update(mobile){
    let data_dict=JSON.parse(fs.readFileSync("user_data.json"))
    console.log("what do you want to:-  ");
    let co=1
    var temp = []
    for(let i in data_dict[mobile]){
        if (i=="user_name"){
            continue
        }
        else{
            console.log(`${co}. ${i}`);
            temp.push(i)
            co++
        }
    }
    temp.push('add')
    console.log((co),".Add");
    
    choice=input.question("choose the what you want to update :-  ")
    if(temp.includes(choice)){
        if(choice!='add'.toLowerCase()){
        val = input.question("data for ", choice)
        data_dict[mobile][choice] = val
        }
        else{
            choice=input.question("What data you want to add :-  ")
            val = input.question("data for ", choice)
            data_dict[mobile][choice] = val
        }
        fs.writeFileSync("user_data.json",JSON.stringify(data_dict,null,4))
        console.log('your data is updated \n',data_dict[mobile]);
        opretion(mobile)
    }
    else{
        console.log("you are choosing wrong button");
        opretion(mobile)
    }
}
function deleted(mobile){
    data_dict=JSON.parse(fs.readFileSync("user_data.json"))
    let co=1
    for(let i in data_dict[mobile]){
        if (i=="user_name"){
            continue
        }
        else{
        console.log(`${co}. ${i}`);
        co++
        }
    }
    choice=input.question("what do you want to remove :-  ");
    if(choice in data_dict[mobile]){
        delete data_dict[mobile][choice]
        fs.writeFileSync("user_data.json",JSON.stringify(data_dict,null,4))
        console.log("your",choice,"is remove...");
        opretion(mobile)
    }
    else{
        console.log("Invalid");
        operation(mobile)
    }
}
function opretion(mobile){
    console.log("what do you want  :-\n1.read\t\n2.update\t\n3.delete\t\n4.log-out  ");
    let option1=input.questionInt("enter the option :- ")
    if(option1==1){
        read(mobile)
    }
    else if(option1==2){
        update(mobile)
    }
    else if(option1==3){
        deleted(mobile)
    }
    else if(option1==4){
        console.log("log-out the program")
        return option()
    }
    else{
        console.log("invailid input");
        return operation(mobile)
    }
}
function option(){
    if(!fs.existsSync("user_data.json")){
        let data_dict = {}
        fs.writeFileSync("user_data.json",JSON.stringify(data_dict,null,4))
    }
    let data_dict=JSON.parse(fs.readFileSync("user_data.json"))
    console.log("choose the option :- \n1.SIGN-UP\n2.LOGIN\n3.EXIT");
    let option2=input.questionInt("enter the option :- ")
    
    if(option2==1){
        signup(data_dict)  
    }
    else if(option2==2){
        login(data_dict)
    }
    else if(option2==3){
        console.log("Programme Closed!! ");
        return
    }
    else{
        console.log("invalid input");
        return option()
    }
}
option()