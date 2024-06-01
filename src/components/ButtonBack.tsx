import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { MouseEvent } from "react";

const ButtonBack = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = (e: MouseEvent)=>{
        e.preventDefault();
        navigate(-1)};

  return (
    <Button onClick={handleBackButtonClick} type={'back'}>
            &larr; Back
    </Button>
  )
}

export default ButtonBack