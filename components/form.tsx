import { FC } from 'react'
import Box from './box'
import Button from './button'
import DetailText from './detail_text'
import Input from './input'
import ParagraphText from './paragraph'
import TitleText from './title_text'

const Form: FC = () => {
  const blank = () => {}

  return (
    <Box>
        <TitleText content="폼" />
        <DetailText content="아이디"/>
        <Input type='text' valueUpdateEvent={blank} />
        <DetailText content="비밀번호"/>
        <Input type='password' valueUpdateEvent={blank} />
        <div style={{
          marginTop: '15px'
        }}>
          <Button 
            content="로그인" 
            clickEvent={blank}
            width="100%"
          />
        </div>
        <ParagraphText content="폼에 대한 설명입니다." />
    </Box>
  )
}

export default Form
