import Car from '../controllers/Car.js';

describe('Checking car module', function(){
    it('Check for Car registration number larger than 10', function(){
        let car = new Car('AA123456789');
        expect(car.isValid()).toBeFalsy();
    });

    it('Check for Car registration number smaller than 10', function(){
        let car = new Car('AA123456');
        expect(car.isValid()).toBeFalsy();
    });

    it('Check for Improper Car registration number', function(){
        let car = new Car('AA123A4678');
        expect(car.isValid()).toBeFalsy();
    });

    it('Check for correct format of Car registration number', function(){
        let car = new Car('AA12345678');
        expect(car.isValid()).toBeTruthy();
    });
})