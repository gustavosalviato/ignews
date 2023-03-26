import { api } from "@/services/axios";
import { getStripeJs } from "@/services/stripe-js";
import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export function SubscribeButton() {
  const session = useSession();
  const router = useRouter();

  async function handleSubcribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.data?.userActiveSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <button onClick={handleSubcribe} className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
