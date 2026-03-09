const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export async function getAllPosts(lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/posts?_embed=true&per_page=100&orderby=date&order=desc&lang=${lang}`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) {
      console.error(`Failed to fetch posts for language: ${lang}`);
      return [];
    }

    const posts = await response.json();

    const filteredPosts = posts.filter((post) => {
      const link = post.link || "";
      if (lang === "nl") return link.includes("/nl/");
      if (lang === "en") return link.includes("/en/");
      if (lang === "fr")
        return (
          link.includes("/fr/") ||
          (!link.includes("/nl/") && !link.includes("/en/"))
        );
      return true;
    });

    return filteredPosts.map(transformPost);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug, lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/posts?slug=${slug}&_embed=true&lang=${lang}`,
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
        return (
          link.includes("/fr/") ||
          (!link.includes("/nl/") && !link.includes("/en/"))
        );
      return true;
    });

    return matchedPost ? transformPost(matchedPost) : null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

function transformPost(post) {
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

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

export async function getCategories(lang = "en") {
  try {
    const response = await fetch(
      `${API_URL}/wp/v2/categories?per_page=100&lang=${lang}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) return [];

    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
