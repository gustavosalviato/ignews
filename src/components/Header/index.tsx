import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

export function Header() {

  const router = useRouter()

  const isHomeActive = router.pathname === '/'
  const isPostActive = router.pathname === '/posts'

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo" />
        <nav>
          <a href='/' className={isHomeActive ? styles.active : ''}>Home</a>
          <a href='/posts' className={isPostActive ? styles.active : ''}>Posts</a>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}