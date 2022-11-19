import { FC } from 'react'
import styles from '../../styles/components/common/detail.module.css'

interface DetailTextProps {
    content: string;
    fontSize?: string;
    color?: string;
}

const DetailText: FC<DetailTextProps> = (props: DetailTextProps) => {
    const { content, fontSize, color } = props;
  return (
    <span className={styles.detail} style={{ fontSize, color }}>{ content }</span>
  )
}

export default DetailText
