import { CSSProperties, FC, ReactNode } from 'react'
import styles from '../../styles/components/common/box.module.css'

interface BoxProps {
    children: ReactNode;
    style?: CSSProperties;
}

const Box: FC<BoxProps> = (props: BoxProps) => {
    const { children, style } = props;

    return (
        <div className={styles.box} style={style}>
            { children }
        </div>
    )
}

export default Box
