import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { createClient } from "prismicio";
import { RichText } from 'prismic-dom'
import styles from '../styles/posts.module.scss'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect } from "react";

interface PreviewPostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string,
  }
}

export default function PreviewPost({ post }: PreviewPostProps) {
  const router = useRouter()

  const session = useSession()


  useEffect(() => {
    if (session.data?.user) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session.data?.user])

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.subscribeLink}>
            Wanna continue reading?
            <Link href="/">
              Subscribe Now 🤗
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params, previewData, }) => {

  const slug = params?.slug

  const client = createClient({ previewData })

  const response = await client.getByUID('post', String(slug))


  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.slice(0, 3)),
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