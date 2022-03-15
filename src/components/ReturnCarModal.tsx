import { HiX } from "react-icons/hi";
import { returnCar } from "../api/api";
import { RentedCar } from "../data/Car";
import { useForm } from "react-hook-form";

interface PropsType {
  data: RentedCar;
  onClose: any;
  onReturn: any;
}

interface ReturnData {
  odometerValue: number;
  overallState: string;
  description: string;
  returnDate: Date;
}

const ReturnCarModal = (props: PropsType) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ReturnData>({
    defaultValues: {
      odometerValue: 100,
      overallState: "good",
      description: "",
      returnDate: new Date(Date.now()),
    },
  });
  const onSubmit = (data: ReturnData) => {
    console.log(data);
    returnCar(props.data.rentId)
      .then((response) => {
        if (response.status === 200) props.onReturn(true);
        else props.onReturn(false);
      })
      .catch(props.onReturn(false));
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className="modal flex-col flex-j-center flex-a-center m-0 z-100">
        <div className="box modal-container bg-white flex-col flex-j-between flex-ac-center flex-a-center w-800 h-650 border-radius-75 p-30 mb-30">
          <button
            className="bg-transparent rel absolute s-20"
            onClick={props.onClose}
          >
            <HiX className="s-25" />
          </button>
          <div className="box flex-row flex-j-between flex-ac-center flex-a-center w-800 pl-80 pr-80 ">
            <div className="flex-col flex-j-start w-150 mt-20">
              <img src={props.data.car.imageUrl} alt="car" />
            </div>
            <div className="flex-col flex-j-between w-140">
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
                <h6 className="s-18 color-c6 m-0 mr-20">
                  {props.data.car.brandName}
                </h6>
                <h6 className="s-18 color-c6 m-0">
                  {props.data.car.modelName}
                </h6>
              </div>
              <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
                {props.data.startDate.toUTCString()}
              </h6>
              <h6 className="font-weight-400 s-18 mt-10 color-c6 m-0">
                {props.data.endDate.toUTCString()}
              </h6>
              <input
                className="login w-230 h-40 border-radius-75 pl-20 pr-20 s-14 mt-10"
                type="date"
                placeholder="12.12.2000"
              />
            </div>
          </div>
          <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
            <div className="flex-col flex-j-start w-250 h-300">
              <div className="flex-row flex-j-between flex-a-center  pt-40">
                <h6 className="s-14 font-weight-400 color-c6 m-0 mr-20">
                  Odometer value:
                </h6>
                <input
                 {...register("odometerValue", {
                  required: "This field is requried.",
                })}
                  className="login w-50 h-40 border-radius-50 pl-20 pr-20 s-14 mt-5"
                  type="number"
                  placeholder="100"
                />
              </div>
              {errors.odometerValue && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
              <div className="flex-row flex-j-between flex-a-center mt-10">
                <h6 className="s-14 font-weight-400 color-c6 m-0 mr-20">
                  Overall state:
                </h6>
                <input
                 {...register("overallState", {
                  required: "This field is requried.",
                })}
                  className="login w-50 h-40 border-radius-50 pl-20 pr-20 s-14 mt-5"
                  type="text"
                  placeholder="good"
                />
              </div>
              {errors.overallState && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
              <div className="flex-row flex-j-between flex-a-center mt-10">
                <h6 className="s-14 font-weight-400 color-c6 m-0 mr-20">
                  Photos:
                </h6>

                <input
                  id="UploadPhoto"
                  type="file"
                  name="_photos"
                  accept="image/*"
                  className="hidden"
                />
                <label
                  className="lbl w-50 h-40 border-radius-50 pl-20 pr-20 s-14 mt-5"
                  htmlFor="UploadPhoto"
                >
                  Choose photo
                </label>
              </div>
              <div className="flex-row flex-j-between flex-a-center mt-10">
                <h6 className="s-14 font-weight-400 color-c6 m-0 mr-20">
                  Documents:
                </h6>

                <input
                  id="Upload"
                  type="file"
                  name="_photos"
                  accept="image/*"
                  className="hidden"
                />
                <label
                  className="lbl w-50 h-40 border-radius-50 pl-20 pr-20 s-14 mt-5"
                  htmlFor="Upload"
                >
                  Choose pdf file
                </label>
              </div>
            </div>
            <div className="flex-col flex-j-between w-280 h-300">
              <h6 className="s-14 font-weight-400 color-c6 m-0">
                Description:
              </h6>
              <input
              {...register("description", {
                required: "This field is requried.",
              })}
                className="login w-230 h-250 border-radius-50 s-14 mt-5"
                type="text"
                placeholder="Description of the car."
              />
            </div>
            {errors.description && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
          </div>
          <button
            className="modal-button-check mt-10 bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border"
            onClick={() => {}}
          >
            Return me
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReturnCarModal;
