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
        <td><a href="#" class="image">Show photo</a></td>
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

    showAlert(msg, className) {
        const divWithAlert = document.createElement('div');
        const form = document.querySelector('#car-form');
        const parentNode = form.parentNode;

        divWithAlert.className = className;
        divWithAlert.innerText = msg;
        
        parentNode.insertBefore(divWithAlert, form);

        setTimeout(() => {
            divWithAlert.remove();
        }, 3000);
    }

    deleteCar(target) {
        if (target.className === 'delete' && confirm('Do you want delete this car?')) {
            target.parentNode.parentNode.remove();
            this.showAlert('Car removed', 'succes');
        }
    }
}

//Local Storage Class
class Store {
    static getCars() {
        let cars;
        if (localStorage.getItem('cars') === null) {
            cars = [];
        } else {
            cars = JSON.parse(localStorage.getItem('cars'));
        }
        return cars;
    }

    static displayCars() {
        const cars = Store.getCars();
        cars.forEach((car) => {
            const ui = new UI();
            ui.addCarToList(car);
        });
    }

    static addCar(car) {
        const cars = Store.getCars()       
        cars.push(car);
        localStorage.setItem('cars', JSON.stringify(cars));
    }

    static removeCar(vin) {
        const cars = Store.getCars();
        cars.forEach((car, index) => {
            if (car.vin === vin) {
                cars.splice(index, 1);
            }
        });
        localStorage.setItem('cars', JSON.stringify(cars));
    }
}

//Event Listener for DOM loaded
document.addEventListener('DOMContentLoaded', Store.displayCars());

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

    //Validate
    if (vin === '' || brand === '' || model === '' || price === '' || year === '' ||
        mileage === '' || engineCapacity === '' || hp === '' || img === '') {
        //Error alert
        ui.showAlert('Please fill in all fields', 'error');        
    } else {
        //Add created car to list
        ui.addCarToList(car);

        //Add created car to Local Storage
        Store.addCar(car);

        //Succes message
        ui.showAlert('Car added', 'succes');

        //Clear fields after submittion
        ui.clearFields();

    }

    e.preventDefault();
});

//Event listener for delete car
document.getElementById('car-list').addEventListener('click', (e) => {
    const ui = new UI();
    ui.deleteCar(e.target);
    //Remove car from Local Storage
    Store.removeCar(e.target.parentNode.parentNode.querySelector('td:first-child').innerText);
});