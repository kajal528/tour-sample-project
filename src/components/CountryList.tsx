import styles from './CountryList.module.css';
import { CityItemProps} from '../types/types';
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import { useCities } from '../context/CityContext';

const CountryList:React.FC = () => {
    const {cities, isLoading} = useCities();

    if(isLoading) return <Spinner/>

    const countries:CityItemProps[] = cities.reduce((acc: CityItemProps[], curr:CityItemProps)=>{
        if(!acc.map(ele=>ele.country).includes(curr.country)) return [...acc,{country: curr.country, emoji: curr.emoji}];
        else return acc;
    },[])
    
    
  return (
    <ul className={styles.countryList}>
       {countries.map((ele, index)=>{
       return (
            <CountryItem country={ele.country} emoji={ele.emoji} key={index}/>
        )
       })}
    </ul>
  )
}

export default CountryList