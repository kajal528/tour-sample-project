import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from '../components/Spinner';
import Message from './Message';
import { useCities } from '../context/CityContext';
import { useAuthContext } from '../context/AuthContext';

const CityList = () => {  
  const {cities, isLoading} = useCities();
    console.log(useAuthContext());
    
    if(isLoading) return <Spinner/>;

    if(!cities.length) return  <Message message='Please add your first city by clicking on the map.'/>;
    
  return (
    <div className={styles.cityList}>
        {cities.map((city)=>
            (<CityItem cityName={city.cityName} date={city.date} emoji={city.emoji} id={city.id} position={city.position} key={city.id}/>)
        )} 
    </div>
  )
}

export default CityList