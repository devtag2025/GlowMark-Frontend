const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

/**
 * Fetch all blog posts for a specific language
 * @param {string} lang - Language code (en, fr, nl)
 * @returns {Promise<Array>} Array of blog posts
 */
export async function getAllPosts(lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/posts?lang=${lang}&_embed=true&per_page=100&orderby=date&order=desc`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds (ISR)
      },
    );

    if (!response.ok) {
      console.error(`Failed to fetch posts for language: ${lang}`);
      return [];
    }

    const posts = await response.json();

    // Transform WordPress data to our format
    return posts.map((post) => transformPost(post));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @param {string} lang - Language code
 * @returns {Promise<Object|null>} Single post or null
 */
export async function getPostBySlug(slug, lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/posts?slug=${slug}&lang=${lang}&_embed=true`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      console.error(`Failed to fetch post: ${slug}`);
      return null;
    }

    const posts = await response.json();

    if (!posts || posts.length === 0) {
      return null;
    }

    return transformPost(posts[0]);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Transform WordPress post to our app format
 * @param {Object} post - WordPress post object
 * @returns {Object} Transformed post
 */
function transformPost(post) {
  // Get featured image
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/images/default-blog.jpg";

  // Get author info
  const author = post._embedded?.author?.[0];

  // Get categories
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const categoryName = categories[0]?.name || "Uncategorized";

  // Get tags
  const tags = post._embedded?.["wp:term"]?.[1]?.map((tag) => tag.name) || [];

  // Calculate read time (approximate: 200 words per minute)
  const wordCount = post.content?.rendered?.split(/\s+/).length || 0;
  const readTime = `${Math.ceil(wordCount / 200)} min read`;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, ""), // Remove HTML tags
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
 * Get all categories
 * @param {string} lang - Language code
 * @returns {Promise<Array>} Array of categories
 */
export async function getCategories(lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/categories?lang=${lang}&per_page=100`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
