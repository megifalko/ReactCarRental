import { useState } from "react";
import { HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { CompanyType, getCarPrice, rentCar } from "../api/api";
import { Car, Company, dummyUser, generateKey } from "../data/Car";
import { AuthState } from "../store/authReducer";
import { CarState } from "../store/carReducer";
import emailjs from "@emailjs/browser";
import { authenticationModule } from "..";

interface propsType {
  car: Car;
  onRent: any;
  onClose: any;
  onPrice: any;
}

const Modal = (props: propsType) => {
  const [selectedCompany, setSelectedCompany] = useState(-1);
  const [days, setDays] = useState(1);
  const [priceVisible, setPriceVisible] = useState(false);
  const [currentPrice, setCurrentPrice] = useState("");
  const [quoteId, setQuoteId] = useState("");

  const isAdmin = authenticationModule.isAdmin;

  const sendConfirmation = () => {
    var data = {
      service_id: "YOUR_SERVICE_ID",
      template_id: "YOUR_TEMPLATE_ID",
      user_id: "YOUR_USER_ID",
      template_params: {
        username: "James",
        "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
      },
    };
  };

  const setPrice = async () => {
    if (selectedCompany === -1) return;
    await getCarPrice(
      authenticationModule.getUserId(),
      props.car.companies[selectedCompany].companyType,
      days,
      props.car
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const data = response.data;
          setCurrentPrice((data.price / days).toString());
          const quoteId = data.quotaId ? data.quotaId : data.quoteId;
          console.log(quoteId);
          setQuoteId(quoteId);
          setPriceVisible(true);
        } else if (response.status === 404) {
          props.onPrice(4);
        } else props.onPrice(1);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 404) props.onPrice(4);
        else props.onPrice(1);
      });
  };

  const companies = props.car.companies.map((company: Company) => (
    <div className="flex-row flex-j-start" key={generateKey()}>
      <input
        type="radio"
        className="checkbox"
        name="c1"
        defaultChecked={
          props.car.companies.findIndex(
            (c) => c.companyType === company.companyType
          ) === selectedCompany
            ? true
            : false
        }
        onClick={() => {
          const id = props.car.companies.findIndex(
            (c) => c.companyType === company.companyType
          );
          setSelectedCompany(id);
          if (priceVisible) setPrice();
        }}
      />
      <h6 className="s-18 mt-10 color-c6 m-0">
        {company.companyType + " Company"}
      </h6>
    </div>
  ));

  return (
    <div className="modal flex-col flex-j-center flex-a-center m-0">
      <div className="modal-container bg-white flex-row flex-j-center flex-ac-center flex-a-center w-600 h-600 border-radius-75 p-30 pl-10 pr-10">
        <div className="modal-car flex-col flex-j-between flex-a-center no-border w-300 h-520 p-30 pl-10 pr-10">
          <div className="flex-col flex-j-between flex-a-center h-520">
            <div className="flex-col flex-j-start">
              <div className="w-250 flex-row flex-j-between">
                <h4 className="font-weight-800 s-32 color-c6 m-0">
                  {props.car.brandName}
                </h4>
                <h4 className="font-weight-300 s-34 color-c3 text-right m-0">
                  {props.car.year}
                </h4>
              </div>
              <div className="w-250 flex-row flex-j-between">
                <h6 className="s-18 mt-10 mb-0 color-c6 font-weight-400">
                  {props.car.modelName}
                </h6>
                <h6 className="s-18 mt-10 mb-0 color-c6 font-weight-400">
                  {props.car.enginePower} {props.car.enginePowerType}
                </h6>
              </div>
            </div>
            <div className="flex-col flex-j-start w-250">
              <img src={props.car.imageUrl} alt="car" />
            </div>
            <div className="w-250 flex-row flex-j-between">
              <p className="m-0 s-14 text-justify">{props.car.description}</p>
            </div>
          </div>
        </div>
        <div className="modal-car flex-col flex-j-between flex-a-center no-border w-300 h-520 mb-20 p-30 pl-10 pr-10">
          <div className="flex-col flex-j-between flex-a-center h-520">
            <div className="w100 flex-col flex-j-start">{companies}</div>
            <div className="flex-col flex-j-start">
              {!isAdmin && (
                <div className="flex-row flex-j-between">
                  <h6 className="s-14 mt-5 mb-0 color-c6 font-weight-400">
                    Rental duration (days)
                  </h6>
                  <input
                    className="number w-30 h-30 border-radius-25 pl-5 s-14 mt-0"
                    type="number"
                    placeholder="1"
                    min={1}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  />
                </div>
              )}
              {!isAdmin && (
                <button
                  className="modal-button-check mt-10 bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border"
                  onClick={() => {
                    setPrice();
                    console.log(currentPrice);
                  }}
                  disabled={selectedCompany < 0 || authenticationModule.isAdmin}
                >
                  Check price
                </button>
              )}
            </div>

            <div className="flex-col flex-j-end h-170">
              <div className="flex-row flex-j-end">
                <h4 className="flex-col flex-j-end font-weight-300 s-34 text-right color-c3 m-0">
                  {priceVisible ? "$" + currentPrice : null}
                </h4>
              </div>
              <div className="flex-col flex-j-end">
                <h6 className="s-18 mt-10 mb-20 color-c6 text-right font-weight-400">
                  {priceVisible ? "/day" : null}
                </h6>
              </div>
              {!isAdmin && (
                <button
                  className="modal-button-rent bg-c2 w-220 h-50 border-radius-75 s-28 text-center font-weight-700 color-white no-border"
                  onClick={() => {
                    rentCar(
                      authenticationModule.getUserId(),
                      quoteId,
                      new Date(Date.now())
                    )
                      .then((response) => {
                        if (response.status === 200) {
                          props.onRent(2);
                        } else if (response.status === 404) {
                          props.onRent(3);
                        } else props.onRent(1);
                      })
                      .catch((e) => {
                        if (e.response.status === 404) props.onRent(3);
                        else props.onRent(1);
                      });
                  }}
                  disabled={!priceVisible}
                >
                  Rent me
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          className="modal-button-close modal-button bg-transparent"
          onClick={props.onClose}
        >
          <HiX />
        </button>
      </div>
    </div>
  );
};

export default Modal;
