const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

/**
 * Fetch all blog posts for a specific language
 * @param {string} lang - Language code from useLanguage()
 */
export async function getAllPosts(lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/posts?_embed=true&per_page=100&orderby=date&order=desc`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) {
      console.error(`Failed to fetch posts for language: ${lang}`);
      return [];
    }

    const posts = await response.json();

    // FILTER BY LINK (Option 3)
    const filteredPosts = posts.filter((post) => {
      const link = post.link || "";
      if (lang === "nl") return link.includes("/nl/");
      if (lang === "en") return link.includes("/en/");
      if (lang === "fr")
        return !link.includes("/nl/") && !link.includes("/en/");
      return true;
    });

    return filteredPosts.map(transformPost);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug, lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/posts?slug=${slug}&_embed=true`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) return null;

    const posts = await response.json();
    if (!posts || posts.length === 0) return null;

    const matchedPost = posts.find((post) => {
      const link = post.link || "";
      if (lang === "nl") return link.includes("/nl/");
      if (lang === "en") return link.includes("/en/");
      if (lang === "fr")
        return !link.includes("/nl/") && !link.includes("/en/");
      return true;
    });

    return matchedPost ? transformPost(matchedPost) : null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Transform WordPress post into app format
 */
function transformPost(post) {
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/images/default-blog.jpg";

  const author = post._embedded?.author?.[0];
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const categoryName = categories[0]?.name || "Uncategorized";
  const tags = post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [];

  const wordCount = post.content?.rendered?.split(/\s+/).length || 0;
  const readTime = `${Math.ceil(wordCount / 200)} min read`;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
    content: post.content.rendered,
    image: featuredImage,
    category: categoryName,
    tags: tags,
    date: new Date(post.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    readTime: readTime,
    author: {
      name: author?.name || "Admin",
      avatar: author?.avatar_urls?.["96"] || null,
    },
  };
}

/**
 * Fetch all categories for the current language
 */
export async function getCategories(lang = "en") {
  try {
    const response = await fetch(`${API_URL}/wp/v2/categories?per_page=100`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];

    const categories = await response.json();

    // FILTER categories by link if needed (optional)
    // Usually Polylang handles this properly
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
