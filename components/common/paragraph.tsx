import { FC } from 'react'
import styles from '../../styles/components/common/paragraph.module.css'

interface ParagraphTextProps {
    content: string;
    fontSize?: string;
}

const ParagraphText: FC<ParagraphTextProps> = (props: ParagraphTextProps) => {
    const { content, fontSize } = props;
  return (
    <p className={styles.paragraph} style={{ fontSize }}>{ content }</p>
  )
}

export default ParagraphText
