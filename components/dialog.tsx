import { CSSProperties, FC, forwardRef, ForwardRefRenderFunction, MutableRefObject, ReactNode, useImperativeHandle, useState } from 'react'
import styles from '../styles/components/dialog.module.css'

interface DialogProps {
    children: ReactNode;
    style?: CSSProperties;
}

export interface DialogRef {
    show: () => void;
}

const Dialog: FC<DialogProps> = (props: DialogProps, ref: MutableRefObject<DialogRef>) => {
    const { children, style } = props;
    const [visibility, setVisibility] = useState(true);

    const onCloseButtonClicked = () => {
        setVisibility(false);
    }

    useImperativeHandle(ref, () => ({
        show() {
          setVisibility(true);
        }
    }));

    return (
        <div className={styles.container} style={{...style, opacity: visibility ? 1 : 0, top: visibility ? '0' : '-100vh'}} >
            <button 
                className={styles.closeButton} 
                style={{ width: '30px', position: 'absolute', right: '20px', top: '20px' }}
                onClick={onCloseButtonClicked}
            >
                X
            </button>
            { children }
        </div>
    )
}

export default forwardRef(Dialog as ForwardRefRenderFunction<DialogRef, DialogProps>)
