import { FC } from 'react'
import { Map } from 'react-kakao-maps-sdk';
import Box from '../common/box'
import Button from '../common/button';
import DetailText from '../common/detail_text';
import Input from '../common/input';
import TitleText from '../common/title_text'

export const AddCafe: FC = () => {
  return (
    <Box>
      <TitleText content='카페 추가' />
      <DetailText content='카페 이름' />
      <Input valueUpdateEvent={() => {}} type='text' placeholder='이름을 입력하세요.' />
      <DetailText content='카페 주소' />
      <Input valueUpdateEvent={() => {}} type='text' placeholder='주소를 입력하세요.' />
      <Map
        center={{
          lat: 37,
          lng: 127,
        }}
        style={{ width: "100%", height: "360px" }}
        draggable={false}
      ></Map>
      <DetailText content='영업 시간' />
      <DetailText content='휴무일' />
      <Input valueUpdateEvent={() => {}} type='text' placeholder='주소를 입력하세요.' />
      <Button content='추가' width='100%'/>
    </Box>
  );
}
