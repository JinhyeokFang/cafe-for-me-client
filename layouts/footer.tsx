import { FC } from 'react'
import styles from '../styles/layout/footer.module.css'

const Footer: FC = () => {
  return (
    <footer className={styles.container}>
<div>
Made By Jin-hyeok Bang, 2022<br /><br />
Server Code: https://github.com/JinhyeokFang/cafe-for-me-server<br />
Client Code: https://github.com/JinhyeokFang/cafe-for-me-client<br />
</div>
    </footer>
  )
}

export default Footer
