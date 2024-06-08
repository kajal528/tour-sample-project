import styles from './CityItem.module.css'
import { CityItemProps } from '../types/types'
import { formatDate } from '../utils/utils';
import { Link } from 'react-router-dom';
import { useCities } from '../context/CityContext';
import { MouseEvent } from 'react';

const CityItem:React.FC<CityItemProps> = (props: CityItemProps) => {

  const { cityName, date, emoji, id, position} = props;
  const {currentCity, deleteCity} = useCities();

  const handleDelete = (e: MouseEvent)=>{
    e.preventDefault();
    id ? deleteCity(id): console.log("Please provide the valid parameters.");
  }

  return (
    <li>
      <Link className={`${styles.cityItem} ${currentCity?.id ===id ?styles['cityItem--active']: ""}`} to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{date?formatDate(date):""}</time>
        <button className={styles.deleteBtn} onClick={(e)=>handleDelete(e)}>&times;</button>
      </Link>
    </li>
  )
}

export default CityItem