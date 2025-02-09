import Link from "next/link";

const NotFound = () => (
  <section>
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-(--breakpoint-sm) text-center">
        <h1 className=" mb-4 text-7xl font-extrabold tracking-tight text-black dark:text-white lg:text-9xl">404</h1>
        <p className="mb-4 text-3xl font-bold tracking-tight  text-black dark:text-white md:text-4xl">
          Looks like you&apos;ve found the doorway to the great nothing
        </p>
        <p className="mb-4 text-lg font-normal text-black dark:text-white">Sorry about that! Please visit homepage to get where you need to go</p>
        <Link className=" font-normal text-black dark:text-white underline" href="/">
          Take me there!
        </Link>
      </div>
    </div>
  </section>
);
export default NotFound;
