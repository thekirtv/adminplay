import Styles from "./Overlay.module.css";
import { Popup } from "../Popup/Popup"

export const Overlay = (props) => {
  return (
    <div onClick={props.close}
    className={`${Styles["overlay"]} ${props.isOpened && Styles["overlay_is-opened"]}`}>
     {props.isOpened && <Popup closePopup={props.close}/>}
    </div>
  );
};