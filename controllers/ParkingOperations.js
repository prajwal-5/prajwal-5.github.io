import Car from "./Car.js";
import slot from "./Slot.js";

class ParkingOperations{
    constructor(){
        this.slots = JSON.parse(localStorage.getItem("slots") || "[]");
        this.slotHash = {};
        for(let i=0; i<this.slots.length; i++){
            this.slotHash[this.slots[i].spotNo] = true;
        }
    }

    park(regNo){
        let car = new Car(regNo);
        if(this.slots.length > 9){
            return -1;
        }else if(this.slots.length < 10 && car.isValid()){
            let emptySlot = null;
            for(let i=1; i<11; i++){
                if(!this.slotHash[i]) {
                    emptySlot = i;
                    break;
                }
            }
            if(this.slots.find(({carNo}) => {return carNo === car.regNo; })){
                return 0;
            } else{
                this.slots.push(new slot(car.regNo, emptySlot));
                localStorage.setItem("slots", JSON.stringify(this.slots));
                return 1;
            }
        }
    }

    isPresent(regNo){
        let car = this.slots.find(({carNo}) => { return carNo == regNo; });
        if(car) { return car; }
        else { return false; }
    }

    unPark(car){
        if(car) {
            this.slots = this.slots.filter(({carNo}) => { return carNo !== car.carNo; });
            localStorage.setItem("slots", JSON.stringify(this.slots));
            return true;
        } else {
            return false;
        }
    }

    getParkedCars(){
        return this.slots;
    }

    clearLocalStorage(){
        localStorage.clear();
    }
}

export default ParkingOperations;