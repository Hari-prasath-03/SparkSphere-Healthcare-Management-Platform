const Loader = ({ minHeight = "min-h-screen" }: { minHeight?: string }) => (
  <div
    className={`${minHeight} flex items-center justify-center bg-background`}
  >
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
      <p className="mt-4 text-muted-foreground">Loading SparkSphere...</p>
    </div>
  </div>
);

export default Loader;
