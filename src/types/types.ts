import { LatLngLiteral } from "leaflet"
import {User} from '../reducer/AuthReducer'

export interface CityContextProps{
    cities: CityItemProps[],
    isLoading: boolean
    currentCity: CityItemProps,
    getCity: (id:string)=>void,
    addCity: (city: CityItemProps)=>void
    deleteCity: (id: string)=>void
}

export interface CityListProps{
    cities: CityItemProps[],
    isLoading: boolean
}

export interface CityItemProps{
    cityName?: string,
    country?: string,
    emoji?: string,
    date?: string,
    notes?: string,
    position?: Position,
    id?: string
}

export interface Position extends LatLngLiteral{
    lat: number,
    lng: number
}

export interface AuthContextProps{
    // state:AuthProps,
    // dispatch: React.Dispatch<AuthAction>
    user: User,
    isAuthenticated: boolean,
    login: (email: string,password: string)=>void,
    logout: ()=>void,


}



