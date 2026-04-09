import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import PostForm from '@/components/admin/PostForm'
import { createClient } from '@/lib/supabase/server'

type Props = { params: Promise<{ id: string }> }

async function getPost(id: string) {
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('*').eq('id', id).single()
  return data ?? null
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  async function updatePost(formData: FormData): Promise<{ error?: string }> {
    'use server'
    const supabase = await createClient()
    const { error } = await supabase
      .from('posts')
      .update({
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        excerpt: (formData.get('excerpt') as string) || null,
        content: formData.get('content') as string,
        published: formData.get('published') === 'true',
      })
      .eq('id', id)
    if (error) return { error: error.message }
    return {}
  }

  async function deletePost() {
    'use server'
    const supabase = await createClient()
    await supabase.from('posts').delete().eq('id', id)
    redirect('/admin')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to dashboard
        </Link>
        <h1 className="text-xl font-semibold text-slate-900 mt-3">Edit post</h1>
      </div>

      <PostForm post={post} action={updatePost} />

      {/* Danger zone */}
      <div className="mt-10 pt-8 border-t border-slate-200">
        <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest font-medium">
          Danger zone
        </p>
        <form action={deletePost}>
          <button
            type="submit"
            formAction={deletePost}
            className="text-sm text-red-500 hover:text-red-700 transition-colors"
            onClick={(e) => {
              if (!confirm('Delete this post permanently? This cannot be undone.')) {
                e.preventDefault()
              }
            }}
          >
            Delete post
          </button>
        </form>
      </div>
    </div>
  )
}
