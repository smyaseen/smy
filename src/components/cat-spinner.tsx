import Image from "next/image";

export function CatSpinner() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Image src="/loading.gif" alt="Loading" width={500} height={500} />
    </div>
  );
}
