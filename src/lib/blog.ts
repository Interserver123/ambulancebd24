/**
 * Scheduled publishing for a static site. A post whose `published` date-time is still in the future
 * is left out of its page, the sitemap, the blog list, related lists and llms.txt until a build runs
 * after that moment. A daily rebuild (.github/workflows/daily-rebuild.yml) makes that happen on time.
 *
 * To preview a scheduled post locally:  BLOG_AS_OF=2026-11-02 npm run build
 */
const asOf = process.env.BLOG_AS_OF ? Date.parse(process.env.BLOG_AS_OF) : Date.now();

export const isLive = (e: { data: { draft: boolean; published: Date } }) => !e.data.draft && e.data.published.getTime() <= asOf;
