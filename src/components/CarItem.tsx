import {CarData} from "../data/Car"

const CarItem = (props: CarData) => {
  return (
    <div className="flex-col flex-j-between flex-a-center border-radius-30 w-300 h-400 bg-white mb-20 pt-30 pb-30 pl-10 pr-10">
      <div className="flex-col flex-j-between flex-a-center h-300">
        <div className="flex-col flex-j-start">
          <div className="w-250 flex-row flex-j-between">
            <h4 className="font-weight-800 s-32 text-c6 m-0">{props.car.brandName}</h4>
          </div>
          <div className="w-250 flex-row flex-j-between">
            <h6 className="s-18 m-0 text-dark font-weight-400">{props.car.modelName}</h6>
          </div>
        </div>
        <div className="flex-row flex-a-start w-250">
          <img src={props.car.imageUrl} alt="car" className="car-img"/>
        </div>
      </div>
      <button
        className="bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border"
        onClick={() => {
          props.onClick(props.car.index);
        }}
      >
        Details
      </button>
    </div>
  );
};

export default CarItem;
