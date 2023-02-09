import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
export function SignInButton() {

  const userIsLoggedIn = 1 > 0
  return userIsLoggedIn ? (
    <button
      type="button"
      className={styles.SignInButton}
    >
      <FaGithub color='#04D361'/>
      Gustavo Salviato
      <FiX  color='#737380'/>
    </button>
  ) : (
    <button
      type="button"
      className={styles.SignInButton}
    >
      <FaGithub color='#eba417' />
      Sign in with GitHub
    </button>
  )
}