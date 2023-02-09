import Head from 'next/head'
import styles from './home.module.scss'
import Image from 'next/image'
import { SubscribeButton } from '@/components/SubscribeButton'
import { GetStaticProps } from 'next'
import { stripe } from '@/services/stripe'

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 hey, welcome</span> <br />

          <h1>News about the <span>React</span> World</h1>


          <p>Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <Image src="/images/avatar.svg" alt="Girl Coding" width={334} height={520} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MZeRtAy3ugKHaH2WaijLMR8')

  const product = {
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((price?.unit_amount! / 100)),
    priceId: price.id,
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}


