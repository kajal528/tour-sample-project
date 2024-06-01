import styles from './CountryItem.module.css';
import { CityItemProps} from '../types/types';

const CountryItem:React.FC<CityItemProps> = (props) => {
    const {country, emoji} = props;
  return (
    <li className={styles.countryItem}>
        <span>{emoji}</span>
        <h3>{country}</h3>
    </li>
  )
}

export default CountryItem