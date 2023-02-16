import Support from "./support.js";

class Car{
    constructor(regNo){
        this.regNo = regNo;
    }

    isValid(){
        let support = new Support();
        if(this.regNo && this.regNo.length === 10 && support.isChar(this.regNo[0]) && support.isChar(this.regNo[1])){
            let check = true;
            for(let i=2; i<10; i++){
                if(!support.isNum(this.regNo[i])) {
                    check = false;
                }
            }
            return check;
        } else {
            return false;
        }
    }
}

export default Car;