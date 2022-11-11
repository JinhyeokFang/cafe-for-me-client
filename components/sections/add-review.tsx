import Box from '../common/box'
import { FC, useState } from 'react'
import Input from '../common/input';
import ParagraphText from '../common/paragraph';
import Button from '../common/button';

interface AddReviewProps {
    id: string;
}

export const AddReview: FC<AddReviewProps> = (props: AddReviewProps) => {
    const { id } = props;
    const [value, setValue] = useState('');

    const onValueChanged = (value: string) => {
        setValue(value);
    };

    const onAddButtonClicked = () => {

    };

    return (
        <Box>
            <ParagraphText content='리뷰' />
            <Input type='text' valueUpdateEvent={onValueChanged} placeholder='리뷰에 남길 내용을 입력해주세요.' />
            <Button content='추가' clickEvent={onAddButtonClicked} style={{ marginTop: '10px', width: '100%' }}/>
        </Box>
    )
}
