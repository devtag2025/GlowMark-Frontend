"use client";

import SEOSidebar from "./SEOSidebar";

export default function SEOArticleLayout({ children }) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header spacer */}
      <div className="h-24" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-12">
          {/* Left: Article Content */}
          <article className="min-w-0">{children}</article>

          {/* Right: Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <SEOSidebar />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
