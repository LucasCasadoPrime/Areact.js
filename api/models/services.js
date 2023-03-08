class Services {
    constructor(name, service, func) {
        this.name = name;
        this.service = service;
        this.func = func;
    }

    getName() {
        return this.name;
    }

    getService() {
        return this.service;
    }

    getFunc() {
        return this.func;
    }

    setName(name) {
        this.name = name;
    }

    SetFunc(func) {
        this.func = func;
    }
}

module.exports = Services;