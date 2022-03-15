import { CompanyType } from "../api/api";

export const dummyCar: Car = {
  index: 0,
  id: "",
  brandName: "Audi",
  modelName: "A4",
  year: 0,
  enginePower: 0,
  enginePowerType: "",
  capacity: 0,
  description: "",
  imageUrl: "",
  companies: []
}

export const dummyUser = {
  id: "dummyuser1",
  emailAddress: "email@wp.pl",
  username: "dummyuser1",
  birthDate: new Date(2000,12,12),
  yearsOfHavingDriverLicense: 0,
  city: "Warszawa",
  country: "Polska",
  currentlyRentedCount: 0,
  overallRentedCount: 0,
}

export interface userData{
  id: string,
  emailAddress: string,
  username: string,
  birthDate: Date,
  yearOfGettingDriverLicence: Date,
  city: string,
  country: string,
  currentlyRentedCount: number,
  overallRentedCount: number,
}

export const RentedResponse = (car: Car) => {
  const data:RentedCar = {
    rentId: "rent"+car.id,
    rentAt: new Date(2021,Math.floor(Math.random() *12),Math.floor(Math.random() *28)),
    startDate: new Date(2021,Math.floor(Math.random() *12),Math.floor(Math.random() *28)),
    endDate: new Date(2022,1,10),
    returnAt: new Date(2022,1,8),
    car: car,
  }
  return data;
}

export interface RentedCar {
  rentId: string;
  rentAt: Date;
  startDate: Date;
  endDate: Date;
  returnAt: Date | null;
  car: Car;
}

export interface Company {
  companyType: string;
  // url: string;
  // companyName: string;
  carId: string;
}

export interface Car {
  index: number;
  id: string;
  brandName: string;
  modelName: string;
  year: number;
  enginePower: number;
  enginePowerType: string;
  capacity: number;
  description: string;
  imageUrl: string;
  companies: Company[];
}

export interface ApiCar {
  id: string;
  brandName: string;
  modelName: string;
  year: number;
  enginePower: number;
  enginePowerType: string;
  capacity: number;
  description: string;
  imageUrl: string;
  company: string;
}

export const generateKey = () => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export interface CarData {
  car: Car;
  onClick: (event: any) => void;
}

