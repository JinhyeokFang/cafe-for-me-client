import { FC, useState } from "react"
import styles from '../../styles/components/common/marker-content.module.css'

interface MarkerContentProps {
    name: string;
    address: string;
    images: string[];
    openHour: string;
    openMinute: string;
    closeHour: string;
    closeMinute: string;
    closeDay: string;
    tags: string[];
}

const MarkerContent: FC<MarkerContentProps> = (props: MarkerContentProps) => {
    const { name, address, images, openHour, openMinute, closeDay, closeHour, closeMinute, tags } = props;
    const [showDetail, setShowDetail] = useState(false);

    const zeroFill = (n: string | number) => {
        if (typeof n == 'string' && n.length < 2 || n < 10)
            return '0' + n;
        return n;
    }

    const onMarkerContentClicked = () => {
        setShowDetail(!showDetail);
    }

    return (
        <div className={styles.container} onClick={onMarkerContentClicked} style={{ zIndex: showDetail ? 2 : 0 }}>
            <h1 className={styles.title}>{ name }</h1>
            <div style={{ display: showDetail ? 'block' : 'none' }} className={styles.detail}>
                <span>주소: { address }</span><br />
                <span>{ zeroFill(openHour) }:{ zeroFill(openMinute) }~{ zeroFill(closeHour) }:{ zeroFill(closeMinute) }</span><br />
                <span>휴뮤: { closeDay }</span><br />
                <span>tags:</span>
                { 
                    tags.map((tag: string) => (
                        <>
                            <span>{ tag }</span> &nbsp;
                        </>
                    ))
                }
                <br />
                { 
                    images.map((image: string) => (
                        <>
                            <img src={image} /><br/>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default MarkerContent;
