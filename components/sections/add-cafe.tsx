import { useRouter } from 'next/router';
import { FC, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk';
import { useAuth } from '../../auth.context';
import createFetcher from '../../swr/fetcher';
import Method from '../../swr/fetcher/method';
import useLocation from '../../swr/hooks/location.hook';
import Box from '../common/box'
import Button from '../common/button';
import DetailText from '../common/detail_text';
import Input from '../common/input';
import TagFilter from '../common/tag_filter';
import TitleText from '../common/title_text'

export const AddCafe: FC = () => {
  const authStore = useAuth();
  const router = useRouter();
  const [image, setImage] = useState<FileList | null>();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [openHour, setOpenHour] = useState('');
  const [openMinute, setOpenMinute] = useState('');
  const [closeHour, setCloseHour] = useState('');
  const [closeMinute, setCloseMinute] = useState('');
  const [closeDay, setCloseDay] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const location = useLocation(address);

  const submitButtonClicked = async () => {
    const formData = new FormData();
    if (image == undefined)
        return;
    formData.append('images', image[0]);
    formData.append('openHour', openHour);
    formData.append('openMinute', openMinute);
    formData.append('closeHour', closeHour);
    formData.append('closeMinute', closeMinute);
    formData.append('closeDay', closeDay);
    formData.append('tags', tags.toString());
    formData.append('name', title);
    formData.append('latitude', location.data.location[0].latitude);
    formData.append('longitude', location.data.location[0].longitude);
    const fetcher = createFetcher({
      data: formData,
      method: Method.Post,
      token: authStore.token as string,
    });
    const data = await fetcher(`/api/cafe`);
    alert('업로드 되었습니다.');
    router.push('/');
  }

  const onImagesChanged = (files: FileList | null) => {
      setImage(files);
  }

  return (
    <Box>
      <TitleText content='카페 추가' />
      <DetailText content='카페 이름' />
      <Input valueUpdateEvent={v => setTitle(v)} type='text' placeholder='이름을 입력하세요.' />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '50%' }}>
          <DetailText content='카페 주소' />
          <Input valueUpdateEvent={v => setAddress(v)} type='text' placeholder='주소를 입력하세요.' />
          <Map
            center={{
              lat: location.data && location.data.location[0] ? parseFloat(location.data.location[0].latitude) : 37,
              lng: location.data && location.data.location[0] ? parseFloat(location.data.location[0].longitude) : 127,
            }}
            style={{ width: "100%", height: "360px" }}
            draggable={false}
          ></Map>
        </div>
        <div style={{ width: '45%' }}>
          <DetailText content='휴무일' />
          <Input valueUpdateEvent={v => setCloseDay(v)} type='text' placeholder='휴무일을 입력하세요. 예) 매주 일요일 휴무' />
          <DetailText content='여는 시간' />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input valueUpdateEvent={v => setOpenHour(v)} type='number' placeholder='0~23'/>
            시
            <Input valueUpdateEvent={v => setOpenMinute(v)} type='number' placeholder='0~59'/>
            분
          </div>
          <DetailText content='닫는 시간' />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input valueUpdateEvent={v => setCloseHour(v)} type='number' placeholder='0~23'/>
            시
            <Input valueUpdateEvent={v => setCloseMinute(v)} type='number' placeholder='0~59'/>
            분
          </div>

          <DetailText content='사진'/>
          <Input type='file' valueUpdateEvent={() => {}} fileUpdateEvent={onImagesChanged}/>
        </div>
      </div>
      <DetailText content='태그 추가' />
      <TagFilter tags={['편안한','가성비있는','고급 원두','조용한']} valueUpdateEvent={v => setTags(v)}/>
      <Button content='카페 추가' width='100%' clickEvent={submitButtonClicked}/>
      <DetailText content='빈 칸을 채워주십시오.' color='red'/>
    </Box>
  );
}
