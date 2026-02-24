import Image from "next/image";
import LinkButton from "@/src/components/linkButton";
import SocialsButton from "@/src/components/socialsButton";
import galleryErato from "./gallery-erato";
import kinkcenter from "./kinkcenter";
import subspace from "./subspace";
import type { Venue } from "./types";
export const VenueList: Venue[] = [galleryErato, subspace, kinkcenter];

export const VenueComponent = ({
  name,
  description,
  comments,
  image,
  imageClassName,
  website,
  socials,
}: Venue) => {
  return (
    <div
      key={name}
      className="flex flex-col gap-4 items-start text-start rounded-lg border border-gray-300 bg-neutral-200 dark:bg-neutral-900 p-6 w-full hover:shadow-md transition-shadow"
    >
      {image ? (
        <div className="rounded-t-lg overflow-hidden -mt-6 -mx-6 mb-0 w-[calc(100%+3rem)] justify-items-center">
          <Image
            src={image}
            alt={name}
            className={`max-w-full h-48 object-contain ${imageClassName || ""}`}
          />
        </div>
      ) : null}
      <p className="text-lg font-bold mb-2">{name}</p>
      <blockquote className="italic flex flex-col gap-2 opacity-80 pl-4 border-l-2 border-foreground/50">
        {Array.from([description])
          .flat()
          .map((desc, i) => (
            <p key={`${name}-desc-${i}`}>{desc}</p>
          ))}
      </blockquote>
      {comments ? (
        <div className="flex flex-col gap-2">
          {Array.from([comments])
            .flat()
            .map((comment, i) => (
              <p key={`${name}-comment-${i}`}>{comment}</p>
            ))}
        </div>
      ) : null}
      {website || socials?.length ? (
        <div className="mt-auto pt-2 flex gap-2 flex-wrap">
          {website ? <LinkButton href={website}>Website</LinkButton> : null}
          {socials?.length ? <SocialsButton socials={socials} /> : null}
        </div>
      ) : null}
    </div>
  );
};
