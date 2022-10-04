const User = class {
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.rol = "client"
    }

    setRol(rol) {
        this.rol = rol;
    }
}

module.exports = User;