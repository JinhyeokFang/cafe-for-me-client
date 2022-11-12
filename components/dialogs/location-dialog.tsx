import { CSSProperties, FC, forwardRef, ForwardRefRenderFunction, MutableRefObject, useImperativeHandle, useRef, useState } from 'react'
import styles from '../../styles/components/common/dialog.module.css'
import useLocation from '../../swr/hooks/location.hook';
import Box from '../common/box';
import Button from '../common/button';
import DetailText from '../common/detail_text';
import Dialog, { DialogRef } from '../common/dialog';
import Input from '../common/input';
import ParagraphText from '../common/paragraph';
import TitleText from '../common/title_text';

interface LocationDialogProps {
    closedEvent: (latitude: string, longitude: string) => void;
}

export interface LocationDialogRef {
    show: () => void;
}

const LocationDialog: FC<LocationDialogProps> = (props: LocationDialogProps, ref: MutableRefObject<LocationDialogRef>) => {
    const { closedEvent } = props;
    const dialogRef: MutableRefObject<DialogRef> = useRef<DialogRef>() as MutableRefObject<DialogRef>;
    const [query, setQuery] = useState('');
    const { data, isLoading } = useLocation(query);

    useImperativeHandle(ref, () => ({
        show() {
          dialogRef.current?.show();
        }
    }));
    
    const closeAndPassLocation = (latitude: string, longitude: string) => {
        closedEvent(latitude, longitude);
        dialogRef.current.close();
    }

    return (
        <Dialog style={{width:"50%"}} ref={dialogRef} closedEvent={() => {}}>
           <TitleText content='원하는 위치 찾아서 이동'/>
           <ParagraphText content='원하는 위치의 주소를 입력하세요' />
           <DetailText content='주소' />
           <Input type='text' placeholder='주소' valueUpdateEvent={value => { setQuery(value) }}/>
           { isLoading ? '' : data ? data.location.filter((_, index) => index < 5).map(location => (
            <div key={location._id} onClick={() => closeAndPassLocation(location.latitude, location.longitude)}>
                <Box style={{width: '100%', cursor: 'pointer'}}>
                    <ParagraphText content={location.address} />
                    <DetailText content={location.name} />
                </Box>
            </div>
           )) : ''}
        </Dialog>
    )
}

export default forwardRef(LocationDialog as ForwardRefRenderFunction<LocationDialogRef, LocationDialogProps>)
