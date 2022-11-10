import styles from '../styles/sections/cafe.module.css'
import { FC } from 'react'
import Box from '../common/box'
import { useAuth } from '../../auth.context'

export const LoginForm: FC = () => {
  const {
    token,
    setToken,
    isLogined,
  } = useAuth();

  // if (isLogined)
  //   alert('wow');

  return (
      <Box>
      </Box>
  )
}
