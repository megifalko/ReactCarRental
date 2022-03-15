import { useState } from "react";
import { useForm } from "react-hook-form";
import { addCar, CompanyType } from "../api/api";
import { Car } from "../data/Car";

type CarData = Car;

const AddCar = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Car>({
    defaultValues: {
      brandName: "",
      modelName: "",
      year: 2021,
      enginePower: 125,
      enginePowerType: "",
      capacity: 5,
      description: "",
      imageUrl: "",
    },
  });

  let emptyCar: Car = {
    index: 0,
    id: "",
    brandName: "",
    modelName: "",
    year: 2021,
    enginePower: 125,
    enginePowerType: "",
    capacity: 5,
    description: "",
    imageUrl: "",
    companies: [],
  };
  const onSubmit = (data: Car) => {
    console.log(data);
    addCar(data);
    reset(emptyCar);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className="box modal-container bg-white flex-col flex-j-between flex-ac-center flex-a-center w-800 h-800 border-radius-75 p-40 pl-80 pr-80 mb-30">
        <h6 className="s-30 color-c6 m-0 mr-20">Welcome!</h6>
        <h6 className="s-14 font-weight-400 color-c6 m-0">
          Fill required fields if you want to add a car.
        </h6>
        <div className="flex-row flex-j-between flex-a-center flex-ac-center">
          <div className="flex-col flex-j-between flex-a-center flex-ac-center">
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">Brand:</h6>
              <input
                {...register("brandName", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="text"
                placeholder="Audi"
              />
            </div>
            {errors.brandName && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">Model:</h6>
              <input
                {...register("modelName", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="text"
                placeholder="A4"
              />
            </div>
            {errors.modelName && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">Year:</h6>
              <input
                {...register("year", { min: 2000, max: 2022 })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="number"
                placeholder="2018"
              />
            </div>
            {errors.year && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                Enter a valid year.
              </h6>
            )}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">
                Engine power:
              </h6>
              <input
                {...register("enginePower", { min: 0, max: 1000 })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="number"
                placeholder="200"
              />
            </div>
            {errors.enginePower && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                Engine power shoudld be between 100 and 500
              </h6>
            )}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">
                Engine power type:
              </h6>
              <input
                {...register("enginePowerType", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="text"
                placeholder="HP"
              />
            </div>
            {errors.enginePowerType && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">Capacity:</h6>
              <input
                {...register("capacity", { min: 1, max: 10 })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="number"
                placeholder="5"
              />
            </div>
            {errors.capacity && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">
                Description:
              </h6>
              <input
                {...register("description", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-100 border-radius-25 pl-20 pr-20 s-14 mt-5"
                type="text"
                placeholder="Enter description."
              />
            </div>
            {errors.description && (
              <h6 className="s-12 font-weight-400 color-red m-0 as-end">
                This field is requried.
              </h6>
            )}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600 mt-5">
              <h6 className="s-14 font-weight-400 color-c6 m-0 m-0">Photos:</h6>
              <input
                id="UploadPhoto"
                type="file"
                name="_photos"
                accept="image/*"
                className="hidden"
              />
              <label
                className="lbl w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                htmlFor="UploadPhoto"
              >
                Choose photo
              </label>
            </div>
          </div>
        </div>
        <button
          className="modal-button-rent bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mt-5 mb-5"
          onClick={() => {}}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddCar;
