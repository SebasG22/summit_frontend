import Image from "next/image";
import Panini from "../public/img/panini.jpg";
export default function Loader() {
  return (
    <div className="relative flex items-center justify-center h-screen ">
      <Image
        className="animate-bounce"
        src={Panini}
        alt="weightIcon"
        width={200}
        height={200}
      />
      ;
    </div>
  );
}
