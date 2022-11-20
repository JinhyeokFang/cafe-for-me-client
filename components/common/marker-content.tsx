import { useRouter } from "next/router";
import { FC, useState } from "react"
import styles from '../../styles/components/common/marker-content.module.css'
import Button from "./button";

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
    id: string;
}

const MarkerContent: FC<MarkerContentProps> = (props: MarkerContentProps) => {
    const { name, address, images, openHour, openMinute, closeDay, closeHour, closeMinute, tags, id } = props;
    const [showDetail, setShowDetail] = useState(false);
    const router = useRouter();

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
                            <img src={image} style={{maxWidth:'200px'}} /><br/>
                        </>
                    ))
                }
                <Button 
                    content='자세히 보기'
                    style={{width:'100%', height: '20px', fontSize: '12px'}} 
                    clickEvent={() => router.push(`/cafes/find/${id}`)}
                />
            </div>
        </div>
    )
}

export default MarkerContent;
