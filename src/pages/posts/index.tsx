import { GetStaticProps } from "next"
import Head from "next/head"
import { createClient } from "prismicio"
import styles from './styles.module.scss'
import { RichText } from 'prismic-dom'
import Link from "next/link"

interface PostsProps {
  posts: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string,
  }[]
}
export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        Post | ignews
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} legacyBehavior>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>

                <strong>{post.title}</strong>

                <p>{post.content}</p>
              </a>
            </Link>

          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, previewData, }) => {

  const client = createClient({ previewData })

  const response = await client.getAllByType('post')
  
  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText((post.data.title)),
      content: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })


  return {
    props: {
      posts
    }
  }
}