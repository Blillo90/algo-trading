import Link from 'next/link'
import PostForm from '@/components/admin/PostForm'
import { createClient } from '@/lib/supabase/server'

async function createPost(formData: FormData): Promise<{ error?: string }> {
  'use server'

  const supabase = await createClient()
  const { error } = await supabase.from('posts').insert({
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: (formData.get('excerpt') as string) || null,
    content: formData.get('content') as string,
    published: formData.get('published') === 'true',
  })

  if (error) return { error: error.message }
  return {}
}

export default function NewPostPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          ← Back to dashboard
        </Link>
        <h1 className="text-xl font-semibold text-slate-900 mt-3">New post</h1>
      </div>
      <PostForm action={createPost} />
    </div>
  )
}
