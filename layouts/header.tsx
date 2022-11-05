import { FC, useEffect, useMemo, useState } from 'react'
import styles from '../styles/layout/header.module.css'

const Header: FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isTopOfPage = useMemo(() => {
        return scrollPosition === 0;
    }, [scrollPosition]);

  return (
    <header>
        <div className={styles.container + (isTopOfPage ? ' ' + styles.container_top : '')}>
            <div className={styles.logo_container}>
                <div className={styles.logo}>
                    로고 대충 logo
                </div>
            </div>
            <nav className={styles.navigation_container}>
                <ul className={styles.navigation}>
                    {/* <li className={styles.navigation_item}>Site 1</li>
                    <li className={styles.navigation_item}>Site 2</li>
                    <li className={styles.navigation_item}>Site 3</li> */}
                </ul>
            </nav>
        </div>
        <div className={styles.spacer} />
    </header>
  )
}

export default Header