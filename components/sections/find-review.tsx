import Box from '../common/box'
import { FC } from 'react'
import useReview, { ReviewAPIQueryType } from '../../swr/hooks/review.hook';
import ParagraphText from '../common/paragraph';

interface FindReviewProps {
    id: string;
}

export const FindReview: FC<FindReviewProps> = (props: FindReviewProps) => {
    const { id } = props;
    const { data, isLoading } = useReview(ReviewAPIQueryType.CafeId, id as string);

    return (
        <Box>
            {
                data ? data.reviews[0] ? <>
                    <ParagraphText content={`별점: ${data.reviews[0].rate}`} />
                    <ParagraphText content={data.reviews[0].comment} />
                    <div style={{ display: 'flex' }}>
                        {
                            data.reviews[0].images.map(image => (
                            <img src={image} style={{ display: 'block', width: '200px', maxHeight: '200px'}}/>
                            ))  
                        }
                    </div>
                    {
                        data ? JSON.stringify(data.reviews[0].uploaderId) : ''
                    }
                </> : '' : ''
            }
        </Box>
    )
}
