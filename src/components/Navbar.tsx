import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { HiChevronDown, HiHome, HiUser } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthState, logout, login } from "../store/authReducer";
import { CarState } from "../store/carReducer";
import AzureAuthenticationButton from "../azure/azure-authentication-component";
import { AccountInfo } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { authenticationModule } from "..";

const Navbar = (props: any) => {
  console.log(authenticationModule.getUserId())
  const isAuthenticated = authenticationModule.account ? true : false;
  const navigate = useNavigate();
  const onAuthenticated = async (userAccountInfo: AccountInfo) => {
    //setCurrentUser(userAccountInfo);
    //dispatch(login(userAccountInfo));
    
    navigate("login");
  };
  const [currentBrand, setCurrentBrand] = useState("");
  const [currentOrder, setCurrentOrder] = useState("byDefault");
  const [brandSelectionOpen, setBrandSelectionOpen] = useState(false);
  const [orderSelectionOpen, setOrderSelectionOpen] = useState(false);

  const brands = useSelector(
    (state: { carReducer: CarState; authReducer: AuthState }) =>
      state.carReducer.Brands
  );

  const orders = [
    "Alphabetically by brand",
    "Alphabetically by model",
    "By date",
    "Default",
  ];

  const chooseOrder = () => {
    return (
      <div className="w-200 bg-white border-radius-10 p-10 t-40 absolute border-2">
        {orders.map((order) => (
          <div
            id={"order_" + order}
            className="hov"
            onClick={() => {
              console.log("click");

              let selectedOrder = () => {
                switch (order) {
                  case "Alphabetically by brand": {
                    return "byBrand";
                  }
                  case "Alphabetically by model": {
                    return "byModel";
                  }
                  case "By date": {
                    return "byDate";
                  }
                  default: {
                    return "byDefault";
                  }
                }
              };
              setCurrentOrder(selectedOrder);
              setOrderSelectionOpen(false);
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
            className={
              "hov " + (currentBrand === brand ? "font-weight-700" : "")
            }
            onClick={() => {
              setBrandSelectionOpen(false);
              if (currentBrand === brand) {
                setCurrentBrand("");
              } else {
                setCurrentBrand(brand);
              }
            }}
          >
            {brand}
          </div>
        ))}
      </div>
    );
  };

  const menu = () => {
    return (
      <>
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
      </>
    );
  };

  const location = useLocation();
  const displayFilterSort =
    location.pathname === "/client/rented" ||
    location.pathname === "/client/history"
      ? true
      : false;

  const options = () => {
    return (
      <div className="flex-row flex-a-center flex-j-center flex-ac-center">
        <NavLink
          to="/client/rented"
          className={({ isActive }) =>
            "s-20 text-center bg-transparent flex-row flex-ac-center color-white mr-20 " +
            (isActive ? "navlink-selected" : "navlink")
          }
        >
          Currently rented
        </NavLink>
        <NavLink
          to="/client/history"
          className={({ isActive }) =>
            "s-20 text-center bg-transparent flex-row flex-ac-center color-white mr-20 " +
            (isActive ? "navlink-selected" : "navlink")
          }
        >
          History
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <nav>
        <div className="navbar flex-row flex-j-between flex-a-center h-60 p-0 pl-10 pr-10 bg-c3 z-100">
          <div className="flex-row flex-j-start flex-ac-center flex-a-center w-300">
            <Link
              className="s-20 text-center bg-transparent flex-row flex-ac-center color-white"
              to="/"
            >
              <HiHome />
            </Link>
            {displayFilterSort && menu()}
          </div>

          <div className="flex-row flex-a-center flex-j-center flex-ac-center">
            {isAuthenticated && options()}
          </div>
          <div className="flex-row flex-j-end w-300">
          <NavLink
              to="/client"
              className={(isActive) =>
                "s-20 text-center bg-transparent flex-row flex-ac-center color-white" +
                (isActive ? " navlink-selected" : "navlink")
              }
            >
              <HiUser />
            </NavLink>
            
            {isAuthenticated && <AzureAuthenticationButton
              onAuthenticated={onAuthenticated}
              mode={false}
            />}
            
          </div>
        </div>
      </nav>
      <Outlet context={{ displayFilterSort, currentBrand, currentOrder }} />
    </div>
  );
};

export default Navbar;
