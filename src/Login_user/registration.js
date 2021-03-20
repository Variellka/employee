import {Admin, User} from "./user";

export function addNewUser() {
    let newName = document.querySelector('.sign-up-name').value,
        newEmail = document.querySelector('.sign-up-email').value,
        newPassword = document.querySelector('.sign-up-password').value,
        newNativeName = document.querySelector('.sign-up-native-name').value,
        newGender = document.querySelector('select').value;

    if (newGender === 'male') {
        newGender = 1;
    } else newGender = 2;

    let xhr = new XMLHttpRequest();

    /*let newUser = {
        name: newName,
        email: newEmail,
        password: newPassword,
        nativeName: newNativeName,
        gender: newGender
    };*/
    
    // let newUser = new User(newName, newPassword);

    let admin = new Admin(newName, newPassword);
    let json = JSON.stringify(newUser);

    let headers = new Headers();
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    xhr.open("POST", 'http://127.0.0.1:3000/api/users');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(json);
}