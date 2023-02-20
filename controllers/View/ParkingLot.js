import ParkingOperations from "../Business/ParkingOperations.js";
import Message from "./Messages.js";

class ParkingLot{
    constructor() {
        this.parkOps = new ParkingOperations();
        this.slots = this.parkOps.getParkedCars();
    }

    renderRecentCars(){
        let displayHtml = '';
        for(let i = this.slots.length-1; i>=0 && i>this.slots.length-4; i--){
            displayHtml += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${this.slots[i].carNo}</div>
            </div>
            <span class="badge bg-primary rounded-pill">${this.slots[i].spotNo}</span>
            </li>`;
        }
        document.getElementById("recentCarsList").innerHTML = displayHtml;
        return;
    }

    renderParkedCars(){
        let displayHtml = `<thead>
        <tr>
        <th scope="col" class="text-center">Car No.</th>
        <th scope="col" class="text-center">Slot No.</th>
        </tr>
        </thead>
        <tbody>`;
        
        for(let i=0; i<this.slots.length; i++){this.findCarw
            displayHtml += `<tr>
            <td class="text-center px-5">${this.slots[i].carNo}</td>
            <td class="text-center px-5">${this.slots[i].spotNo}</td>
            </tr>`;
        }
        
        displayHtml += `</tbody>`;
        document.getElementById("parkingStatus").innerHTML = displayHtml;
    }

    parkCar(){
        let parkOps = new ParkingOperations();
        document.getElementById("findCar").value = "";
        document.getElementById("findCarResult").innerHTML = '';
        let parkRegNo = document.getElementById("parkRegNo").value;
        let msg = new Message();
        let parked = parkOps.park(parkRegNo);
        if(parked === 'full'){
            msg.displayMessage('Parking lot full', 'danger');
        } else if(parked === 'duplicate') {
            msg.displayMessage('This car is already parked!!', 'warning');
        } else if (parked === 'parked') {
            let start = new ParkingLot();
            start.renderRecentCars();    
            start.renderParkedCars();
            msg.displayMessage('Car Parked!!', 'success');
            document.getElementById("parkRegNo").value = "";
        } else {
            msg.displayMessage('Inappropriate Registration Number! <br> Make sure it has <br> - First two characters as Alphabets <br> - last 8 characters as numbers <br> - Length of 10 characters', 'danger');
        }
    }

    findCar(){
        document.getElementById("parkRegNo").value = "";
        let regNo = document.getElementById("findCar").value;
        let displayHtml = '';
        let parkOps = new ParkingOperations();
        let car = parkOps.isPresent(regNo);
        if(car){
            displayHtml = `
            <div class = "input-group">
                <span class="input-group-text" id="inputGroup-sizing-lg">Car No.</span>
                <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value = "${car.carNo}">
                <span class="input-group-text" id="inputGroup-sizing-lg">Slot No.</span>
                <input type="text" class="form-control" disabled aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value = "${car.spotNo}">
                <button type="submit" class="btn btn-outline-danger" id="unparkCarBtn">Unpark</button>
            </div>
            `;
        }else{
            displayHtml = `<div class="alert alert-danger" role="alert">
            Cannot find the car! Please enter correct details.
            </div>`
        }
        document.getElementById("findCarResult").innerHTML = displayHtml;
        if(car) document.getElementById('unparkCarBtn').onclick = () => {
            if(parkOps.unPark(car)){
                let start = new ParkingLot();
                start.renderParkedCars();   
                start.renderRecentCars();
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

export default ParkingLot;