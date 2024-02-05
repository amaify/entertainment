import Skeleton from "../ui/skeleton";

export default function ModalSkeleton() {
  return (
    <div className="flex gap-8">
      <div className="min-h-[43rem] w-1/3">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
      <div className="flex w-[70%] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-12 w-1/2" />
          <div className="modal-subheading text-body-sm">
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-96 w-full" />
        </div>
        <Skeleton className="h-12 w-1/2" />
      </div>
    </div>
  );
}
