import { useForm } from "react-hook-form";
import { authenticationModule } from "..";
import { registerUser } from "../api/api";
import { userData } from "../data/Car";

interface UserData {
  dateOfBirth: Date;
  country: string;
  city: string;
  yearOfGettingDriverLicence: Date;
}

const AddUserData = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    console.log(data);
    const newUser: userData = {
      id: authenticationModule.getUserId(),
      emailAddress: authenticationModule.getUserEmail(),
      username: "",
      birthDate: new Date(data.dateOfBirth),
      yearOfGettingDriverLicence: new Date(data.yearOfGettingDriverLicence),
      city: data.city,
      country: data.country,
      currentlyRentedCount: 0,
      overallRentedCount: 0
    };
    registerUser(newUser);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <div className="box modal-container bg-white flex-col flex-j-between flex-ac-center flex-a-center w-800 h-500 border-radius-75 p-40 pl-80 pr-80 mb-30">
        <h6 className="s-30 color-c6 m-0 mr-20">Welcome!</h6>
        <h6 className="s-14 font-weight-400 color-c6 m-0">
          Fill required fields if you want to rent a car.
        </h6>
        <div className="flex-row flex-j-between flex-a-center flex-ac-center">
          <div className="flex-col flex-j-between flex-a-center flex-ac-center">
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">
                Date of birth:
              </h6>
              <input
                {...register("dateOfBirth", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="date"
                placeholder="12.12.2000"
              />
            </div>
            {errors.dateOfBirth && <h6 className="s-12 font-weight-400 color-red m-0 as-end">This field is requried.</h6>}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">
                Date of getting driving licence:
              </h6>
              <input
                {...register("yearOfGettingDriverLicence", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="date"
                placeholder="12.12.2018"
              />
            </div>
            {errors.yearOfGettingDriverLicence && <h6 className="s-12 font-weight-400 color-red m-0 as-end">Enter correct value.</h6>}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">Country:</h6>
              <input
                {...register("country", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="text"
                placeholder="Poland"
              />
            </div>
            {errors.city && <h6 className="s-12 font-weight-400 color-red m-0 as-end">This field is requried.</h6>}
            <div className="flex-row flex-j-between flex-a-center flex-ac-center w-600">
              <h6 className="s-14 font-weight-400 color-c6 m-0">City:</h6>
              <input
                {...register("city", {
                  required: "This field is requried.",
                })}
                className="login w-300 h-40 border-radius-75 pl-20 pr-20 s-14 mt-5"
                type="text"
                placeholder="Warsaw"
              />
            </div>
            {errors.country && <h6 className="s-12 font-weight-400 color-red m-0 as-end">This field is requried.</h6>}
          </div>
        </div>
        <button
          className="modal-button-rent bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border mt-5 mb-5"
          onClick={() => {}} type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddUserData;
