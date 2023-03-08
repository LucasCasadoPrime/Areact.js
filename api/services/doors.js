const fetch = require('cross-fetch');


class Door {
    constructor() {
        this.url = "https://epilogue.arykow.com/api/doors_open?token="
    }

    open(token, door) {
        return fetch(`${this.url}${token}&door_name=${door}`)
            .then(res => res.json())
            .then(json => {
                return json;
            })
            .catch(err => {
                return err;
            });
    }

}

module.exports = Door;