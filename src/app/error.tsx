"use client";

import Link from "next/link";

export default function Error() {
  return (
    <section className="">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-(--breakpoint-sm) text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-black dark:text-white lg:text-9xl">500</h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white">Looks like you&apos;ve encountered a pesky bug</p>
          <p className="mb-4 text-lg font-normal text-black dark:text-white">
            Sorry about that! Please try again later or visit homepage to get where you need to go
          </p>

          <Link className=" font-normal text-black dark:text-white underline" href="/">
            Take me there!
          </Link>
        </div>
      </div>
    </section>
  );
}
