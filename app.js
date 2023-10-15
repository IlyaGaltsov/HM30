class HouseForm {
    constructor() {
      this.address = '';
      this.numFloors = 0;
      this.numApartments = 0;
    }

    validate() {
      return this.address && this.numFloors > 0 && this.numApartments > 0;
    }
  }

  class ApartmentForm {
    constructor() {
      this.apartments = [];
    }

    createApartments(numApartments) {
      for (let i = 0; i < numApartments; i++) {
        this.apartments.push({
          number: '',
          numRooms: 0,
          numPeople: 0,
          people: []
        });
      }
    }
  }

  class PersonForm {
    createPerson() {
      return {
        name: '',
        surname: ''
      };
    }
  }

  const houseForm = new HouseForm();
  const apartmentForm = new ApartmentForm();
  const personForm = new PersonForm();
  let currentApartmentIndex = 0;
  let currentPersonIndex = 0;

  document.getElementById('nextHouse').addEventListener('click', handleNextHouse);

  function handleNextHouse() {
    houseForm.address = document.getElementById('address').value;
    houseForm.numFloors = parseInt(document.getElementById('numFloors').value);
    houseForm.numApartments = parseInt(document.getElementById('numApartments').value);

    if (houseForm.validate()) {
      document.getElementById('houseForm').style.display = 'none';
      document.getElementById('apartmentForm').style.display = 'block';

      apartmentForm.createApartments(houseForm.numApartments);
      createApartmentForm();
    } else {
      alert('Будь ласка, заповніть всі поля для продовження.');
    }
  }

  function createApartmentForm() {
    const apartmentFormElement = document.getElementById('apartmentForm');
    apartmentFormElement.innerHTML = '';
    const apartment = apartmentForm.apartments[currentApartmentIndex];

    apartmentFormElement.innerHTML += `
      <h3>Апартамент ${currentApartmentIndex + 1}</h3>
      <input type="text" id="apartmentNumber" placeholder="Номер апартаменту"><br>
      <input type="number" id="apartmentRooms" placeholder="Кількість кімнат"><br>
      <input type="number" id="apartmentPeople" placeholder="Кількість людей"><br>
      <button id="nextApartment">Далі</button>
    `;

    document.getElementById('nextApartment').addEventListener('click', () => {
      apartment.number = document.getElementById('apartmentNumber').value;
      apartment.numRooms = parseInt(document.getElementById('apartmentRooms').value);
      apartment.numPeople = parseInt(document.getElementById('apartmentPeople').value);

      if (currentApartmentIndex < houseForm.numApartments - 1) {
        currentApartmentIndex++;
        createApartmentForm();
      } else {
        currentApartmentIndex = 0;
        document.getElementById('apartmentForm').style.display = 'none';
        document.getElementById('personForm').style.display = 'block';
        createPersonForm();
      }
    });
  }

  function createPersonForm() {
    const personFormElement = document.getElementById('personForm');
    const person = personForm.createPerson();

    personFormElement.innerHTML = `
      <h3>Особа ${currentPersonIndex + 1}</h3>
      <input type="text" id="personName" placeholder="Ім'я"><br>
      <input type="text" id="personSurname" placeholder="Прізвище"><br>
      <button id="nextPerson">Далі</button>
    `;

    document.getElementById('nextPerson').addEventListener('click', () => {
      person.name = document.getElementById('personName').value;
      person.surname = document.getElementById('personSurname').value;

      apartmentForm.apartments[currentApartmentIndex].people.push(person);

      if (currentPersonIndex < apartmentForm.apartments[currentApartmentIndex].numPeople - 1) {
        currentPersonIndex++;
        createPersonForm();
      } else {
        currentPersonIndex = 0;
        if (currentApartmentIndex < houseForm.numApartments - 1) {
          currentApartmentIndex++;
          createApartmentForm();
        } else {
          displayData();
        }
      }
    });
  }

  function displayData() {
    const modalElement = document.getElementById('modal');
    modalElement.style.display = 'block';

    const outputElement = document.getElementById('output');
    outputElement.innerHTML = `
      <p>Адреса будинку: ${houseForm.address}</p>
      <p>Кількість поверхів: ${houseForm.numFloors}</p>
      <p>Кількість апартаментів: ${houseForm.numApartments}</p>
      <h3>Дані про апартаменти:</h3>
    `;

    apartmentForm.apartments.forEach((apartment, index) => {
      outputElement.innerHTML += `
        <p>Апартамент ${index + 1}:</p>
        <p>Номер апартаменту: ${apartment.number}</p>
        <p>Кількість кімнат: ${apartment.numRooms}</p>
        <p>Кількість людей: ${apartment.numPeople}</p>
        <h4>Мешканці:</h4>
      `;

      apartment.people.forEach((person, personIndex) => {
        outputElement.innerHTML += `
          <p>Особа ${personIndex + 1}:</p>
          <p>Ім'я: ${person.name}</p>
          <p>Прізвище: ${person.surname}</p>
        `;
      });
    });
  }