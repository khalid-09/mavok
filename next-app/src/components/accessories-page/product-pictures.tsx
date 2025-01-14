import { FaRegImage } from "react-icons/fa";
import Description from "../description";

const ProductPictures = () => {
  return (
    <section className="bg-secondaryLight px-4 py-10 md:px-30 md:py-22">
      <div className="content space-y-8 md:space-y-16">
        <div className="space-y-1.5 md:space-y-2">
          <p className="text-center font-bold uppercase -tracking--1% text-primaryGreen">
            Lorem ipsum title
          </p>
          <h4 className="text-center text-3.5xl font-bold uppercase -tracking--1% md:text-4.5xl">
            Lorem ipsum title.
          </h4>
          <Description className="mx-auto max-w-[47.313rem]">
            Ullamcorper laoreet quis auctor tempor nisl auctor. Facilisi et
            purus vitae sed. Urna pellentesque ac justo dictumst egestas
            pellentesque maecenas{" "}
          </Description>
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-1 gap-4 md:grid-rows-2">
          <div className="col-span-2 flex aspect-[16/9] min-h-[21.438rem] w-full items-center justify-center rounded-md bg-white sm:aspect-auto sm:h-[35rem]">
            <FaRegImage size={26} className="text-lightLight" />
          </div>
          <div className="flex aspect-square min-h-[10.25rem] w-full items-center justify-center rounded-md bg-white sm:aspect-auto sm:h-[35rem]">
            <FaRegImage size={26} className="text-lightLight" />
          </div>
          <div className="flex aspect-square min-h-[10.25rem] w-full items-center justify-center rounded-md bg-white sm:aspect-auto sm:h-[35rem]">
            <FaRegImage size={26} className="text-lightLight" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPictures;
