import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";

export async function generateMetadata({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Post | Glow Mark Agency",
      description: "Explore expert articles from Glow Mark Agency.",
    };
  }

  return {
    title: `${blog.title} | Glow Mark Agency`,
    description: blog.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const bodyEn = blog.content?.en;

  return (
    <main className="min-h-screen bg-[var(--background)] text-white">
      {/* Spacer for global header */}
      <div className="h-24" />

      <article className="max-w-5xl mx-auto px-6 pb-24 pt-6">
        {/* Back link */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-400">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span className="text-lg">&#8592;</span>
            <span>Back to all blogs</span>
          </Link>
        </div>

        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-10 mb-12">
          <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.9)]">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Category pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium uppercase tracking-wide">
                {blog.category}
              </span>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3">
                <span className="text-gradient-purple">{blog.title}</span>
              </h1>
            </div>
          </div>

          {/* Meta + quick info */}
          <div className="flex flex-col gap-6">
            <div className="glow-card rounded-3xl p-6">
              <h2 className="text-sm font-semibold text-gray-300 tracking-wide mb-4 uppercase">
                Overview
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {blog.excerpt}
              </p>
            </div>

            <div className="glow-card rounded-3xl p-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Published</p>
                <p className="font-medium text-white">{blog.date}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Read time</p>
                <p className="font-medium text-white">{blog.readTime}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Category</p>
                <p className="font-medium text-white">{blog.category}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body content */}
        <section className="max-w-3xl text-[15px] leading-relaxed text-gray-200 space-y-4 whitespace-pre-line">
          {bodyEn ||
            `In this article, we explore ${blog.title} and how you can apply these ideas to create a stronger, more memorable online presence.`}
        </section>
      </article>
    </main>
  );
}

