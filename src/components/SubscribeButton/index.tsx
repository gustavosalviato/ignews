import { api } from '@/services/axios';
import { getStripeJs } from '@/services/stripe-js';
import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {

  const session = useSession()

  async function handleSubcribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({ sessionId })

    } catch (err) {
      alert(err.message)
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