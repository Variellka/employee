export function authorization() {
    let newEmail = document.querySelector('.sign-in-email').value,
        newPassword = document.querySelector('.sign-in-password').value;

    let xhr = new XMLHttpRequest();
    let newUser = {
        email: newEmail,
        password: newPassword
    };
    let json = JSON.stringify(newUser);

    let headers = new Headers();
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    xhr.open("POST", 'http://127.0.0.1:3000/api/auth');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.send(json);

    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let response = xhr.response;
            if (response === "User doesn't exist!" || response === "Wrong password!") {
                document.querySelector('.sign-in-error').innerHTML = response;
            } else {
                localStorage.setItem("currentUser", response);
                let authUser = JSON.parse(localStorage.getItem("currentUser"))
                setHeader(authUser);
                document.querySelector('.sign-in-block').style.display = 'none';
            }
        }
    }
}

export function setHeader(authUser) {
    let header = document.querySelector('.header-personal');
    let headerName = header.querySelector('p');
    headerName.innerHTML = authUser.name;
    let headerImg = header.querySelector('img');
    headerImg.src = authUser.avatar;

    document.querySelector('.logout').style.display = 'none';

    let quitButton = document.querySelector('.quit')
    quitButton.style.display = 'block';
    quitButton.addEventListener('click', function () {
        localStorage.removeItem("currentUser");
        window.location.reload();
    })
}