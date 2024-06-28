import Skeleton from "@/components/ui/skeleton";

export default function PreviewAvatarSkeleton() {
  return (
    <div className="mb-16 size-48">
      <Skeleton className="size-[12rem]" />
      <Skeleton className="mt-2 h-[2.5rem] w-full" />
    </div>
  );
}
