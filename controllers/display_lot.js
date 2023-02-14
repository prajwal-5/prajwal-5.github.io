class Display_lot{
    recent_cars(){
        let slots = JSON.parse(localStorage.getItem("slots") || "[]");
        let display_html = '';
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
        
    parking_lot_status(){
        let slots = JSON.parse(localStorage.getItem("slots") || "[]");
        let display_html = `<thead>
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
    
}

export default Display_lot;