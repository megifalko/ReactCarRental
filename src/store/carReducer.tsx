import { createSlice } from "@reduxjs/toolkit";
import { CompanyType } from "../api/api";
import { ApiCar, Car, Company } from "../data/Car";

export interface CarState {
  CarList: Car[];
  CarCount: number;
  Brands: string[];
}

const initialState: CarState = {
  CarList: [],
  CarCount: 0,
  Brands: [],
};

export const CarListSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    set: (state, action) => {
      let list: ApiCar[] = action.payload.data.vehicles;
      console.log(list);
      list.map((item: ApiCar) => {
        if (!state.Brands.includes(item.brandName))
          state.Brands.push(item.brandName);
        if (!item.hasOwnProperty("imgUrl"))
          item["imageUrl"] =
            "https://www.freeiconspng.com/uploads/car-png-27.png";
        const index = state.CarList.findIndex(
          (car) =>
            car.brandName === item.brandName &&
            car.modelName === item.modelName
        );
        if (index > -1) {
          state.CarList[index].companies.push({
            companyType: item.company,
            carId: item.id,
          });
        } else {
          //item["index"] = state.CarCount++;
          let company: Company = {
            companyType: item.company,
            carId: item.id,
          };
          let car: Car = {
            index: state.CarCount++,
            id: item.id,
            brandName: item.brandName,
            modelName: item.modelName,
            year: item.year,
            enginePower: item.enginePower,
            enginePowerType: item.enginePowerType,
            capacity: item.capacity,
            description: item.description,
            imageUrl: item.imageUrl,
            companies: [company]
          }
          //item["companies"] = [company];
          state.CarList.push(car);
        }
      });
    },
  },
});

export const { set } = CarListSlice.actions;

export default CarListSlice.reducer;
