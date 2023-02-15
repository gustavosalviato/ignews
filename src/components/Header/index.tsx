import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

import Link from 'next/link'
import { ActiveLink } from '../ActiveLink'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo" />
        <nav>
          <ActiveLink href="/" legacyBehavior activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink href='/posts' legacyBehavior activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>

        </nav>

        <SignInButton />
      </div>
    </header>
  )
}