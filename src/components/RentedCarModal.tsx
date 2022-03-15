import { HiX } from "react-icons/hi";
import { RentedCar } from "../data/Car";

interface PropsType {
    data: RentedCar,
    onClose: any
}

const RentedCarModal = (props: PropsType) => {
  return (
    <div className="modal flex-col flex-j-center flex-a-center m-0 z-100">
      <div className="box modal-container bg-white flex-col flex-j-between flex-ac-center flex-a-center w-800 h-400 border-radius-75 p-30 pb-60 mb-30">
      <button
          className="bg-transparent rel absolute s-20"
          onClick={props.onClose}
        >
          <HiX className="s-20"/>
        </button>
        <div className="box flex-row flex-j-between flex-ac-center flex-a-center w-800 pl-80 pr-80 ">
          <div className="flex-col flex-j-start w-150 mt-20">
            <img src={props.data.car.imageUrl} alt="car" />
          </div>
          <div className="flex-col flex-j-between w-50">
            <div className="flex-row flex-j-start">
              <h6 className="s-18 color-c6 m-0 mr-20">Car: </h6>
            </div>
            <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">From:</h6>
            <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">To:</h6>
            <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
              Returned:
            </h6>
          </div>
          <div className="flex-col flex-j-between w-300">
            <div className="flex-row flex-j-start">
              <h6 className="s-18 color-c6 m-0 mr-20">{props.data.car.brandName}</h6>
              <h6 className="s-18 color-c6 m-0">{props.data.car.modelName}</h6>
            </div>
            <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
              {props.data.startDate.toUTCString()}
            </h6>
            <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
              {props.data.endDate.toUTCString()}
            </h6>
            <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
              {props.data.returnAt !== null ? props.data.returnAt.toUTCString() : ""}
            </h6>
          </div>
        </div>
        <h6 className="s-18 color-c6 m-0 mr-20">Details:</h6>
        <div className="box flex-row flex-j-between flex-ac-center flex-a-center w-800 pl-80 pr-80 ">
        <h6 className="font-weight-400 s-14 mt-10 color-c6 m-0">
              Some notes from rental car worker
            </h6>
            <h6 className="font-weight-400 s-14 mt-10 color-c6 m-0 underline">
              link to pdf file
            </h6>
            <h6 className="font-weight-400 s-14 mt-10 color-c6 m-0 underline">
              link to jpg files
            </h6>
        </div>
      </div>
    </div>
  );
};

export default RentedCarModal;