export const RESPONSE = {
  vehiclesCount: 26,
  generateDate: "2021-12-14T12:20:26.3786974+01:00",
  vehicles: [
    {
      id: "a8977f29-edc4-456e-dac2-08d9a095c9fc",
      brandName: "Audi",
      modelName: "A4",
      year: 2014,
      enginePower: 200,
      enginePowerType: "HP",
      capacity: 5,
      description: "Audi A4",
    },
    {
      id: "2af68af0-a8a6-42ad-dac3-08d9a095c9fc",
      brandName: "Audi",
      modelName: "A3",
      year: 2013,
      enginePower: 160,
      enginePowerType: "HP",
      capacity: 5,
      description: "Audi A3",
    },
    {
      id: "ec7c9ea4-3710-4242-dac4-08d9a095c9fc",
      brandName: "Audi",
      modelName: "R8",
      year: 2019,
      enginePower: 184,
      enginePowerType: "HP",
      capacity: 5,
      description: "Audi R8",
    },
    {
      id: "32d1d1b6-f74b-431b-dac5-08d9a095c9fc",
      brandName: "Alfa Romeo",
      modelName: "Giulietta",
      year: 2017,
      enginePower: 184,
      enginePowerType: "HP",
      capacity: 5,
      description: "Alfa Romeo Giulietta",
    },
    {
      id: "4265bbfa-b6ef-49a7-dac6-08d9a095c9fc",
      brandName: "Alfa Romeo",
      modelName: "Stelvio",
      year: 2017,
      enginePower: 164,
      enginePowerType: "HP",
      capacity: 5,
      description: "Alfa Romeo Stelvio",
    },
    {
      id: "01fb5ab2-dc5c-4d41-dac7-08d9a095c9fc",
      brandName: "Alfa Romeo",
      modelName: "GT",
      year: 2018,
      enginePower: 220,
      enginePowerType: "HP",
      capacity: 5,
      description: "Alfa Romeo GT",
    },
    {
      id: "acc2c989-5b9f-43bd-dac8-08d9a095c9fc",
      brandName: "BMW",
      modelName: "320d",
      year: 2015,
      enginePower: 284,
      enginePowerType: "HP",
      capacity: 5,
      description: "BMW 320d",
    },
    {
      id: "99465a14-9176-4e6d-dac9-08d9a095c9fc",
      brandName: "BMW",
      modelName: "X3",
      year: 2019,
      enginePower: 284,
      enginePowerType: "HP",
      capacity: 5,
      description: "BMW X3",
    },
    {
      id: "a9dd966c-ff33-4dc9-daca-08d9a095c9fc",
      brandName: "BMW",
      modelName: "Z3",
      year: 2014,
      enginePower: 164,
      enginePowerType: "HP",
      capacity: 5,
      description: "BMW Z3",
    },
    {
      id: "5027bdf9-d9e7-4340-dacb-08d9a095c9fc",
      brandName: "BMW",
      modelName: "X1",
      year: 2018,
      enginePower: 244,
      enginePowerType: "HP",
      capacity: 5,
      description: "BMW X1",
    },
    {
      id: "1589c94a-df05-4ce5-dacc-08d9a095c9fc",
      brandName: "Alfa Romeo",
      modelName: "Giullieta",
      year: 2017,
      enginePower: 184,
      enginePowerType: "HP",
      capacity: 5,
      description: "Alfa Romeo Giullieta",
    },
    {
      id: "72c60443-500c-458b-dacd-08d9a095c9fc",
      brandName: "Chevrolet",
      modelName: "Camaro",
      year: 2019,
      enginePower: 384,
      enginePowerType: "HP",
      capacity: 5,
      description: "Chevrolet Camaro",
    },
    {
      id: "c678ae84-3855-4b4d-dace-08d9a095c9fc",
      brandName: "Jaguar",
      modelName: "XE",
      year: 2016,
      enginePower: 200,
      enginePowerType: "HP",
      capacity: 5,
      description: "Jaguar XE",
    },
    {
      id: "a2312cf9-e987-4e22-dacf-08d9a095c9fc",
      brandName: "Jaguar",
      modelName: "F-Pace",
      year: 2019,
      enginePower: 284,
      enginePowerType: "HP",
      capacity: 5,
      description: "Jaguar F-Pace",
    },
    {
      id: "3de2f19a-a89f-4ac4-dad0-08d9a095c9fc",
      brandName: "Ford",
      modelName: "Fiest ST",
      year: 2015,
      enginePower: 235,
      enginePowerType: "HP",
      capacity: 5,
      description: "Ford Fiest ST",
    },
    {
      id: "69e91e75-8b18-4a90-dad1-08d9a095c9fc",
      brandName: "Ford",
      modelName: "Mustang GT",
      year: 2020,
      enginePower: 320,
      enginePowerType: "HP",
      capacity: 5,
      description: "Ford Mustang GT",
    },
    {
      id: "fb860ea6-ae0d-4697-dad2-08d9a095c9fc",
      brandName: "Porsche",
      modelName: "911",
      year: 2000,
      enginePower: 380,
      enginePowerType: "HP",
      capacity: 5,
      description: "Porsche 911",
    },
    {
      id: "f9791f80-7df1-4e72-dad3-08d9a095c9fc",
      brandName: "Porsche",
      modelName: "Cayenne",
      year: 2018,
      enginePower: 320,
      enginePowerType: "HP",
      capacity: 5,
      description: "Porsche Cayenne",
    },
    {
      id: "74ff94ec-04ca-427e-dad4-08d9a095c9fc",
      brandName: "Porsche",
      modelName: "Panamera",
      year: 2013,
      enginePower: 400,
      enginePowerType: "HP",
      capacity: 5,
      description: "Porsche Panamera",
    },
    {
      id: "faa97256-4174-4f97-dad5-08d9a095c9fc",
      brandName: "Nissan",
      modelName: "GT-R",
      year: 2020,
      enginePower: 584,
      enginePowerType: "HP",
      capacity: 5,
      description: "Nissan GT-R",
    },
    {
      id: "c1ee084f-b54d-482b-dad6-08d9a095c9fc",
      brandName: "Nissan",
      modelName: "S2000",
      year: 1998,
      enginePower: 180,
      enginePowerType: "HP",
      capacity: 5,
      description: "Nissan S2000",
    },
    {
      id: "6c7f4ecb-5f0b-4067-dad7-08d9a095c9fc",
      brandName: "Lamborghini",
      modelName: "Aventador",
      year: 2017,
      enginePower: 450,
      enginePowerType: "HP",
      capacity: 5,
      description: "Lamborghini Aventador",
    },
    {
      id: "e981b920-bb83-403f-dad8-08d9a095c9fc",
      brandName: "Subaru",
      modelName: "Impreza WRC STI",
      year: 2017,
      enginePower: 460,
      enginePowerType: "HP",
      capacity: 5,
      description: "Subaru Impreza WRC STI",
    },
    {
      id: "44e1a247-854f-4c6a-dad9-08d9a095c9fc",
      brandName: "Mercedes",
      modelName: "CLA",
      year: 2017,
      enginePower: 184,
      enginePowerType: "HP",
      capacity: 5,
      description: "Mercedes CLA",
    },
    {
      id: "2f47606b-8d3d-42a0-dada-08d9a095c9fc",
      brandName: "Mercedes",
      modelName: "CLS",
      year: 2017,
      enginePower: 184,
      enginePowerType: "HP",
      capacity: 5,
      description: "Mercedes CLS",
    },
    {
      id: "9d72591a-e6a8-4e3e-dadb-08d9a095c9fc",
      brandName: "Mercedes",
      modelName: "GLS",
      year: 2017,
      enginePower: 345,
      enginePowerType: "HP",
      capacity: 5,
      description: "Mercedes GLS",
    },
  ],
};

