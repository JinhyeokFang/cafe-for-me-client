import { FC, useState } from 'react'
import Box from '../common/box'
import { useAuth } from '../../auth.context'
import TitleText from '../common/title_text';
import DetailText from '../common/detail_text';
import Input from '../common/input';
import Button from '../common/button';
import createFetcher from '../../swr/fetcher';
import Method from '../../swr/fetcher/method';
import { useRouter } from 'next/router';

export const LoginForm: FC = () => {
  const {
    setToken,
    isLogined,
  } = useAuth();
  const router = useRouter(); 
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');

  const loginButtonClicked = async () => {
    const fetcher = createFetcher({
      method: Method.Post,
      data: {
        name: idValue,
        password: passwordValue,
      }
    });
    try {
      const result: {token: string} = await fetcher('https://server.jinhy.uk/api/auth/login') as {token: string};
      setToken(result.token);
      router.push('/');    
    } catch (error) {
      alert('error');
    }
  }

  const registerButtonClicked = async () => {
    const fetcher = createFetcher({
      method: Method.Post,
      data: {
        name: idValue,
        password: passwordValue,
        nickname: nicknameValue,
      }
    });
    try {
      await fetcher('https://server.jinhy.uk/api/auth/register');
      alert('회원가입되었습니다.');
    } catch (error) {
      alert('error');
    }
  }

  const keyPressed = (key: string) => {
    if (key === 'Enter') {
      loginButtonClicked();
    }
  }

  const nicknameKeyPressed = (key: string) => {
    if (key === 'Enter') {
      registerButtonClicked();
    }
  }

  return (
      <Box>
        <TitleText content='Login' />
        <DetailText content='아이디' />
        <Input type='text' valueUpdateEvent={v => setIdValue(v)} keyPressedEvent={keyPressed} placeholder='아이디' />
        <DetailText content='비밀번호' />
        <Input type='password' valueUpdateEvent={v => setPasswordValue(v)} keyPressedEvent={keyPressed} placeholder='비밀번호' />
        <Button content='로그인' style={{ margin: '20px auto', minWidth: '50%' }} clickEvent={loginButtonClicked} />
        <DetailText content='닉네임' />
        <Input type='text' valueUpdateEvent={v => setNicknameValue(v)} keyPressedEvent={nicknameKeyPressed} placeholder='닉네임' />
        <Button content='닉네임 입력하고 회원가입' style={{ margin: '20px auto 0 auto', minWidth: '50%' }} clickEvent={registerButtonClicked} />
      </Box>
  )
}
