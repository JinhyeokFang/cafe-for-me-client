import { FC } from 'react'
import styles from '../../styles/components/common/title.module.css'

interface TitleTextProps {
    content: string;
    fontSize?: string;
    textAlign?: "center" | "left";
}

const TitleText: FC<TitleTextProps> = (props: TitleTextProps) => {
    const { content, fontSize, textAlign } = props;
  return (
    <h2 className={styles.title} style={{ fontSize, textAlign }}>{ content }</h2>
  )
}

export default TitleText
