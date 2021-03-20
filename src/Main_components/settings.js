export function loadSettings(employees) {
    let employeeSettings = document.querySelector('.employees-settings');

    for (let employee of employees) {
        let templateSettings = document.querySelector('#settings-template');
        let content = templateSettings.content.cloneNode(true);

        let avatar = content.querySelector('img');
        avatar.src = employee.avatar;

        let name = content.querySelector('.name');
        name.innerHTML = employee.name;
        name.setAttribute('user-id', employee.id)

        let nativeName = content.querySelector('.nativeName');
        nativeName.innerHTML = employee.nativeName;

        for (let role of employee.roles) {
            switch(role.type) {
                case 'addressbook':
                    let addressButtonsBlock = content.querySelector('.address-role');
                    let addressButtons = addressButtonsBlock.querySelectorAll('button');
                    switch (role.name) {
                        case 'employee':
                            addressButtons[0].classList.add('active');
                            addressButtons[1].classList.remove('active');
                            break;
                        case 'hr':
                            addressButtons[1].classList.add('active');
                            addressButtons[0].classList.remove('active');
                    }
                case 'vacation':
                    let vacationButtonsBlock = content.querySelector('.vacation-role');
                    let vacationButtons = vacationButtonsBlock.querySelectorAll('button');
                    switch (role.name) {
                        case 'employee' :
                            vacationButtons[0].classList.add('active');
                            vacationButtons[1].classList.remove('active');
                            vacationButtons[2].classList.remove('active');
                            break;
                        case 'po':
                            vacationButtons[0].classList.remove('active');
                            vacationButtons[1].classList.add('active');
                            vacationButtons[2].classList.remove('active');
                            break;
                        case 'dd':
                            vacationButtons[0].classList.remove('active');
                            vacationButtons[1].classList.remove('active');
                            vacationButtons[2].classList.add('active');
                    }
                case 'admin':
                    let adminButtonsBlock = content.querySelector('.admin-role');
                    let adminButton = adminButtonsBlock.querySelector('button');
                    switch (role.status) {
                        case 'true':
                            adminButton.classList.add('active');
                            let addressButtonsBlock = content.querySelector('.address-role');
                            let addressButtons = addressButtonsBlock.querySelectorAll('button');
                            for (let button of addressButtons) {
                                button.classList.remove('active');
                                button.classList.add('disabled');
                            }
                            break;
                        case 'false':
                            adminButton.classList.remove('active');
                    }
            }
        }
        employeeSettings.append(content);
    }
}