import Skeleton from '@mui/material/Skeleton';
import s from './TableLoadSkeleton.module.scss';

export const TableLoadSkeleton = () => {
  return (
    <>
      <div className={s.skeletonBox}>
        <Skeleton variant="rounded" width={70} height={12} />
        <Skeleton variant="rounded" width={50} height={50} />
        <Skeleton variant="rounded" width={64} height={36} />
        <Skeleton variant="rounded" width={3} height={50} />
        <Skeleton variant="rounded" width={93} height={36} />
        <Skeleton variant="rounded" width={93} height={36} />
        <Skeleton variant="rounded" width={3} height={50} />
        <Skeleton variant="rounded" width={64} height={36} />
      </div>
      <div className={s.skeletonBox}>
        <Skeleton variant="rounded" width={95} height={19} />
      </div>
      <div className={s.skeletonBox}>
        <Skeleton variant="rounded" width={120} height={15} />
        <Skeleton variant="rounded" width={100} height={15} />
        <Skeleton variant="rounded" width={110} height={15} />
        <Skeleton variant="rounded" width={100} height={15} />
        <Skeleton variant="rounded" width={130} height={15} />
        <Skeleton variant="rounded" width={100} height={15} />
        <Skeleton variant="rounded" width={150} height={15} />
      </div>
      <div>
        <Skeleton variant="rounded" width="100%" height={300} />
      </div>
    </>
  );
};
