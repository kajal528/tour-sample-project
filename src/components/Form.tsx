// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { MouseEvent, useEffect, useState } from "react";
import ButtonBack from "./ButtonBack";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatDate } from "../utils/utils";
import Message from "./Message";
import Spinner from "./Spinner";
import { CityItemProps } from "../types/types";
import { useCities } from "../context/CityContext";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);

  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat') || "";
  const lng = searchParams.get('lng') || "";

  const {addCity, isLoading} = useCities();
  const navigate = useNavigate();
  useEffect(function () {
    setIsLoadingGeolocation(true);
    fetchGeolocation();
  }, [lat, lng]);

  
  const fetchGeolocation = async () => {

    if(!lat && !lng){
      setIsLoadingGeolocation(false);
      return <Message message="Please click on the map to start adding the city."/>
    }
  
    try {
      setIsError(false);
      setErrorMsg("");
      const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      const result = await response.json();

      if(result.status === 401){
        setIsError(true);
        throw new Error(`Valid coordinates are not selected, please zoom out to see the valid area on map.`)
      }
      
      if (!result.countryCode) {
        setIsError(true);
        throw new TypeError("Not a valid city, please select other city by clicking on the map.");
      }

      setEmoji(convertToEmoji(result.countryCode));
      setCityName(result.city);
      setCountryName(result.countryName)

    }
    catch(error: any) {
      if(error instanceof TypeError){
        setErrorMsg(error.message);
      }
      else{
        setErrorMsg(error.message);
      }
    }
    finally{
      setIsLoadingGeolocation(false);
    }
  }

  if(isLoadingGeolocation) return <Spinner/>

  if (isError) return <Message message={errorMsg} />

  const handleSubmit = async (e: MouseEvent)=>{
    e.preventDefault();
   const newCity:CityItemProps = {
        cityName: cityName,
        country: countryName,
        emoji: emoji,
        notes: notes,
        position : {
          lat: parseInt(lat),
          lng: parseInt(lng)
        },
        date: formatDate(date.toString())
    }
    await addCity(newCity);
    navigate('/app/cities');
  }

  return (
    <form className={`${styles.form} ${isLoading? styles.loading:""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <DatePicker selected={date} onChange={(date)=>date?setDate(date):""}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={(e: MouseEvent) => handleSubmit(e)} type={'primary'}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
