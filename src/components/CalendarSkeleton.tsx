import "react-big-calendar/lib/css/react-big-calendar.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CalendarSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="calendar-skeleton" style={{ height: 500 }}>
        {/* Header do calendário */}
        <div className="flex justify-between items-center mb-4 p-4">
          <Skeleton width={100} height={30} />
          <Skeleton width={200} height={30} />
          <Skeleton width={150} height={30} />
        </div>

        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="p-2">
              <Skeleton height={20} />
            </div>
          ))}
        </div>

        {/* Grid do calendário */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 p-2"
              style={{ minHeight: 80 }}
            >
              <Skeleton width={20} height={15} className="mb-2" />
              {Math.random() > 0.7 && (
                <>
                  <Skeleton height={12} className="mb-1" />
                  <Skeleton height={12} width="80%" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};
