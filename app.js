class Car {
    constructor(vin, brand, model, price, year, mileage, engineCapacity, hp, image) {
        this.vin = vin;
        this.brand = brand;
        this.model = model;
        this.price = price;
        this.year = year;
        this.mileage = mileage;
        this.engineCapacity = engineCapacity;
        this.hp = hp;
        this.image = image;
    }
}

class UI {
    addCarToList(Car) {
        const carList = document.getElementById('car-list');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>${Car.vin}</td>
        <td>${Car.brand}</td>
        <td>${Car.model}</td>
        <td>${Car.price}</td>
        <td>${Car.year}</td>
        <td>${Car.mileage}</td>
        <td>${Car.engineCapacity}</td>
        <td>${Car.hp}</td>
        <td>Show photo</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        carList.append(newRow);
    }

    clearFields() {
        document.getElementById('vin-number').value = '';
        document.getElementById('brand').value = '';
        document.getElementById('model').value = '';
        document.getElementById('price').value = '';
        document.getElementById('year').value = '';
        document.getElementById('mileage').value = '';
        document.getElementById('engine-capacity').value = '';
        document.getElementById('hp').value = '';
        document.getElementById('image').value = '';
    }
}

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
    img.onload = () => {
        URL.revokeObjectURL(this.src);
    }
    
    //Instantiete new car object
    const car = new Car(vin, brand, model, price, year, mileage, engineCapacity, hp, img);
    
    //Instantiete UI
    const ui = new UI();

    //Add created car to list
    ui.addCarToList(car);

    //Clear fields after submittion
    ui.clearFields();

    e.preventDefault();
});