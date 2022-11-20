import Box from '../common/box'
import { FC, useState } from 'react'
import TitleText from '../common/title_text'
import Input from '../common/input'
import useCafe, { CafeAPIQueryType } from '../../swr/hooks/cafe.hook'
import ParagraphText from '../common/paragraph'
import DetailText from '../common/detail_text'
import { useRouter } from 'next/router'

export const FindCafeByName: FC = () => {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useCafe(CafeAPIQueryType.CafeName, query || '카페');
  const router = useRouter();

  return (
      <Box>
        <TitleText content='카페 이름 검색' />
        <Input type='text' valueUpdateEvent={value => setQuery(value)} placeholder='카페 이름을 입력하세요'/>
        { data && data.cafes.map(cafe => (
         <div key={cafe._id} onClick={() => { router.push(`/cafes/find/${cafe._id}`) }}>
             <Box style={{width: '100%', cursor: 'pointer'}}>
                 <ParagraphText content={cafe.name} />
                 <DetailText content={cafe.address} />
             </Box>
         </div>
        ))}
      </Box>
  )
}
