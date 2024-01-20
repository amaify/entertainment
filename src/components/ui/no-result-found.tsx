import Image from "next/image";
import NoResultFoundIllustration from "@/public/shared/no-result-found-illustration.svg";

export function NoResultFound({ title }: { title: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="h-auto w-full lg:w-[80rem]">
        <Image src={NoResultFoundIllustration} alt="No result found" className="block h-full w-full object-contain" />
        <h1 className="text-center text-heading-lg text-white">{title}</h1>
      </div>
    </div>
  );
}
