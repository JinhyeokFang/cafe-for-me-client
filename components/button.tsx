import { FC } from 'react'
import styles from '../styles/components/button.module.css'

interface ButtonProp {
    content: string;
    clickEvent?: (e: React.MouseEvent<HTMLElement>) => void;
    width?: string;
    height?: string;
}

const Button: FC<ButtonProp> = (props: ButtonProp) => {
  const { content, clickEvent, width, height } = props;

  return (
    <button 
        className={styles.button}
        onClick={clickEvent}
        style={{ width, height }}
    >
        { content }
    </button>
  )
}

export default Button
