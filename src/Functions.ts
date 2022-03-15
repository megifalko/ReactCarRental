import { Car, RentedCar } from "./data/Car";

export const sortCarList = (cars: Car[], order: string) => {
    return cars.sort((carA: Car, carB: Car) => {
        switch (order) {
          case "byDefault":
            return 1;
          case "byBrand":
            return carA.brandName < carB.brandName
              ? -1
              : carA.brandName > carB.brandName
              ? 1
              : 0;
          case "byModel":
            return carA.modelName < carB.modelName
              ? -1
              : carA.modelName > carB.modelName
              ? 1
              : 0;
          case "byYear":
            return carA.year < carB.year
              ? -1
              : carA.year > carB.year
              ? 1
              : 0;
          default:
            return 1;
        }
      });
};

export const filterCarList = (cars: Car[], brand: string) => {
    return cars.filter((car) => {
      const name =
        car.brandName.toUpperCase() + " " + car.modelName.toUpperCase();
      return name.includes(brand.toUpperCase());
    });
  };

export const sortCars = (cars: RentedCar[], order: string) => {
    return cars.sort((carA: RentedCar, carB: RentedCar) => {
        switch (order) {
          case "byDefault":
            return 1;
          case "byBrand":
            return carA.car.brandName < carB.car.brandName
              ? -1
              : carA.car.brandName > carB.car.brandName
              ? 1
              : 0;
          case "byModel":
            return carA.car.modelName < carB.car.modelName
              ? -1
              : carA.car.modelName > carB.car.modelName
              ? 1
              : 0;
          case "byDate":
            return carA.startDate < carB.startDate
              ? -1
              : carA.startDate > carB.startDate
              ? 1
              : 0;
          default:
            return 1;
        }
      });
};

export const filterCars = (cars: RentedCar[], brand: string) => {
  return cars.filter((item) => {
    const name =
      item.car.brandName.toUpperCase() + " " + item.car.modelName.toUpperCase();
    return name.includes(brand.toUpperCase());
  });
};
