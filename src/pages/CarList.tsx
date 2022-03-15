import { useState } from "react";
import CarItem from "../components/CarItem";
import NavbarCar from "../components/NavbarCar";
import MyModal from "../components/Modal";
import { getAllCars } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { CarState } from "../store/carReducer";
import { AuthState } from "../store/authReducer";
import InfoModal from "../components/InfoModal";
import { sortCarList, filterCarList } from "../Functions";

const CarList = () => {
  console.log('process.env', process.env);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("byDefault");
  const [modalOpen, setModalOpen] = useState(-1);
  const [rentResult, setRentResult] = useState(1);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const currentCars = useSelector(
    (state: { carReducer: CarState; authReducer: AuthState }) =>
      state.carReducer.CarList
  );

  const handleSearch = (name: string) => {
    setFilter(name);
  };

  const handleSorting = (name: string) => {
    setOrder(name);
  };

  const showDetails = async (index: number) => {
    setModalOpen(index);
  };

  const currentIndex = () => {
    return currentCars.findIndex((car) => car.index === modalOpen);
  };

  const list = sortCarList(filterCarList(currentCars, filter), order);

  const CurrentCarList = () => {
    return (
      <div>
        {infoModalOpen && (
          <InfoModal
            success={rentResult === 2 ? true : false}
            message={rentResult === 2 ? "Car was rented!" : rentResult === 3 ? "This car is no longer available." : rentResult === 4 ? "Go to the client page and fill required data." : "Something went wrong :("}
            onClose={() => {
              setInfoModalOpen(false);
            }}
          />
        )}
        {modalOpen >= 0 ? (
          <MyModal
            car={currentCars[currentIndex()]}
            onClose={() => setModalOpen(-1)}
            onRent={(result: number, isRented: boolean = false) => {
              setModalOpen(-1);
              setInfoModalOpen(true);
              setRentResult(result);
            }}
            onPrice={(result: number) =>{
              setModalOpen(-1);
              setInfoModalOpen(true);
              setRentResult(result);
            }}
          />
        ) : null}
        <div className="cardWrapper flex-row wrap flex-j-center flex-ac-start col-gap-30 mt-60 pt-30">
          {list.map((car) => (
            <CarItem key={car.index} car={car} onClick={showDetails} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavbarCar
        handleSearch={handleSearch}
        onAdd={showDetails}
        handleSorting={handleSorting}
        handleGet={() => {
          dispatch(getAllCars);
        }}
      />
      <div>
        <CurrentCarList />
      </div>
    </div>
  );
};
export default CarList;
