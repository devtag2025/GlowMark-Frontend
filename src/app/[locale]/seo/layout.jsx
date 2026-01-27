import SEOArticleLayout from "@/components/SEO/SEOArticleLayout";

export const metadata = {
  title: "SEO Articles - Glow Mark Agency",
  description:
    "Learn about SEO, backlinks, content optimization, and more to improve your website's visibility on Google.",
};

export default function SEOLayout({ children }) {
  return <SEOArticleLayout>{children}</SEOArticleLayout>;
}
