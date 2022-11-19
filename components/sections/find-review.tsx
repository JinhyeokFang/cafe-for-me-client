import Box from '../common/box'
import { FC } from 'react'
import useReview, { ReviewAPIQueryType } from '../../swr/hooks/review.hook';
import ParagraphText from '../common/paragraph';
import useUser from '../../swr/hooks/user.hook';
import DetailText from '../common/detail_text';

interface FindReviewProps {
    id: string;
}

const UploaderText: FC<{ uploaderId: string }> = ({ uploaderId }) => {
    const { data } = useUser(uploaderId);
    return <>
        {
            data ? <DetailText content={`Uploaded by ${data.nickname}`} /> :
            <DetailText content='loading...' />
        }
    </>;
}

const Review: FC<{ 
    rate: string, 
    comment: string, 
    uploaderId: string, 
    images: string[]
}> = ({ rate, comment, uploaderId, images }) => {
    return (
        <>
            <ParagraphText content={`별점: ${rate}`} />
            <ParagraphText content={comment} />
            <UploaderText uploaderId={uploaderId}/>
            <div style={{ display: 'flex' }}>
                {
                    images.map((image: string, index: number) => (
                        <img src={image} key={index} style={{ display: 'block', width: '200px', maxHeight: '200px'}}/>
                    ))  
                }
            </div>
        </>
    )
}

export const FindReview: FC<FindReviewProps> = (props: FindReviewProps) => {
    const { id } = props;
    const { data } = useReview(ReviewAPIQueryType.CafeId, id as string);
    return (
        <Box>
            {
                data && data.reviews && data.reviews.map((review: Record<string, unknown>, index: number) => (
                    <Review 
                        rate={review.rate as string} 
                        comment={review.comment as string}
                        uploaderId={review.uploaderId as string}
                        images={review.images as string[]}
                        key={index}
                    />
                ))
            }
        </Box>
    )
}
