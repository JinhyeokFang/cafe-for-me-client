import { FC, MutableRefObject, useRef, useState } from 'react'
import Box from './box'
import Button from './button'
import DetailText from './detail_text'
import Input, { InputRef } from './input'
import Password from './password'
import TitleText from './title_text'

interface Item {
  password: string;
  description: string;
}

const PasswordList: FC = () => {
  const [list, setList] = useState<Item[]>([]);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [descriptionInputValue, setDescriptionInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const passwordInputRef: MutableRefObject<InputRef> = useRef<InputRef>() as MutableRefObject<InputRef>;
  const descriptionInputRef: MutableRefObject<InputRef> = useRef<InputRef>() as MutableRefObject<InputRef>;

  const clearForm = () => {
    setErrorMessage('');
    setPasswordInputValue('');
    setDescriptionInputValue('');
    if (passwordInputRef.current !== undefined)
      passwordInputRef.current.clear();
    if (descriptionInputRef.current !== undefined)
      descriptionInputRef.current.clear();
  }

  const clearAll = () => {
    clearForm();
    setList([]);
  }

  const onAddButtonClicked = () => {
    if (passwordInputValue === '' || descriptionInputValue === '')
    {
      setErrorMessage('모든 입력칸에 내용을 입력해주십시오.');
      return;
    }
    setList([{
      password: passwordInputValue, 
      description: descriptionInputValue
    }, ...list, ]);
    clearForm();
  }

  const onPasswordItemCloseButtonClicked = (index: number) => {
    return () => {
      setList(list.filter((_, i) => i !== index));
    }
  }

  return (
    <Box>
        <TitleText content="비밀번호 리스트" textAlign="left" />
        <DetailText content="비밀번호" />
        <Input type="password" valueUpdateEvent={setPasswordInputValue} ref={passwordInputRef}/>
        <DetailText content="설명" />
        <Input type="text" valueUpdateEvent={setDescriptionInputValue} ref={descriptionInputRef}/>
        <div style={{ color: '#6f4e37', opacity: (errorMessage !== '' ? 1 : 0) }}>
          <DetailText content={errorMessage} />
        </div>
        <div style={{
          marginTop: '15px',
          display: 'flex'
        }}>
          <Button content="추가" width="100%" clickEvent={onAddButtonClicked}/>
          <div style={{
            marginLeft: '15px',
            width: "100%"
          }}>
            <Button content="목록 초기화" width="100%" clickEvent={clearAll}/>
          </div>
        </div>
        {
          list.map(({password, description}, index) => (
              <Password password={password} description={description} key={index} onCloseButtonClicked={onPasswordItemCloseButtonClicked(index)}/>
          ))
        }
    </Box>
  )
}

export default PasswordList
