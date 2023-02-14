import Car from "./car.js";
import Display_lot from "./display_lot.js";
import Message from "./messages.js";
import slot from "./slot.js";

class Parking_lot{
    park_car(){
        let car = new Car(document.getElementById("park_reg_no").value);
        let slots = JSON.parse(localStorage.getItem("slots") || "[]");
        if(slots.length > 9){
            let msg = new Message();
            msg.display_message('Parking lot full', 'danger');
        }else if(slots.length < 10 && car.reg_no_validation()){
            let empty_slot = null;
            let slot_hash = {};
            for(let i=0; i<slots.length; i++){
                slot_hash[slots[i].spot_no] = true;
            }
            for(let i=1; i<11; i++){
                if(!slot_hash[i]) {
                    empty_slot = i;
                    break;
                }
            }
            if(slots.find(({car_no}) => {return car_no === car.reg_no; })){
                let msg = new Message();
                msg.display_message('This car is already parked!', 'warning');
            } else{
                slots.push(new slot(car.reg_no, empty_slot));
                localStorage.setItem("slots", JSON.stringify(slots));
                let start = new Display_lot();
                start.parking_lot_status();   
                start.recent_cars();    
                let msg = new Message();
                msg.display_message('Car Parked!!', 'success');
                document.getElementById("park_reg_no").value = "";
            }
        }
    }
    
    find_car(){
        let slots = JSON.parse(localStorage.getItem("slots") || "[]");
        let search_car = document.getElementById("find_car").value;
        let car = slots.find(({car_no}) => { return car_no == search_car; });
        let display_html = '';
        if(car){
            display_html = `<span class="input-group-text" id="inputGroup-sizing-lg">Registration No.</span>
            <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value = "${car.car_no}">
            <span class="input-group-text" id="inputGroup-sizing-lg">Parking slot No.</span>
            <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value = "${car.spot_no}">
            <button type="submit" class="btn btn-outline-danger" id="unpark_car_btn">Unpark</button>`;
        }else{
            display_html = `<div class="alert alert-danger" role="alert">
            Cannot find the car! Please enter correct details.
            </div>`
        }
        document.getElementById("find_car_result").innerHTML = display_html;
        if(car) {
            document.getElementById('unpark_car_btn').onclick = function() {
                let search_car = document.getElementById("find_car").value;
                let slots = JSON.parse(localStorage.getItem("slots") || "[]");
                slots = slots.filter(({car_no}) => { return car_no !== search_car; });
                localStorage.setItem("slots", JSON.stringify(slots));
                let start = new Display_lot();
                start.parking_lot_status();   
                start.recent_cars();
                let display_html = `<div class="alert alert-success" role="alert">
                Car Unparked Successfully!!
                </div>`
                document.getElementById("find_car_result").innerHTML = display_html;
                document.getElementById("find_car").value = "";
            }
        }
    } 
}

export default Parking_lot;