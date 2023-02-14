import Support from "./support.js";
import Message from "./messages.js";

class Car{
    constructor(reg_no){
        this.reg_no = reg_no;
    }

    is_valid(){
        let support = new Support();
        if(this.reg_no && this.reg_no.length === 10 && support.isChar(this.reg_no[0]) && support.isChar(this.reg_no[1])){
            let check = true;
            for(let i=2; i<10; i++){
                if(!support.isNum(this.reg_no[i])) {
                    check = false;
                }
            }
            return check;
        } else {
            return false;
        }
    }

    reg_no_validation(){
        if(!this.is_valid()){
            let msg = new Message();
            msg.display_message('Inappropriate Registration Number', 'danger');
            return false;
        } else {
            return true;
        }
    }
}

export default Car;