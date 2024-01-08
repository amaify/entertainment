import Skeleton from "@/components/ui/skeleton";
import styles from "./layout.module.css";

export default function ShowsLayoutSkeleton() {
  return (
    <div className="pt-[3.2rem]">
      <div className="mb-[3.2rem] flex gap-8">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="h-16 w-1/2" />
      </div>
      <Skeleton className="mb-[3.2rem] h-14 w-1/2" />
      <div className={styles.shows_layout}>
        {Array.from({ length: 10 }, (_, idx) => (
          <div key={idx} className="h-[17.4rem]">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
