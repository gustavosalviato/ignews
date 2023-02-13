import { faunadb } from "@/services/fauna";
import { stripe } from "@/services/stripe";
import { query as q } from 'faunadb'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction: boolean
) {

  const userRef = await faunadb.query(

    q.Get(
      q.Match(
        q.Index('user_by_stripe_customer_id'),
        customerId
      )
    )

  )
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  if (createAction) {
    await faunadb.query(
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    await faunadb.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscription.id
            )
          )
        ),
        { data: subscriptionData }
      ),
    )
  }
}