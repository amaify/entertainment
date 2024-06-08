import Skeleton from "../ui/skeleton";

export default function ModalSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="h-[30rem] w-full md:min-h-[43rem] md:w-1/3">
        <Skeleton className="size-full md:rounded-xl" />
      </div>
      <div className="flex w-full flex-col gap-5 px-10 pb-12 md:w-[70%] md:px-0 md:pb-0">
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
