import { CSSProperties, FC } from 'react'
import styles from '../../styles/components/common/button.module.css'

interface ButtonProp {
    content: string;
    clickEvent?: (e: React.MouseEvent<HTMLElement>) => void;
    width?: string;
    height?: string;
    style?: CSSProperties;
}

const Button: FC<ButtonProp> = (props: ButtonProp) => {
  const { style, content, clickEvent, width, height } = props;

  return (
    <button 
        className={styles.button}
        onClick={clickEvent}
        style={{ width, height, cursor:'pointer',...style }}
    >
        { content }
    </button>
  )
}

export default Button
