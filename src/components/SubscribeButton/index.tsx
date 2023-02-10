import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {

  const session = useSession()

  function handleSubcribe(){
    if(session){
      signIn('github')
      return
    } 
  }
  
  return (
    <button 
      onClick={handleSubcribe}
    className={styles.subscribeButton}>
      Subscribe now
    </button>
  )
}