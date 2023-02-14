import Display_lot from "./display_lot.js";
import Parking_lot from "./parking_lot.js";

let start = new Display_lot();
let parking_lot = new Parking_lot();
start.parking_lot_status();   
start.recent_cars();
document.getElementById('park_btn').onclick = parking_lot.park_car;
document.getElementById('find_btn').onclick = parking_lot.find_car;