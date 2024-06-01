import { createContext, useContext, useEffect, useState , ReactNode} from "react";
import { CityContextProps, CityItemProps} from "../types/types";

const CitiesContext = createContext<CityContextProps|null>(null);
const BASE_URL = 'http://localhost:3000';

export const useCities = ()=>{
    const cityContext = useContext(CitiesContext);
    if(!cityContext){
      throw new Error('Context is used outside the CitiesProvider.')
    }
    return cityContext;
}

 export function CitiesProvider(props: {children:ReactNode}) {
    const [cities, setCities] = useState<CityItemProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentCity, setCurrentCity] = useState<CityItemProps>({});

    useEffect(function(){
       getCities();
    },[]);

    async function getCities(){
      try{
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/cities');
        const result = await response.json();
        setCities(result);
      }
      catch(error){
        alert("Error occurred while loading the data.")
      }
      finally{
        setIsLoading(false);
      }
    }

    async function getCity(id: string){
      try{
        setIsLoading(true)
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const result = await response.json();
        setCurrentCity(result);
      }
      catch(error){
        alert("Error occurred while loading the data.")
      }
      finally{
        setIsLoading(false);
      }
    }

    
    async function addCity(city: CityItemProps){
     try{
         setIsLoading(true);
         const response = await fetch(`${BASE_URL}/cities`, {
           method: 'POST',
           body: JSON.stringify(city),
           headers:{
             "Content-Type": 'application/json'
           }
         });
         const result = await response.json();
         setCities([...cities, result]);
       }
         catch(error){
           alert("Error occurred while creating the data.")
         }
         finally{
           setIsLoading(false);
         }
     }

     async function deleteCity(id: string){
      try{
          setIsLoading(true);
          const response = await fetch(`${BASE_URL}/cities/${id}`, {
            method: 'DELETE'
          });
          await response.json();
          setCities((cities)=>
            cities.filter((city)=> city.id!==id)
          )
        }
          catch(error){
            alert("Error occurred while deleting the data.")
          }
          finally{
            setIsLoading(false);
          }
      }
  return(
    <CitiesContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
      addCity,
      deleteCity
    }}>
      {props.children}
    </CitiesContext.Provider>
  );
}
