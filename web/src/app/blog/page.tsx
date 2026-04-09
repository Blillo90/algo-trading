import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostCard from '@/components/blog/PostCard'
import { getPublishedPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on algorithmic trading, quantitative finance, and systematic investing.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-xl mb-14">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Blog</h1>
            <p className="text-slate-500">
              Research and commentary on algorithmic trading and quantitative
              finance.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-slate-400 text-sm">No articles published yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
