import Box from '../common/box'
import styles from '../../styles/components/sections/find-near-cafe.module.css'
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk'
import { FC, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import Button from '../common/button'
import useCafe, { CafeAPIQueryType } from '../../swr/hooks/cafe.hook'
import MarkerContent from '../common/marker-content'
import LocationDialog, { LocationDialogRef } from '../dialogs/location-dialog'
import TitleText from '../common/title_text'
import TagFilter from '../common/tag_filter'

export const FindNearCafe: FC = () => {
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: 127,
  });
  const [tags, setTags] = useState<string[]>([]);

  const { data, isLoading } = useCafe(CafeAPIQueryType.Location, {
    ...location,
    maxDistance: 1000000
  });

  const dialogRef: MutableRefObject<LocationDialogRef> = useRef<LocationDialogRef>() as MutableRefObject<LocationDialogRef>;

  const moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    });
  }

  const showLocationDialog = () => {
    if (dialogRef.current != undefined)
      dialogRef.current.show();
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

  const cafeTagFilter = (cafe: Record<string, unknown>, index: number) => {
    if (tags.length === 0)
      return true;
    const cafeTags: string[] = cafe.tags as string[];
    console.log(cafeTags.filter((value: string) => tags.includes(value)))
    return cafeTags.filter((value: string) => tags.includes(value)).length == tags.length;
  };

  return (
      <Box>
          <LocationDialog ref={dialogRef} closedEvent={(latitude, longitude) => {setLocation({latitude: parseFloat(latitude), longitude: parseFloat(longitude)})}} />
          <TitleText content='지도에서 카페 찾기' />
          <Map
            center={center}
            style={{ width: "100%", height: "360px" }}
            onDragEnd={(map) => setLocation({
              latitude: map.getCenter().getLat(),
              longitude: map.getCenter().getLng(),
            })}
          >
          {
            isLoading || data &&
              data.cafes.filter(cafeTagFilter).map(cafe => (
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
                    id={cafe._id}
                  />
                </CustomOverlayMap>
              ))
          }
          </Map>
          <TagFilter tags={['편안한','가성비있는','고급 원두','조용한']} valueUpdateEvent={setTags}/>
          <div style={{ display: 'flex', justifyContent:'space-between', marginTop: '10px' }}>
            <Button content='원하는 위치로 이동' width='49.5%' clickEvent={showLocationDialog} />
            <Button content='현재 위치로 이동' width='49.5%' clickEvent={moveToCurrentLocation}/>
          </div>
      </Box>
  )
}
