import { MouseEvent} from "react";
import styles from "./Button.module.css";

interface ButtonProps{
  children: String,
  onClick?: (e: MouseEvent)=>void,
  type: any
}

function Button(ButtonProps: ButtonProps) {
  const { children, onClick, type} = ButtonProps;

  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
