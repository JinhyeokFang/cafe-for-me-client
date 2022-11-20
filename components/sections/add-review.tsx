import Box from '../common/box'
import { FC, useState } from 'react'
import Input from '../common/input';
import ParagraphText from '../common/paragraph';
import Button from '../common/button';
import { SelectBox } from '../common/selectbox';
import DetailText from '../common/detail_text';
import createFetcher from '../../swr/fetcher';
import { useAuth } from '../../auth.context';
import Method from '../../swr/fetcher/method';

interface AddReviewProps {
    id: string;
}

export const AddReview: FC<AddReviewProps> = (props: AddReviewProps) => {
    const { id } = props;
    const authStore = useAuth();
    const [value, setValue] = useState('');
    const [rate, setRate] = useState(5);
    const [image, setImage] = useState<FileList>();
    const selectboxItems = ['5', '4', '3', '2', '1'];

    const onValueChanged = (value: string) => {
        setValue(value);
    };

    const clearForm = () => {
        setValue('');
        setRate(5);
        setImage(undefined);
    }

    const onAddButtonClicked = async () => {
        const formData = new FormData();
        if (image === undefined)
            return;
        formData.append('images', image[0]);
        formData.append('comment', value);
        formData.append('rate', rate.toString());
        formData.append('cafeId', id);
        const fetcher = createFetcher({
          data: formData,
          method: Method.Post,
          token: authStore.token as string,
        });
        await fetcher('/api/review');
        clearForm();
        alert('업로드 되었습니다.');
    };

    const setRateFromSelectbox = (index: number) => {
        const selectboxValue = selectboxItems[index];
        const rate = parseInt(selectboxValue, 10);
        setRate(rate);
    }

    const onImagesChanged = (files: FileList | null) => {
        if (files === null)
            return;
        setImage(files);
    }

    return (
        <Box>
            <ParagraphText content='리뷰' />
            <DetailText content='평점'/>
            <SelectBox items={selectboxItems} defaultIndex={0} valueChangeEvent={setRateFromSelectbox} />
            <DetailText content='내용'/>
            <Input type='text' valueUpdateEvent={onValueChanged} placeholder='리뷰에 남길 내용을 입력해주세요.' />
            <DetailText content='사진'/>
            <Input type='file' valueUpdateEvent={() => {}} fileUpdateEvent={onImagesChanged}/>
            <Button content='추가' clickEvent={onAddButtonClicked} style={{ marginTop: '10px', width: '100%' }}/>
        </Box>
    )
}
