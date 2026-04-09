import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getPostBySlug, getPublishedPosts } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

export const revalidate = 60

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <article className="max-w-2xl mx-auto px-6 py-16">
          <Link
            href="/blog"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors mb-10 inline-block"
          >
            ← Back to blog
          </Link>

          <header className="mb-10">
            <time className="text-xs text-slate-400 font-medium block mb-4">
              {publishedDate}
            </time>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4 tracking-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-slate-500 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="border-t border-slate-100 pt-10">
            {/*
              Content is written by the authenticated admin only.
              HTML is rendered directly — add a sanitization library
              (e.g. DOMPurify via isomorphic-dompurify) if untrusted
              authors are ever introduced.
            */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
