import ParkingLot from "../View/ParkingLot.js";

let parking = new ParkingLot();
document.getElementById('parkBtn').onclick = parking.parkCar;
document.getElementById('findBtn').onclick = parking.findCar;
parking.renderRecentCars();
parking.renderParkedCars();