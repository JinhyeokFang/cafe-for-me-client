import Box from '../common/box'
import styles from '../../styles/components/sections/find-near-cafe.module.css'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import { FC, useEffect, useMemo, useState } from 'react'
import Button from '../common/button'
import useCafe, { CafeAPIQueryType } from '../../swr/hooks/cafe.hook'
import MarkerContent from '../common/marker-content'

export const FindNearCafe: FC = () => {
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127,
  });

  const { data, isLoading } = useCafe(CafeAPIQueryType.Location, {
    ...location,
    maxDistance: 1000000
  });

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
            onDragEnd={(map) => setLocation({
              latitude: map.getCenter().getLat(),
              longitude: map.getCenter().getLng(),
            })}
          >
          {
            isLoading ? '' : data ?
              data.cafes.map(cafe => (
                <CustomOverlayMap position={{
                  lat: cafe.location.coordinates[1],
                  lng: cafe.location.coordinates[0],
                }} key={cafe._id}>
                  <MarkerContent 
                    name={cafe.name} 
                    address={cafe.address} 
                    images={cafe.images}
                    openHour={cafe.openHour}
                    openMinute={cafe.openMinute}
                    closeHour={cafe.closeHour}
                    closeMinute={cafe.closeMinute}
                    closeDay={cafe.closeDay}
                    tags={cafe.tags}
                  />
                </CustomOverlayMap>
              ))
            : ''
          }
          </Map>
          <div style={{ display: 'flex' }}>
            <Button content='원하는 위치로 이동하기' width='50%' />
            <Button content='현재 위치로 이동하기' width='50%' clickEvent={moveToCurrentLocation}/>
          </div>
      </Box>
  )
}
