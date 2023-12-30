import Skeleton from "../ui/skeleton";
import styles from "./layout.module.css";

export default function ShowsLayoutSkeleton() {
  return (
    <div className="pt-[3.2rem]">
      <div className="flex gap-8 mb-[3.2rem]">
        <Skeleton className="size-16 rounded-full" />
        <Skeleton className="w-1/2 h-16" />
      </div>
      <Skeleton className="mb-[3.2rem] w-1/2 h-14" />
      <div className={styles.shows_layout}>
        {Array.from({ length: 10 }, (_, idx) => (
          <div key={idx} className="h-[17.4rem]">
            <Skeleton className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
