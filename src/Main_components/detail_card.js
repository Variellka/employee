export function handleCardClick() {
    let employeeCards = document.querySelectorAll('.employee-single')
    for (let employeeCard of employeeCards) {
        employeeCard.addEventListener('click', function (e) {
            e.preventDefault();
            let employeeName = employeeCard.querySelector('.name');
            let employeeId = employeeName.getAttribute('user-id');
            getDetailInfo(employeeId);
        });
    }
    function getDetailInfo(id) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:3000/api/users/${id}`);
        xhr.send();

        xhr.onload = function() {
            if (xhr.status != 200) {
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                let employee = JSON.parse(xhr.response);
                openDetailCard(employee);
            }
        }
    }
}

export function openDetailCard(employee) {
    let detailInformation = document.querySelector('.card-details-content');
    let templateDetailCard = document.querySelector('#detail-card');

    let content = templateDetailCard.content.cloneNode(true);

    let employeesList = document.querySelector('.employees-block');
    employeesList.style.display = 'none';

    let avatar = content.querySelector('.avatar');
    avatar.src = employee.avatar;

    let name = content.querySelector('.name');
    name.innerHTML = employee.name;

    let nativeName = content.querySelector('.nativeName');
    nativeName.innerHTML = employee.nativeName;

    let gender = content.querySelector('.gender');
    if (employee.gender === 1) {
        gender.innerHTML = 'Mr';
    } else gender.innerHTML = 'Mrs';

    let department = content.querySelector('.department');
    department.innerHTML = employee.department;

    let room = content.querySelector('.room');
    room.innerHTML = employee.room;

    let contacts = content.querySelectorAll('.contacts');
    contacts[0].innerHTML = employee.internalPhone;
    contacts[1].innerHTML = employee.mobilePhone;
    contacts[2].innerHTML = employee.email;
    contacts[3].innerHTML = employee.skype;
    contacts[4].innerHTML = employee.cnumber;

    detailInformation.append(content);

    let backButton = document.querySelector('.back-to-list-btn');
    backButton.addEventListener('click', function () {
        closeModal(employeesList);
    });
}

function closeModal(employeesList) {
    let detailCard = document.querySelector('.card-information');
    detailCard.remove()
    employeesList.style.display = 'block';
}