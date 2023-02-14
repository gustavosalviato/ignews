import { GetStaticProps } from "next"
import Head from "next/head"
import { createClient } from "prismicio"
import styles from './styles.module.scss'
import { RichText } from 'prismic-dom'

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
        Posts
      </Head>

      <main className={styles.container}>
        <div className={styles.content}>
          {posts.map((post) => (
            <a key={post.slug} href="#">
              <time>{post.updatedAt}</time>

              <strong>{post.title}</strong>

              <p>{post.content}</p>
            </a>

          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, previewData }) => {
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