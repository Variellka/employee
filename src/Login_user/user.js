export class User {
    name;
    password;
    _roles = {
        type: 'admin',
        attrs: ['read','write','view'],
    }

    constructor(name, password) {
        this._name = name;
        this._password = password;
    }

    get name() {
        return this._name;
    }

    get password() {
        return this._password;
    }


    get roles() {
        return this._roles;
    }
}

export class Viewer extends User {
    constructor() {
        super();
        this._roles = 'viewer';
    }
}

export class Admin extends User {
    constructor() {
        super();
        this._roles = 'admin';
    }
}