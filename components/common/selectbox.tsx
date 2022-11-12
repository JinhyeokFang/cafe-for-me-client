import { FC, useState } from 'react'
import styles from '../../styles/components/common/selectbox.module.css'

interface SelectBoxProps {
    items: string[];
    defaultIndex: number;
    valueChangeEvent: (index: number) => void;
}

export const SelectBox: FC<SelectBoxProps> = (props: SelectBoxProps) => {
    const { items, defaultIndex, valueChangeEvent } = props;
    const [value, setValue] = useState(items[defaultIndex]);
    const [visible, setVisible] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.valueBox}>
                <div className={styles.value}>
                    { value }
                </div>
                <div className={styles.detailButton} onClick={() => setVisible(!visible)}>
                    v
                </div>
            </div>
            {
                visible &&
                <div className={styles.items}>
                    {
                        items.map((item, index) => (
                            <div className={styles.item} key={index} onClick={() => { setVisible(false); setValue(item); valueChangeEvent(index); }}>
                                {item}
                            </div>
                        ))        
                    }
                </div>      
            }
        </div>
    )
}
