import Crud from "./crud.js";
import Message from "./messages.js";

class UiUx{
    recentCars(){
        let parkedCars = new Crud();
        let slots = parkedCars.getParkedCars();
        let displayHtml = '';
        for(let i = slots.length-1; i>=0 && i>slots.length-4; i--){
            displayHtml += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${slots[i].carNo}</div>
            </div>
            <span class="badge bg-primary rounded-pill">${slots[i].spotNo}</span>
            </li>`;
        }
        document.getElementById("recentCarsList").innerHTML = displayHtml;
        return;
    }

    parkingLotStatus(){
        let parkedCars = new Crud();
        let slots = parkedCars.getParkedCars();
        let displayHtml = `<thead>
        <tr>
        <th scope="col" class="text-center">Car No.</th>
        <th scope="col" class="text-center">Slot No.</th>
        </tr>
        </thead>
        <tbody>`;
        
        for(let i=0; i<slots.length; i++){
            displayHtml += `<tr>
            <td class="text-center px-5">${slots[i].carNo}</td>
            <td class="text-center px-5">${slots[i].spotNo}</td>
            </tr>`;
        }
        
        displayHtml += `</tbody>`;
        document.getElementById("parkingStatus").innerHTML = displayHtml;
    }

    parkCar(){
        let parkRegNo = document.getElementById("parkRegNo").value;
        let park = new Crud();
        let msg = new Message();
        switch (park.park(parkRegNo)){
            case -1:
                msg.displayMessage('Parking lot full', 'danger');
                break;
            case 0:
                msg.displayMessage('This car is already parked!!', 'warning');
                break;
            case 1:
                let start = new UiUx();
                start.recentCars();    
                start.parkingLotStatus();
                msg.displayMessage('Car Parked!!', 'success');
                document.getElementById("parkRegNo").value = "";
                document.getElementById("parkList").click();
                document.getElementById("parkList").scrollIntoView({behavior: 'smooth', block: 'start'});
                break;
            default:
                msg.displayMessage('Inappropriate Registration Number! <br> Make sure it has <br> - First two characters as Alphabets <br> - last 8 characters as numbers <br> - Length of 10 characters', 'danger');
                break;
        }
    }

    findCar(){
        let regNo = document.getElementById("findCar").value;
        let find = new Crud();
        let displayHtml = '';
        let car = find.isPresent(regNo);
        if(car){
            displayHtml = `<span class="input-group-text" id="inputGroup-sizing-lg">Registration No.</span>
            <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value = "${car.carNo}">
            <span class="input-group-text" id="inputGroup-sizing-lg">Parking slot No.</span>
            <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value = "${car.spotNo}">
            <button type="submit" class="btn btn-outline-danger" id="unparkCarBtn">Unpark</button>`;
        }else{
            displayHtml = `<div class="alert alert-danger" role="alert">
            Cannot find the car! Please enter correct details.
            </div>`
        }
        document.getElementById("findCarResult").innerHTML = displayHtml;
        if(car) document.getElementById('unparkCarBtn').onclick = () => {
            if(find.unPark(car)){
                let start = new UiUx();
                start.parkingLotStatus();   
                start.recentCars();
                let displayHtml = `<div class="alert alert-success" role="alert">
                Car Unparked Successfully!!
                </div>`
                document.getElementById("findCarResult").innerHTML = displayHtml;
                document.getElementById("findCar").value = "";
            } else {
                let displayHtml = `<div class="alert alert-success" role="alert">
                Cannot unpark car!!
                </div>`
                document.getElementById("findCarResult").innerHTML = displayHtml;
            }
        };
    }
}

let uiux = new UiUx();
document.getElementById('parkBtn').onclick = uiux.parkCar;
document.getElementById('findBtn').onclick = uiux.findCar;
uiux.recentCars();
uiux.parkingLotStatus();