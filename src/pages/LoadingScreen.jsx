export default function LoadingScreen({ count = 8, mediumScreen = 4, largeScreen = 3, detail = false }) {
  if (detail) {
    return (
      <div className="loading-screen container my-5">
        <div className="card shadow-lg p-4 cute-card">
          <div className="row g-4 align-items-center">
            <div className="col-md-4 text-center">
              <div className="skeleton skeleton-img-detail rounded mx-auto"></div>
            </div>
            <div className="col-md-8">
              <div className="skeleton skeleton-text w-75 mb-3"></div>
              <div className="skeleton skeleton-text w-50 mb-2"></div>
              <div className="skeleton skeleton-text w-100 mb-2"></div>
              <div className="skeleton skeleton-text w-100 mb-2"></div>
              <div className="skeleton skeleton-text w-25"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const placeholders = Array.from({ length: count });

  return (
    <div className="loading-screen container p-4">
      <div className="row g-3">
        {placeholders.map((_, i) => (
          <div key={i} className={`col-md-${mediumScreen} col-lg-${largeScreen}`}>
            <div className="card p-2 shadow-sm skeleton-card">
              <div className="skeleton skeleton-img rounded mb-2"></div>
              <div className="skeleton skeleton-text w-75 mb-2"></div>
              <div className="skeleton skeleton-text w-100 mb-1"></div>
              <div className="skeleton skeleton-text w-50"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
