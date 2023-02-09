function isChar(char){
    return (/[a-zA-Z]/).test(char);
}

function isNum(num){
    return (/[0-9]/).test(num);
}

function display_message(message, type){
    display_html = `
    <div class="alert alert-${type} alert-dismissible fade show m-0" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    document.getElementById("message").innerHTML = display_html;
}

class Car{
    constructor(reg_no){
        this.reg_no = reg_no;
        if(!this.reg_no_validation()){
            this.reg_no = undefined;
        }
    }

    reg_no_validation(){
        if(!this.reg_no || this.reg_no.length !== 10 || !isChar(this.reg_no[0]) || !isChar(this.reg_no[1])){
            display_message('Inappropriate Registration Number', 'danger');
            return false;
        }
        for(let i=2; i<10; i++){
            if(!isNum(this.reg_no[i])) {
                display_message('Inappropriate Registration Number', 'danger');
                return false;
            }
        }
        return true;
    }
}

class slot{
    constructor(car_no, spot_no){
        this.car_no = car_no;
        this.spot_no = spot_no;
    }
}

function park_car(){
    let car = new Car(document.getElementById("park_reg_no").value);
    let slots = JSON.parse(localStorage.getItem("slots") || "[]");
    if(slots.length > 9){
        display_message('Parking lot full', 'danger');
    }else if(slots.length < 10 && car.reg_no){
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
            display_message('This car is already parked!', 'warning');
        } else{
            slots.push(new slot(car.reg_no, empty_slot));
            localStorage.setItem("slots", JSON.stringify(slots));
            parking_lot_status();
            recent_cars();
            display_message('Car Parked!!', 'success');
            document.getElementById("park_reg_no").value = "";
        }
    }
}

function find_car(){
    let slots = JSON.parse(localStorage.getItem("slots") || "[]");
    let search_car = document.getElementById("find_car").value;
    let car = slots.find(({car_no}) => { return car_no == search_car; });
    if(car){
        display_html = `<span class="input-group-text" id="inputGroup-sizing-lg">Registration No.</span>
        <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value = "${car.car_no}">
        <span class="input-group-text" id="inputGroup-sizing-lg">Parking slot No.</span>
        <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value = "${car.spot_no}">
        <button type="submit" class="btn btn-outline-danger" id="unpark_car_btn" onClick="unpark_car()" }">Unpark</button>`;
    }else{
        display_html = `<div class="alert alert-danger" role="alert">
        Cannot find the car! Please enter correct details.
        </div>`
    }
    document.getElementById("find_car_result").innerHTML = display_html;
}

function unpark_car(){
    search_car = document.getElementById("find_car").value;
    let slots = JSON.parse(localStorage.getItem("slots") || "[]");
    slots = slots.filter(({car_no}) => { return car_no !== search_car; });
    localStorage.setItem("slots", JSON.stringify(slots));
    parking_lot_status();
    recent_cars();
    display_html = `<div class="alert alert-success" role="alert">
    Car Unparked Successfully!!
    </div>`
    document.getElementById("find_car_result").innerHTML = display_html;
    document.getElementById("find_car").value = "";
}

function recent_cars(){
    let slots = JSON.parse(localStorage.getItem("slots") || "[]");
    display_html = '';
    for(let i = slots.length-1; i>=0 && i>slots.length-4; i--){
        display_html += `<li class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <div class="fw-bold">${slots[i].car_no}</div>
        </div>
        <span class="badge bg-primary rounded-pill">${slots[i].spot_no}</span>
      </li>`;
    }
    document.getElementById("recent_cars_list").innerHTML = display_html;
}

recent_cars();

function parking_lot_status(){
    let slots = JSON.parse(localStorage.getItem("slots") || "[]");
    display_html = `<thead>
    <tr>
      <th scope="col" class="text-center">Car No.</th>
      <th scope="col" class="text-center">Slot No.</th>
    </tr>
    </thead>
    <tbody>`;

    for(let i=0; i<slots.length; i++){
        display_html += `<tr>
        <td class="text-center px-5">${slots[i].car_no}</td>
        <td class="text-center px-5">${slots[i].spot_no}</td>
      </tr>`;
    }

    display_html += `</tbody>`;
    document.getElementById("parking_status").innerHTML = display_html;
}

parking_lot_status();