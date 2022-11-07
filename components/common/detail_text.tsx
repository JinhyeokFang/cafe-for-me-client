import { FC } from 'react'
import styles from '../../styles/components/common/detail.module.css'

interface DetailTextProps {
    content: string;
    fontSize?: string;
}

const DetailText: FC<DetailTextProps> = (props: DetailTextProps) => {
    const { content, fontSize } = props;
  return (
    <span className={styles.detail} style={{ fontSize }}>{ content }</span>
  )
}

export default DetailText