//export const CARS: Car[] = carsFromJSON;

// {
//   "imageUrl": "https://www.freeiconspng.com/uploads/car-png-27.png",
//   "brand": "Toyota",
//   "model": "Yaris",
//   "year": 2018,
//   "companyId": 0,
//   "horsePower": 500,
//   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vel."
// },
// {
//   "imageUrl": "https://img-optimize.toyota-europe.com/resize/ccis/680x680/zip/pl/product-token/8e183be2-5fa8-4b05-94a6-21fdeae169c6/vehicle/42f0b9c5-3f0a-486c-9ec3-ab72669ef3ed/image-quality/70/day-exterior-4_8y5.png",
//   "brand": "Toyota",
//   "model": "Aygo",
//   "year": 2018,
//   "companyId": 1,
//   "horsePower": 500,
//   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vel."
// },
// {
//   "imageUrl": "https://www.nicepng.com/png/detail/246-2462468_buick-skylark-1953-png.png",
//   "brand": "Buick",
//   "model": "Skylark",
//   "year": 2018,
//   "companyId": 1,
//   "horsePower": 500,
//   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vel."
// },
// {
//   "imageUrl": "https://nawigacje.eu/wp-content/uploads/2018/04/galaxy.png",
//   "brand": "Ford",
//   "model": "Galaxy",
//   "year": 2018,
//   "companyId": 0,
//   "horsePower": 500,
//   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vel."
// },
// {
//   "imageUrl": "https://static.wixstatic.com/media/f88402_304a251996654df1ab673ea640eb60f1~mv2.png/v1/fill/w_1183,h_786,al_c/f88402_304a251996654df1ab673ea640eb60f1~mv2.png",
//   "brand": "Pontiac",
//   "model": "Catalina",
//   "year": 2018,
//   "companyId": 0,
//   "horsePower": 500,
//   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vel."
// },
// {
//   "imageUrl": "https://www.kindpng.com/picc/m/434-4348363_2020-ford-transit-250-base-2020-ford-transit.png",
//   "id": 6,
//   "brand": "Ford",
//   "model": "Transit",
//   "year": 2018,
//   "companyId": 1,
//   "horsePower": 500,
//   "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate vel."
// }
