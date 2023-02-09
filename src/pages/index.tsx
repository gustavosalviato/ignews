import Head from 'next/head'
import styles from './home.module.scss'
import Image from 'next/image'
import { SubscribeButton } from '@/components/SubscribeButton'
export default function Home() {
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
            <span>for $9,90 month</span>
          </p>

          <SubscribeButton/>
        </section>

        <Image src="/images/avatar.svg" alt="Girl Coding" width={334} height={520} />
      </main>
    </>
  )
}
