import React, { FC, forwardRef, ForwardRefRenderFunction, MutableRefObject, Ref, useImperativeHandle, useRef, useState } from 'react'
import styles from '../styles/components/input.module.css'

interface InputProps {
    type: string;
    valueUpdateEvent: (value: string) => void;
    placeholder?: string;
    defaultValue?: string;
    width?: string;
    height?: string;
    ref: MutableRefObject<InputRef>
}

export interface InputRef {
    clear: () => void;
}

const Input: FC<InputProps> = (props: InputProps, ref: MutableRefObject<InputRef>) => {
    const { type, valueUpdateEvent, defaultValue, width, height, placeholder } = props;
    const [value, setValue] = useState(defaultValue || '');

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        valueUpdateEvent(e.target.value);
    }

    useImperativeHandle(ref, () => ({
        clear() {
          setValue('');
        }
    }));

    return (
        <input 
            type={type} 
            className={styles.input} 
            value={value} 
            onChange={updateValue}
            style={{ width, height }}
            placeholder={placeholder} 
        />
    )
}

export default forwardRef(Input as ForwardRefRenderFunction<InputRef, InputProps>)
