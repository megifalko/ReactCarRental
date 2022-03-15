import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generateKey, RentedCar, RentedResponse, Car } from "../data/Car";
import { AuthState } from "../store/authReducer";
import { CarState } from "../store/carReducer";
import ReturnCarModal from "../components/ReturnCarModal";
import InfoModal from "../components/InfoModal";
import { useOutletContext } from "react-router-dom";
import {sortCars, filterCars} from '../Functions'
import { getAllRented, getRented } from "../api/api";
import { authenticationModule } from "..";

interface propsType {
  displaySorting: boolean;
  currentOrder: string;
  currentBrand: string;
}

interface rentedResponse{
  "carId": string,
  "rentDate": Date,
  "returnDate": Date,
  "rentId": string
}

const Rented = () => {
  const [modalOpen, setModalOpen] = useState(-1);
  const [returnResult, setReturnResult] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const display: propsType = useOutletContext();
  const [cars, setCars] = useState<rentedResponse[]>([]);
  useEffect(() => {
    if(authenticationModule.isAdmin){
      getAllRented().then(response => {setCars(response.data); 
        console.log(response.data)});
    }
    else{
      getRented(authenticationModule.getUserId()).then(response => {setCars(response.data); 
        console.log(response.data)});
    }
    
  }, []);
  
  const currentCars = useSelector(
    (state: { carReducer: CarState; authReducer: AuthState }) =>
      state.carReducer.CarList
  );

  const isAdmin = authenticationModule.isAdmin;

  const height = isAdmin ? " h-250" : " h-200";

  console.log(cars);
  const tmp:RentedCar[] = [];
  cars.forEach(item => {
    const currentCar = currentCars.find(el => el.id === item.carId);
    if(currentCar!== undefined){
      const rentedCar:RentedCar = {
        rentId: item.rentId,
        rentAt: new Date(item.rentDate),
        startDate: new Date(item.rentDate),
        endDate: new Date(item.returnDate),
        returnAt: new Date(item.returnDate),
        car: currentCar
      };
      tmp.push(rentedCar);
    }
    
  })
  console.log(tmp)
  const list = tmp.length > 0 ? sortCars(filterCars(tmp, display.currentBrand), display.currentOrder) : tmp;
  //const list = cars;

  const rentedCars = list.map((element: RentedCar) => (
    <div
      className={
        "box modal-container bg-white flex-col flex-j-between flex-ac-center flex-a-center w-800 border-radius-75 p-30 pl-80 pr-80 mb-30" +
        height
      }
      key={generateKey()}
    >
      <div className="box flex-row flex-j-between flex-ac-center flex-a-center w-600">
        <div className="flex-col flex-j-start w-150">
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
      {isAdmin && (
        <button
          className="modal-button-check mt-10 bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border"
          onClick={() => {
            setModalOpen(tmp.indexOf(element));
          }}
        >
          Return me
        </button>
      )}
    </div>
  ));

  return (
    <div>
      {infoModalOpen && (
        <InfoModal
          success={returnResult}
          message={returnResult ? "Car was returned!" : "An error occured."}
          onClose={() => {
            setInfoModalOpen(false);
          }}
        />
      )}
      {modalOpen >= 0 && (
        <ReturnCarModal
          data={tmp[modalOpen]}
          onClose={()=>setModalOpen(-1)}
          onReturn={(result: boolean) => {
            setModalOpen(-1);
            setInfoModalOpen(true);
            setReturnResult(result);
          }}
        />
      )}
      <div className="flex-col flex-j-center flex-a-center flex-ac-center m-0 mt-100">
        {rentedCars}
      </div>
    </div>
  );
};

export default Rented;
