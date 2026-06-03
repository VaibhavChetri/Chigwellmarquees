import { MediaFrame } from "@/components/primitives/MediaFrame";
import { SocialReel } from "@/components/sections/SocialReel";
import { Tag } from "@/components/primitives/Tag";
import { resolveMedia } from "@/lib/cms";
import type { SocialPost } from "@/types";

/* INSTAGRAM / SOCIAL WALL (§8, [NMP]) — CMS-curated grid; leads with
   multicultural real weddings. Images are lazy by default (no priority). The
   whole section should be dynamically imported below the fold (§5 perf). */
export function SocialWall({
  posts,
  instagramUrl,
}: {
  posts: SocialPost[];
  instagramUrl?: string;
}) {
  if (posts.length === 0) return null;
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {posts.map((post) => {
          const media = resolveMedia(post.media);
          return (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.caption ?? media?.alt ?? "View on Instagram"}
              className="group relative overflow-hidden rounded-[var(--radius-card)]"
            >
              {media?.type === "video" ? (
                <SocialReel
                  media={media}
                  imgClassName="transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:scale-105"
                />
              ) : (
                <MediaFrame
                  media={media}
                  ratio="square"
                  rounded={false}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  imgClassName="transition-transform duration-500 ease-[var(--ease-cinematic)] group-hover:scale-105"
                />
              )}
              {post.caption && (
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-[var(--overlay)] p-3 text-[0.72rem] text-ivory transition-transform duration-300 group-hover:translate-y-0">
                  {post.caption}
                </span>
              )}
              {post.culture && (
                <span className="absolute left-2 top-2">
                  <Tag tone="blush">{post.culture}</Tag>
                </span>
              )}
            </a>
          );
        })}
      </div>
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto font-sans text-[0.8rem] uppercase tracking-[0.16em] text-ink-soft hover:text-gold-deep hover:underline"
        >
          Follow us on Instagram &rarr;
        </a>
      )}
    </div>
  );
}
