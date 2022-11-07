import Box from '../common/box'
import styles from '../styles/sections/find-near-cafe.module.css'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { FC, useEffect, useMemo, useState } from 'react'
import Button from '../common/button'
import useLocation from '../../swr/hooks/location.hook'

export const FindNearCafe: FC = () => {
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127,
  });
  const [query, setQuery] = useState('');
  const { data, isLoading } = useLocation(query);

  const moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    });
  }

  useEffect(() => {
    moveToCurrentLocation();
  }, []);

  const center = useMemo(() => {
    return {
      lat: location.latitude,
      lng: location.longitude,
    }
  }, [location]);

  return (
      <Box>
          <Map
            center={center}
            style={{ width: "100%", height: "360px" }}
          >
            <MapMarker position={center}>
              <div style={{ color: "#000", textAlign: 'center' }}>a</div>
            </MapMarker>
          </Map>
          <Button content='원하는 위치로 이동하기' width='100%' />
          <Button content='현재 위치로 이동하기' width='100%' clickEvent={moveToCurrentLocation}/>
          <Button content='주변 카페 검색하기' width='100%' />
      </Box>
  )
}
