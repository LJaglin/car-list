class Car {
    constructor(vin, brand, model, price, year, mileage, engineCapacity, hp, image) {
        this.vin = vin;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.year = year;
        this.mileage = mileage;
        this. engineCapacity = engineCapacity;
        this.hp = hp;
        this.image = image;
    }
}

class UI {}

//Event Listeners for add car
document.getElementById('car-form').addEventListener('submit', (e) => {
    //Get values from the form
    const vin = document.getElementById('vin-number').value;
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const mileage = document.getElementById('mileage').value;
    const engineCapacity = document.getElementById('engine-capacity').value;
    const hp = document.getElementById('hp').value;
    const img = URL.createObjectURL(e.target.image.files[0]);
    
    //Instantiete new car object
    const car = new Car(vin, brand, model, price, year, mileage, engineCapacity, hp, img);
    console.log(car);

    e.preventDefault();
});