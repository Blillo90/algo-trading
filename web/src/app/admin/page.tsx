import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import AdminLogout from '@/components/admin/AdminLogout'

export default async function AdminDashboard() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Posts</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <AdminLogout />
          <Link
            href="/admin/posts/new"
            className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            New post
          </Link>
        </div>
      </div>

      {/* Posts table */}
      {posts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-400 text-sm mb-3">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="text-sm text-slate-900 font-medium underline underline-offset-2"
          >
            Create the first one
          </Link>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left">
                <th className="px-4 py-3 font-medium text-slate-600">Title</th>
                <th className="px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-slate-600 hidden md:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 font-medium text-slate-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-slate-900 font-medium">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        post.published
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell text-xs tabular-nums">
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-slate-500 hover:text-slate-900 transition-colors font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
