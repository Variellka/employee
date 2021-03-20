const express = require("express");
const fs = require("fs");
const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:63342',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, POST"
}
const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));
app.use(cors(corsOptions));
const filePath = "data.json";

app.get("/api/users", function(req, res){
    const content = fs.readFileSync(filePath,"utf8");
    const users = JSON.parse(content);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.send(users);
});

app.get("/api/users/:id", function(req, res){
    const id = req.params.id;
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    let user = null;

    for(let i=0; i<users.length; i++){
        if(users[i].id===id){
            user = users[i];
            break;
        }
    }
    if(user){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name,
        userEmail = req.body.email,
        userPassword = req.body.password,
        userNativeName = req.body.nativeName,
        userGender = req.body.gender;

    let user = {
        name: userName,
        nativeName: userNativeName,
        email: userEmail,
        password: userPassword,
        gender: userGender,
        department: "-",
        room: "-",
        internalPhone: "-",
        mobilePhone: "-",
        skype: "-",
        cnumber: "-",
        avatar: "https://www.seekpng.com/png/full/245-2454602_tanni-chand-default-user-image-png.png",
        roles:[
            {
                type:"addressbook",
                name:"employee"
            },
            {
                type:"vacation",
                name:"employee"
            },
            {
                type:"admin",
                status:"false"
            }
        ]
    };

    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);



    const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    user.id = String(id+1);
    users.push(user);
    data = JSON.stringify(users);

    fs.writeFileSync("data.json", data);

    res.send(user);
});

app.get("/api/auth", jsonParser, function (req, res) {
    const content = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(content);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    res.send(users);
});

app.post("/api/auth", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);
    const userEmail = req.body.email,
          userPassword = req.body.password;
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);

    let authUser = users.find(item => item.email === userEmail);

    if (authUser === undefined) {
        res.send("User doesn't exist!");
    } else if (authUser.password !== userPassword) {
        res.send("Wrong password!");
    } else {
        res.send(authUser)
    }
});

app.delete("/api/users/:id", function(req, res){

    const id = req.params.id;
    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
    let index = -1;

    for(let i=0; i < users.length; i++){
        if(users[i].id===id){
            index=i;
            break;
        }
    }
    if(index > -1){
        const user = users.splice(index, 1)[0];
        data = JSON.stringify(users);
        fs.writeFileSync("data.json", data);
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.put("/api/users", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    let data = fs.readFileSync(filePath, "utf8");
    const users = JSON.parse(data);
    let user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    if(user){
        user.age = userAge;
        user.name = userName;
        data = JSON.stringify(users);
        fs.writeFileSync("data.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});