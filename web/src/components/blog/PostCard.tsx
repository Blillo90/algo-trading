import Link from 'next/link'
import type { Post } from '@/types'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-3 group">
      <div className="w-full h-px bg-slate-200 group-hover:bg-slate-900 transition-colors duration-300" />
      <time className="text-xs text-slate-400 font-medium tabular-nums">
        {formatDate(post.created_at)}
      </time>
      <h2 className="text-base font-semibold text-slate-900 leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:text-slate-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      {post.excerpt && (
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="text-xs font-medium text-slate-900 hover:text-slate-500 transition-colors mt-auto pt-1"
      >
        Read article →
      </Link>
    </article>
  )
}
