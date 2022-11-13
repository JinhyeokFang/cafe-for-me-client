import Box from '../common/box'
import { FC } from 'react'
import useReview, { ReviewAPIQueryType } from '../../swr/hooks/review.hook';
import ParagraphText from '../common/paragraph';
import useUser from '../../swr/hooks/user.hook';
import DetailText from '../common/detail_text';

interface FindReviewProps {
    id: string;
}

export const FindReview: FC<FindReviewProps> = (props: FindReviewProps) => {
    const { id } = props;
    const { data } = useReview(ReviewAPIQueryType.CafeId, id as string);
    const users: string[] = [];

    if (data) {
        for (const review of data.reviews) {
            const user = useUser(review.uploaderId).data;
            if (user && user.nickname)
                users.push(user.nickname);
            else
                users.push('loading...');
        }
    }

    return (
        <Box>
            {
                data ? data.reviews[0] ? <>
                    <ParagraphText content={`별점: ${data.reviews[0].rate}`} />
                    <ParagraphText content={data.reviews[0].comment} />
                    <DetailText content={`Uploaded by ${users[0]}`} />
                    <div style={{ display: 'flex' }}>
                        {
                            data.reviews[0].images.map(image => (
                                <img src={image} style={{ display: 'block', width: '200px', maxHeight: '200px'}}/>
                            ))  
                        }
                    </div>
                </> : '' : ''
            }
        </Box>
    )
}
