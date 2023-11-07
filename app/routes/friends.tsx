import { MainLayout } from '@/components/layouts/main-layout';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix | Spotify' },
    {
      property: 'og:title',
      content: 'Remix | Spotify',
    },
    {
      name: 'description',
      content: 'This app is the best',
    },
  ];
};

export default function Home() {
  return (
    <MainLayout>
      <section className="flex-col gap-4 mt-4 mx-6">
        <h2 className="text-white text-xl font-bold">Friends</h2>

        <div className="grid grid-auto-fit-[theme(spacing.48)] mt-[inherit] gap-[inherit]">
          {[...new Array(8)].map((_, index) => (
            <article
              key={index}
              className="gap-[inherit] w-full min-h-64 p-4 bg-neutral-900 rounded-lg flex-col justify-start items-start inline-flex"
            >
              <img
                className="w-full max-h-36 relative rounded-md object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzhq6h3kE03ExzipF2z9-GXw9bpZhd0HyEKCbKEKjuEvQYUMz_fYUWtSi_a0hLs-55pgc&usqp=CAU"
                alt="Dualipa"
              />

              <div className="gap-2 flex-col justify-start items-start flex">
                <h2 className="text-white text-base font-bold">Zeeh Jhordy</h2>

                <div className="flex gap-2">
                  <p className="text-neutral-300 text-sm font-semibold ">
                    Playing: <span className="text-neutral-400 font-normal">MC Naldo </span>
                  </p>
                  <img
                    className="w-[0.9rem] h-[0.9rem]"
                    src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
                    alt="Player"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
