import Car from "./Car.js";
import Slot from "./Slot.js";

class ParkingOperations{
    constructor(){
        this.slots = JSON.parse(localStorage.getItem("slots") || "[]");
        this.slotHash = {};
        for(let i=0; i<this.slots.length; i++){
            this.slotHash[this.slots[i].spotNo] = true;
        }
    }

    park(regNo){
        let totalSlots = 10;
        let car = new Car(regNo);
        if(this.slots.length >= totalSlots){
            return 'full';
        }else if(this.slots.length < totalSlots && car.isValid()){
            let emptySlot = null;
            for(let i=1; i<=totalSlots; i++){
                if(!this.slotHash[i]) {
                    emptySlot = i;
                    break;
                }
            }
            if(this.slots.find(({carNo}) => {return carNo === car.regNo; })){
                return "duplicate";
            } else{
                this.slots.push(new Slot(car.regNo, emptySlot));
                localStorage.setItem("slots", JSON.stringify(this.slots));
                return "parked";
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