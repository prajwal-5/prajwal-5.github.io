import Car from "./car.js";
import slot from "./slot.js";

class Crud{
    park(regNo){
        let car = new Car(regNo);
        let slots = JSON.parse(localStorage.getItem("slots") || "[]");
        if(slots.length > 9){
            return -1;
        }else if(slots.length < 10 && car.isValid()){
            let emptySlot = null;
            let slotHash = {};
            for(let i=0; i<slots.length; i++){
                slotHash[slots[i].spotNo] = true;
            }
            for(let i=1; i<11; i++){
                if(!slotHash[i]) {
                    emptySlot = i;
                    break;
                }
            }
            if(slots.find(({carNo}) => {return carNo === car.regNo; })){
                return 0;
            } else{
                slots.push(new slot(car.regNo, emptySlot));
                localStorage.setItem("slots", JSON.stringify(slots));
                return 1;
            }
        }
    }

    isPresent(regNo){
        let slots = JSON.parse(localStorage.getItem("slots") || "[]");
        let car = slots.find(({carNo}) => { return carNo == regNo; });
        if(car) { return car; }
        else { return false; }
    }

    unPark(car){
        if(car) {
            let slots = JSON.parse(localStorage.getItem("slots") || "[]");
            slots = slots.filter(({carNo}) => { return carNo !== car.carNo; });
            localStorage.setItem("slots", JSON.stringify(slots));
            return true;
        } else {
            return false;
        }
    }

    getParkedCars(){
        return JSON.parse(localStorage.getItem("slots") || "[]");
    }
}

export default Crud;