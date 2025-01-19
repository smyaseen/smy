export function Spinner() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="w-12 h-12 border-4 border-black dark:border-white dark:border-t-inherit border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
