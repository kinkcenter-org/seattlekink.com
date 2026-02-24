import Image from "next/image";
import LinkButton from "@/src/components/linkButton";
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
}: Venue) => {
  return (
    <div
      key={name}
      className="flex flex-col gap-4 items-start text-start rounded-2xl border border-white/10 bg-white/5 p-6 w-full"
    >
      {image ? (
        <div className="rounded-xl overflow-hidden -mt-6 -mx-6 mb-0 w-[calc(100%+3rem)] justify-items-center">
          <Image
            src={image}
            alt={name}
            className={`max-w-full h-48 object-contain ${imageClassName || ""}`}
          />
        </div>
      ) : null}
      <p className="text-xl font-bold">{name}</p>
      <blockquote className="italic flex flex-col gap-2 opacity-80 pl-4 border-l-2 border-white/20">
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
      {website ? (
        <div className="mt-auto pt-2">
          <LinkButton href={website}>Website</LinkButton>
        </div>
      ) : null}
    </div>
  );
};
