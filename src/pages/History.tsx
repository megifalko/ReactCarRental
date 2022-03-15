import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RentedCar, RentedResponse } from "../data/Car";
import { AuthState } from "../store/authReducer";
import { CarState } from "../store/carReducer";
import RentedCarModal from "../components/RentedCarModal";
import { useOutletContext } from "react-router-dom";
import { filterCars, sortCars } from "../Functions";
import { authenticationModule } from "..";
import { getAllHistory, getHistory, getRented } from "../api/api";

interface propsType {
  displaySorting: boolean;
  currentOrder: string;
  currentBrand: string;
}

interface rentedResponse {
  carId: string;
  rentDate: Date;
  returnDate: Date;
}

const RentedHistory = () => {
  const display: propsType = useOutletContext();
  const [modalOpen, setModalOpen] = useState(-1);
  // const [cars, setCars] = useState<RentedCar[]>([]);
  // useEffect(() => {
  //   let list: RentedCar[] = [];
  //   for (let i = currentCars.length - 1; i >= 0; i -= 3) {
  //     list.push(RentedResponse(currentCars[i]));
  //   }
  //   setCars(list);
  // }, []);
  const [cars, setCars] = useState<rentedResponse[]>([]);
  useEffect(() => {
    // let list: RentedCar[] = [];
    // for (let i = 0; i < 3 && i < currentCars.length; i++) {
    //   list.push(RentedResponse(currentCars[i]));
    // }
    // setCars(list);
    if(authenticationModule.isAdmin){
      getAllHistory().then(response => {setCars(response.data); 
        console.log(response.data)});
    }
    else{
      getHistory(authenticationModule.getUserId()).then(response => {setCars(response.data); 
        console.log(response.data)});
    }
    // getRented(authenticationModule.getUserId()).then((response) => {
    //   setCars(response.data);
    //   console.log(response.data);
    //}
    //);
  }, []);

  const currentCars = useSelector(
    (state: { carReducer: CarState; authReducer: AuthState }) =>
      state.carReducer.CarList
  );
  console.log(cars);
  const tmp: RentedCar[] = [];
  cars.forEach((item) => {
    const currentCar = currentCars.find((el) => el.id === item.carId);
    if (currentCar !== undefined) {
      const rentedCar: RentedCar = {
        rentId: "",
        rentAt: new Date(item.rentDate),
        startDate: new Date(item.rentDate),
        endDate: new Date(item.returnDate),
        returnAt: new Date(item.returnDate),
        car: currentCar,
      };
      tmp.push(rentedCar);
    }
  });
  console.log(tmp);
  const list =
    tmp.length > 0
      ? sortCars(filterCars(tmp, display.currentBrand), display.currentOrder)
      : tmp;
  //const list = sortCars(filterCars(cars, display.currentBrand), display.currentOrder)

  const rentedCars = list.map((element: RentedCar) => (
    <div
      className="box modal-container bg-white flex-col flex-j-between flex-ac-center flex-a-center w-800 h-250 border-radius-75 p-30 mb-30"
      key={element.car.id}
    >
      <div className="box flex-row flex-j-between flex-ac-center flex-a-center w-800 pl-80 pr-80 ">
        <div className="flex-col flex-j-start w-150 mt-20">
          <img src={element.car.imageUrl} alt="car" />
        </div>
        <div className="flex-col flex-j-between w-50">
          <div className="flex-row flex-j-start">
            <h6 className="s-18 color-c6 m-0 mr-20">Car: </h6>
          </div>
          <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">From:</h6>
          <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">To:</h6>
        </div>
        <div className="flex-col flex-j-between w-300">
          <div className="flex-row flex-j-start">
            <h6 className="s-18 color-c6 m-0 mr-20">{element.car.brandName}</h6>
            <h6 className="s-18 color-c6 m-0">{element.car.modelName}</h6>
          </div>
          <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
            {element.startDate.toUTCString()}
          </h6>
          <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
            {element.endDate.toUTCString()}
          </h6>
        </div>
      </div>
      <div className="flex-row flex-j-center flex-a-center">
        <button
          className="modal-button-check mt-30 bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border"
          onClick={() => {
            setModalOpen(tmp.indexOf(element));
          }}
        >
          Details
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      {modalOpen >= 0 && (
        <RentedCarModal
          data={tmp[modalOpen]}
          onClose={() => {
            setModalOpen(-1);
          }}
        />
      )}
      <div className="flex-col flex-j-center flex-a-center flex-ac-center m-0 mt-80">
        {rentedCars}
      </div>
    </div>
  );
};

export default RentedHistory;
