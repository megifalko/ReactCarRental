import { useIsAuthenticated } from "@azure/msal-react";
import { useState } from "react";
import {
  HiSearch,
  HiArrowLeft,
  HiChevronDown,
  HiUser,
} from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, AuthState } from "../store/authReducer";
import { CarState } from "../store/carReducer";

const NavbarCar = (props: any) => {
  const isAuthenticated = useIsAuthenticated();
  const path = isAuthenticated ? "client" : "client/login";
  const dispatch = useDispatch();
  const [currentBrand, setCurrentBrand] = useState("");
  const [brandSelectionOpen, setBrandSelectionOpen] = useState(false);
  const [orderSelectionOpen, setOrderSelectionOpen] = useState(false);

  const brands = useSelector(
    (state: { carReducer: CarState; authReducer: AuthState }) =>
      state.carReducer.Brands
  );
  
  const orders = [
    "Alphabetically by brand",
    "Alphabetically by model",
    "By year",
    "Default",
  ];

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      props.handleSearch(currentBrand);
    }
  };

  const chooseOrder = () => {
    return (
      <div className="w-200 bg-white border-radius-10 p-10 t-40 absolute border-2">
        {orders.map((order) => (
          <div
            id={"order_" + order}
            className="hov"
            onClick={() => {
              setOrderSelectionOpen(false);
              let selectedOrder = () => {
                switch (order) {
                  case "Alphabetically by brand":
                    return "byBrand";
                  case "Alphabetically by model":
                    return "byModel";
                    case "By year":
                    return "byYear";
                  default:
                    return "byDefault";
                }
              };
              props.handleSorting(selectedOrder);
            }}
          >
            {order}
          </div>
        ))}
      </div>
    );
  };

  const chooseBrand = () => {
    return (
      <div className="w-200 bg-white border-radius-10 p-10 t-40 absolute border-2">
        <h6 className="color-c3 s-18 m-0 mb-5">Select brand:</h6>
        {brands.map((brand) => (
          <div
            id={"brand_" + brand}
            className={"hov " + (currentBrand === brand ? "font-weight-700" : "")}
            onClick={() => {
              setBrandSelectionOpen(false);
              if (currentBrand === brand) {
                setCurrentBrand("");
                props.handleSearch("");
              } else {
                setCurrentBrand(brand);
                props.handleSearch(brand);
              }
            }}
          >
            {brand}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="navbar flex-row flex-j-between flex-a-center h-60 p-0 pl-10 pr-10 bg-c3">
      <div className="flex-row flex-j-start flex-ac-center flex-a-center w-300">
        <div className=" filterContainer">
          <button
            className="s-20 text-center bg-transparent flex-row flex-a-center color-white relative"
            onClick={() => {
              setOrderSelectionOpen(!orderSelectionOpen);
              setBrandSelectionOpen(false);
            }}
          >
            <h6 className="font-weight-400 s-18 pr-5 color-white">Sort</h6>
            <HiChevronDown />
          </button>
          {orderSelectionOpen ? chooseOrder() : null}
        </div>

        <div className="filterContainer">
          <button
            className="s-20 text-center bg-transparent flex-row color-white flex-a-center"
            onClick={() => {
              setBrandSelectionOpen(!brandSelectionOpen);
              setOrderSelectionOpen(false);
            }}
          >
            <h6 className="font-weight-400 s-18 pr-5 color-white">Filter</h6>
            <HiChevronDown />
          </button>
          {brandSelectionOpen ? chooseBrand() : null}
        </div>
      </div>

      <div className="flex-row flex-a-center flex-j-center flex-ac-center">
        <button
          className="s-20 text-center bg-transparent flex-row flex-ac-center color-white"
          onClick={() => {
            setCurrentBrand("");
            props.handleSearch("");
          }}
        >
          <HiArrowLeft />
        </button>
        <input
          className="w-350 h-40 border-radius-75 pl-20 s-14"
          type="text"
          placeholder="Search for a car"
          onChange={(e) => {
            setCurrentBrand(e.target.value);
          }}
          value={currentBrand}
          onKeyDown={handleKeyDown}
        />
        <button
          className="s-20 text-center bg-transparent flex-col flex-ac-center color-white"
          onClick={() => {
            props.handleSearch(currentBrand);
          }}
        >
          <HiSearch />
        </button>
      </div>
      <div className="flex-row flex-j-end w-300">
        <Link
          className="s-20 text-center bg-transparent flex-row flex-ac-center color-white"
          to={path}
        >
          <HiUser />
        </Link>
        {isAuthenticated && (
          <Link
            to="/"
            className="s-20 text-center bg-transparent flex-row flex-ac-center color-white"
            onClick={() => {
              dispatch(logout(true));
            }}
          >
            <MdOutlineLogout />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarCar;
