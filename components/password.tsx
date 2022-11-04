import { relative } from 'path';
import { FC, useState } from 'react'
import { RiCloseLine } from "react-icons/ri";
import styles from '../styles/components/password.module.css'
import Button from './button';
import DetailText from './detail_text';
import Input from './input';
import ParagraphText from './paragraph';

interface PasswordProp {
    password: string;
    description: string;
    onCloseButtonClicked: () => void;
}

const Password: FC<PasswordProp> = (props: PasswordProp) => {
    const { password, description, onCloseButtonClicked } = props;

    const [errorMessage, setErrorMessage] = useState('!!');
    const [inputValue, setInputValue] = useState('');

    const onInputValueChanged = () => {

    }

    const onButtonClick = () => {

    }

    return (
        <div className={styles.container}>
            <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between'
            }}>
                <RiCloseLine onClick={onCloseButtonClicked}/>
                <DetailText content='설명' />
            </div>
            <ParagraphText content={description}/>
            <Input type='password' valueUpdateEvent={onInputValueChanged}/>
            <div style={{ color: '#906200', opacity: (errorMessage !== '' ? 1 : 0) }}>
                <DetailText content={errorMessage} />
            </div>
            <div style={{
                marginTop: '15px'
            }}>
                <Button content='로그인 시도' width='100%' clickEvent={onButtonClick}/>
            </div>
        </div>
    )
}

export default Password
