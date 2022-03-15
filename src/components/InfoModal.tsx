import { BiCheck, BiErrorCircle } from "react-icons/bi";
import { HiX } from "react-icons/hi";

const InfoModal = (props: any) => {
  return (
    <div className="modal flex-col flex-j-center flex-a-center m-0">
      <div className="modal-container bg-white flex-col flex-j-center flex-ac-center flex-a-center w-200 h-200 border-radius-35 p-10">
        <button className="bg-transparent rel absolute" onClick={props.onClose}>
          <HiX className="f-30" />
        </button>
        <h6 className="s-20 font-weight-400 color-c6 m-0 text-center">{props.message}</h6>
        {!props.success ? (
          <BiErrorCircle className="f-30" />
        ) : (
          <BiCheck className="f-30" />
        )}
      </div>
    </div>
  );
};

export default InfoModal;
