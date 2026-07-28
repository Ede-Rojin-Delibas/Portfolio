import type { BlogPost } from "@/data/blog";

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function tokenize(value: string) {
  return normalize(value).match(/[a-z0-9#+.]+/g) ?? [];
}

function getPostText(post: BlogPost) {
  return [
    post.title,
    post.excerpt,
    post.category,
    post.hero.label,
    post.hero.metric,
    post.topics.join(" "),
    post.content.join(" "),
  ].join(" ");
}

export function getRelatedBlogPosts({
  limit = 3,
  post,
  posts,
}: {
  limit?: number;
  post: BlogPost;
  posts: BlogPost[];
}) {
  const sourceTokens = new Set(tokenize(getPostText(post)));
  const sourceTopics = new Set(post.topics.map(normalize));

  const scoredPosts = posts
    .filter((item) => item.slug !== post.slug && item.status === "Published")
    .map((item, index) => {
      const sharedTopics = item.topics.filter((topic) =>
        sourceTopics.has(normalize(topic)),
      ).length;
      const sharedTokenScore = tokenize(getPostText(item)).reduce(
        (score, token) => score + (sourceTokens.has(token) ? 0.35 : 0),
        0,
      );
      const categoryScore = item.category === post.category ? 8 : 0;
      const toneScore = item.tone === post.tone ? 1 : 0;
      const recencyScore = Math.max(0, posts.length - index) * 0.05;

      return {
        post: item,
        score:
          categoryScore +
          sharedTopics * 4 +
          toneScore +
          sharedTokenScore +
          recencyScore,
      };
    })
    .sort((first, second) => second.score - first.score);

  const related = scoredPosts
    .filter((item) => item.score > 0)
    .map((item) => item.post)
    .slice(0, limit);

  if (related.length >= limit) {
    return related;
  }

  const relatedSlugs = new Set(related.map((item) => item.slug));
  const fallback = posts
    .filter(
      (item) =>
        item.slug !== post.slug &&
        item.status === "Published" &&
        !relatedSlugs.has(item.slug),
    )
    .sort(
      (first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime(),
    )
    .slice(0, limit - related.length);

  return [...related, ...fallback];
}
