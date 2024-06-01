import { useSearchParams, useNavigate} from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../context/CityContext';
import { Position } from '../types/types';

const Map = () => {
  const {cities} = useCities();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<Position>({lat:40,lng:0});
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(function(){
    if(mapLat && mapLng){
      setMapPosition({lat: parseInt(mapLat), lng: parseInt(mapLng)});
    }
  },[mapLat, mapLng])

  return (
    <div className={styles.mapContainer } >
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city)=> city?.position && 
            <Marker position={city.position} key={city.id}>
              <Popup>
                <span>{city.emoji}</span><span>{city.cityName}</span>
              </Popup>
            </Marker>
       )}
       <ChangeCenter currentPosition={mapPosition}/>
       <DetectClick/>
      </MapContainer>
    </div>
  )
}

function ChangeCenter(props: {currentPosition:Position}){
  const map = useMap();
  map.setView(props.currentPosition);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();
   useMapEvent(
    'click', (e)=>{
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
  return null;
}


export default Map