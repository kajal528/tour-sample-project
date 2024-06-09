import { createContext, useContext, useEffect, useState , ReactNode} from "react";
import { CityContextProps, CityItemProps} from "../types/types";

const CitiesContext = createContext<CityContextProps|null>(null);
const BASE_URL = 'https://main--sample-tour-app.netlify.app';

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
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/.netlify/functions/functions`);
        const result = await response.json();
        setCities(result.data.cities);
      }
      catch(error){
        alert("Error occurred while loading the data.");
      }
      finally{
        setIsLoading(false);
      }
    }

    async function getCity(id: string){
      try{
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/.netlify/functions/functions/${id}`);
        const result = await response.json();
        setCurrentCity(result.result);
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
         const response = await fetch(`${BASE_URL}/.netlify/functions/functions`, {
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
          const response = await fetch(`${BASE_URL}/.netlify/functions/functions/${id}`, {
            method: 'DELETE'
          });
          const result = await response.json();
          console.log(result);
          
          setCities(result.data.cities);
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
