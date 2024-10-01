import { makeAutoObservable } from 'mobx';

class ModelsEmailNumber {
    email: string;
    number: string;

    constructor(email: string = "", number: string = "") {
        makeAutoObservable(this);

        this.email = email.trim();
        this.number = number.trim();
    }

    get numberWithHyphen() {
        let result = "";
        let i;
        for(i = 0; i < this.number.length - 2; i += 2) {
            result += `${this.number.substring(i, i + 2)}-`
        }
        result += this.number.substring(i, this.number.length);
        return result;
    }

    setEmail(email: string = "") {
        this.email = email.trim();
    }

    setNumber(number: string = "") {
        this.number = number.trim();
    }
}

export default ModelsEmailNumber;