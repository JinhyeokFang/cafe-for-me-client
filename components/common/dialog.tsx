import { CSSProperties, FC, forwardRef, ForwardRefRenderFunction, MutableRefObject, ReactNode, useImperativeHandle, useState } from 'react'
import styles from '../../styles/components/common/dialog.module.css'

interface DialogProps {
    children: ReactNode;
    style?: CSSProperties;
    closedEvent: () => void;
}

export interface DialogRef {
    show: () => void;
    close: () => void;
}

const Dialog: FC<DialogProps> = (props: DialogProps, ref: MutableRefObject<DialogRef>) => {
    const { children, style, closedEvent } = props;
    const [ visibility, setVisibility ] = useState(false);

    const onCloseButtonClicked = () => {
        setVisibility(false);
        closedEvent();
    }

    useImperativeHandle(ref, () => ({
        show() {
          setVisibility(true);
        },
        close() {
          setVisibility(false);
        }
    }));

    return (
        <div className={styles.container} style={{...style, opacity: visibility ? 1 : 0, visibility: (visibility ? 'visible' : 'hidden')}} >
            <button 
                className={styles.closeButton} 
                style={{ width: '30px', position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}
                onClick={onCloseButtonClicked}
            >
                X
            </button>
            { children }
        </div>
    )
}

export default forwardRef(Dialog as ForwardRefRenderFunction<DialogRef, DialogProps>)
