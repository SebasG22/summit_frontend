import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Loader from "../components/loader";

export default function Home() {

  if (false) return <Loader />;
  if (false) return <p>Error :(</p>;
  return (
    <>
      <div className="relative mx-auto max-w-container px-0 pt-4 md:pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <h1 className="text-white text-4xl md:text-7xl font-qatar py-2 md:py-8 text-center">
          Javascript Summit Qatar World Cup
        </h1>
        <div
          className="grid md:gap-4 sm:grid-cols-2
     md:grid-cols-3 lg:grid-cols-6 mx-4"
        >
          <Link href="/team/create">
            <div className="border-4 border-[#FEC310] px-4 py-4 h-full">
              <PlusIcon className="w-8/12 text-white block m-auto" />
              <div className="flex justify-center mt-4">
                <span className="text-white text-center text-2xl font-bold font-qatar">
                  Add new
                </span>
              </div>
            </div>
          </Link>
          {([]as any[]).map(({ id, name, background, flag_icon }) => (
            <Link href={`/team/${id}`}>
              <div className="border-4 border-[#FEC310] px-4 py-4 h-full">
                <div className="h-40 flex items-center">
                  <img src={flag_icon} />
                </div>
                <div className="flex justify-center mt-4">
                  <div className="text-white text-2xl font-bold font-qatar">
                    {name}
                  </div>
                </div>
              </div>
              <br />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
