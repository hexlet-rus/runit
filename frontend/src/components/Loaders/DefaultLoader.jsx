function DefaultLoader() {
  return (
    <div className="h-100 m-auto d-flex flex-column justify-content-center align-items-center text-secondary">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="pt-3">Loading...</p>
    </div>
  );
}

export default DefaultLoader;
