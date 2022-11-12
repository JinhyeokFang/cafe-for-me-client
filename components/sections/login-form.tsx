import { FC } from 'react'
import Box from '../common/box'
import { useAuth } from '../../auth.context'
import TitleText from '../common/title_text';
import DetailText from '../common/detail_text';
import Input from '../common/input';
import Button from '../common/button';

export const LoginForm: FC = () => {
  const {
    token,
    setToken,
    isLogined,
  } = useAuth();

  // if (isLogined)
  //   alert('wow');

  return (
      <Box>
        <TitleText content='Login' />
        <DetailText content='아이디' />
        <Input type='text' valueUpdateEvent={() => {}} placeholder='아이디' />
        <DetailText content='비밀번호' />
        <Input type='text' valueUpdateEvent={() => {}} placeholder='비밀번호' />
        <Button content='로그인' style={{ margin: '20px auto 0 auto', minWidth: '50%' }} />
      </Box>
  )
}
