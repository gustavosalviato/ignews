import { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "../../../prismicio";
import { RichText } from 'prismic-dom'
import styles from './styles/posts.module.scss'
import { getSession } from 'next-auth/react'

interface PostsProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string,
  }
}

export default function Posts({ post }: PostsProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>

      <main className={styles.container}>

        <article className={styles.content}>

          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, previewData, req }) => {
  const session = await getSession({ req })

  if (!session?.userActiveSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const slug = params?.slug

  const client = createClient({ previewData })

  const response = await client.getByUID('post', String(slug))


  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  

  return {
    props: {
      post
    }
  }
}