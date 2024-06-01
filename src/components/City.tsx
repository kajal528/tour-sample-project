import { formatDate } from "../utils/utils";
import styles from "./City.module.css";
import ButtonBack from "./ButtonBack";
import { useParams } from "react-router-dom";
import { useEffect} from "react";
import Spinner from "./Spinner";
import { useCities } from "../context/CityContext";

function City() {
  const {id} = useParams();
  const {currentCity, getCity} = useCities();

  useEffect(function(){
    if(id){
      getCity(id);
    }
  },[id]);

  if(!currentCity){
    return <Spinner/>
  }

  const {cityName, date, emoji, notes} = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {date? <p>{formatDate(date)}</p>: ""}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
