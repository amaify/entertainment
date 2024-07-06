import Image from "next/image";
import Typography from "@/components/typography/typography";
import NoResultFoundIllustration from "@/public/shared/no-result-found-illustration.svg";

export function NoResultFound({ title }: { title: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="h-auto w-[30rem] sm:w-full xl:w-[80rem]">
        <Image src={NoResultFoundIllustration} alt="No result found" className="block h-full w-full object-contain" />
        <Typography as="h1" intent="fluid-heading" className="text-center">
          {title}
        </Typography>
      </div>
    </div>
  );
}
