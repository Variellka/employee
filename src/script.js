import "./style.scss";
import {authorization, setHeader} from "./Login_user/authorization.js";
import {addNewUser} from "./Login_user/registration.js";
import {loadSettings} from "./Main_components/settings.js";
import {handleCardClick} from "./Main_components/detail_card.js";
import {makeGridView, makeTableView} from "./Main_components/employee_list_view.js";

let authUser;

function getAuthUser() {
    authUser = JSON.parse(localStorage.getItem("currentUser"));
}

window.onload = function () {
    loadServer();
    getAuthUser();
    if (authUser) {
        setHeader(authUser);
    } else signInModal();
};

function checkAndDisplayElement(role, elementId) {
    if (!authUser.roles.includes(role)) {
        document.getElementById(elementId).style.display = 'none';
    }
}

window.addEventListener("load", function () {
    checkAndDisplayElement('admin', 'tab-3');
    let myTabs = document.querySelectorAll("ul.nav-tabs > li");

    function myTabClicks(tabClickEvent) {
        for (let i = 0; i < myTabs.length; i++) {
            myTabs[i].classList.remove("active");
        }
        let clickedTab = tabClickEvent.currentTarget;
        clickedTab.classList.add("active");
        tabClickEvent.preventDefault();
        let myContentPanes = document.querySelectorAll(".tab-pane");
        for (let i = 0; i < myContentPanes.length; i++) {
            myContentPanes[i].classList.remove("active");
        }
        let anchorReference = tabClickEvent.target;
        let activePaneId = anchorReference.getAttribute("href");
        let activePane = document.querySelector(activePaneId);
        activePane.classList.add("active");

        let employeesList = document.querySelector('.employees-block');
        let detailCard = document.querySelector('.card-information');
        if (detailCard) {
            detailCard.remove()
            employeesList.style.display = 'block';
        }
    }

    for (let i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener("click", myTabClicks)
    }

});

function loadServer() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:3000/api/users');
    xhr.send();

    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let employees = JSON.parse(xhr.response);
            loadEmployees(employees);
            loadSettings(employees);
        }
    };
}

let tableView = document.querySelector('.table-view');

function loadEmployees(employees) {
    let employeeList = document.querySelector('.employees-cards');

    for (let employee of employees) {
        let templateCard = document.querySelector('#temp-card');
        let content = templateCard.content.cloneNode(true);

        let avatar = content.querySelector('img');
        avatar.src = employee.avatar;

        let name = content.querySelector('.name');
        name.innerHTML = employee.name;
        name.setAttribute('user-id', employee.id)

        let nativeName = content.querySelector('.nativeName');
        nativeName.innerHTML = employee.nativeName;

        let department = content.querySelector('.department');
        department.innerHTML = "<i class=\"fa fa-briefcase\"></i>" + employee.department;

        let room = content.querySelector('.room');
        room.innerHTML = "<i class=\"far fa-address-book\"></i>" + employee.room;

        employeeList.append(content);
    }

    let employeesNumber = document.querySelector('.employees-number');
    employeesNumber.innerText = employees.length;

    if (tableView.classList.contains('active')) {
        makeTableView();
    } else {
        makeGridView();
    }
    handleCardClick();
}

let submit = document.querySelector('.search-form');
submit.addEventListener('submit', function (e) {
    e.preventDefault();
    searchEmployees();
});

function searchEmployees() {
    let searchValue = document.querySelector('.search-input').value;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:3000/api/users');
    xhr.send();

    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            let employees = JSON.parse(xhr.response);
            renderCards(employees);
        }
    };

    function renderCards(employees) {
        let result = employees.filter(employee => employee.name.toUpperCase().includes(searchValue.toUpperCase())
            || employee.nativeName.toUpperCase().includes(searchValue.toUpperCase()));

        let cards = document.querySelectorAll('.employee-single');
        for (let card of cards) {
            card.remove();
        }
        loadEmployees(result);

        if (tableView.classList.contains('active')) {
            makeTableView();
        } else {
            makeGridView();
        }
    }
}

let logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', signInModal);

let signUpButton = document.querySelector('.sign-up-button');
signUpButton.addEventListener('click', signUpModal);
let signInButton = document.querySelector('.sign-in-button');
signInButton.addEventListener('click', signInModal)

function signInModal() {
    let signIn = document.querySelector('.sign-in-block');
    signIn.style.display = 'block';
    let signUp = document.querySelector('.sign-up-block');
    signUp.style.display = 'none';

    let findDataButton = document.querySelector('.sign-in-send');
    findDataButton.addEventListener('click', function (e) {
        e.preventDefault();
        authorization();
    });
}

function signUpModal() {
    let signUp = document.querySelector('.sign-up-block');
    signUp.style.display = 'block';
    let signIn = document.querySelector('.sign-in-block');
    signIn.style.display = 'none';
    let sendNewDataButton = document.querySelector('.sign-up-send');
    sendNewDataButton.addEventListener('click', addNewUser);
}
