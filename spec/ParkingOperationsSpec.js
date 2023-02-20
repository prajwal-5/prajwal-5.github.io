import ParkingOperations from '../controllers/Business/ParkingOperations.js';
import localStorage from 'jasmine-local-storage';
import Slot from '../controllers/Business/Slot.js';

describe('Checking parking lot', function(){
    beforeEach(function(){
        this.parkOps = new ParkingOperations();
    });

    //park()
    it('For parking a car', function(){
        expect(this.parkOps.park('AA00000000')).toBe('parked');
    });

    it('for Parking slot full', function(){
        this.parkOps.clearLocalStorage();
        for(let i=0; i<10; i++){
            this.parkOps.park('SS0000000'+i);
        }
        expect(this.parkOps.park('SS10101010')).toBe('full');
    });

    it('for already parked car', function(){
        this.parkOps.park('SS10101010');
        expect(this.parkOps.park('SS10101010')).toBe('duplicate');
    });

    //isPresent()
    it('presence of a car', function(){
        expect(this.parkOps.isPresent('SS10101011')).toBe(false);
    });

    it('presence of a car', function(){
        this.parkOps.clearLocalStorage();
        this.parkOps.park('SS10101010');
        expect(this.parkOps.isPresent('SS10101010')).toEqual(new Slot('SS10101010', 1));
    });

    //unPark()
    it('for unparking a car', function(){
        this.parkOps.park('SS10101010');
        let car = this.parkOps.isPresent('SS10101010');
        expect(this.parkOps.unPark(car)).toBe(true);
    });

    it('for unparking an already unparked car', function(){
        let car = this.parkOps.isPresent('SS10101010');
        expect(this.parkOps.unPark(car)).toBe(false);
    });


    //getParkedCars()
    it('for all parked cars', function(){
        this.parkOps.clearLocalStorage();
        expect(this.parkOps.getParkedCars()).toEqual([]);
    });
})