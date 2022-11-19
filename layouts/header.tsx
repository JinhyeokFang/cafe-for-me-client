import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth.context';
import styles from '../styles/layout/header.module.css'

const Header: FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const router = useRouter();
    const { isLogined, setToken, clearToken } = useAuth();
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
            <div className={styles.logo_container} onClick={() => router.push('/')} style={{cursor: 'pointer'}}>
                <div className={styles.logo}>
                    Cafe4Me
                </div>
            </div>
            <nav className={styles.navigation_container}>
                <ul className={styles.navigation}>
                    <li className={styles.navigation_item} style={{cursor: 'pointer'}} onClick={() => router.push('/')}>카페 찾기</li>
                    {
                        isLogined() ?
                        <>
                            <li className={styles.navigation_item} style={{cursor: 'pointer'}} onClick={() => router.push('/cafes/add')}>카페 추가</li>
                            <li className={styles.navigation_item} style={{cursor: 'pointer'}} onClick={() => {
                                router.push('/')
                                clearToken();
                            }}>로그아웃</li>
                        </> :
                        <>
                            <li className={styles.navigation_item} style={{cursor: 'pointer'}} onClick={() => {
                                router.push('/login');
                            }}>로그인</li>
                        </>
                    }
                </ul>
            </nav>
        </div>
        <div className={styles.spacer} />
    </header>
  )
}

export default Header
