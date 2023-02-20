import ParkingOperations from '../controllers/ParkingOperations.js';
import localStorage from 'jasmine-local-storage';

describe('Checking parking lot', function(){
    it('Check for parking a car', function(){
        let parkOps = new ParkingOperations();
        expect(parkOps.park('AA00000000')).toBe(1);
    });

    it('Check for Parking slot full', function(){
        let parkOps = new ParkingOperations();
        parkOps.clearLocalStorage();
        for(let i=0; i<10; i++){
            parkOps.park('SS0000000'+i);
        }
        expect(parkOps.park('SS10101010')).toBe(-1);
    });

    it('Check for already parked car', function(){
        let parkOps = new ParkingOperations();
        parkOps.park('SS10101010');
        expect(parkOps.park('SS10101010')).toBe(0);
    });
})