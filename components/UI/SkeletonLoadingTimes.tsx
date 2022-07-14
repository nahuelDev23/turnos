import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonLoadingTimes = () => {
  return (
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#d6d6d6">
      <Skeleton count={5} height="2.5rem" />
    </SkeletonTheme>
  );
};
