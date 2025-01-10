import { getInsideBoxData } from "@/lib/queries/home-page-queries";
import Description from "../description";
import { BentoCard } from "./bento-card";

const InsideBoxSection = async () => {
  const data = await getInsideBoxData();

  const renderBoxes = () => {
    const boxes = data.content.map((item, index) => (
      <BentoCard key={index} text={item.text} index={index} />
    ));

    const rows = [];

    rows.push(
      <div
        key="first-row"
        className="flex w-full flex-row gap-3 md:gap-4 customNav:flex-col"
      >
        <BentoCard
          text={data.content[0].text}
          className="max-w-[37rem] md:h-[37.5rem] customNav:max-w-full"
          index={0}
        />

        <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
          {boxes.slice(1, 5)}
        </div>
      </div>,
    );

    const remainingBoxes = boxes.slice(5);
    if (remainingBoxes.length > 0) {
      rows.push(
        <div
          key="remaining-boxes"
          className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
        >
          {remainingBoxes}
        </div>,
      );
    }

    return rows;
  };

  return (
    <div className="bg-primaryDark px-4 py-10 text-white md:px-30 md:py-22">
      <div className="content space-y-8 md:space-y-16">
        <div className="space-y-3">
          <p className="text-center text-sm font-bold uppercase -tracking--1% text-primaryGreen md:text-base">
            what&apos;s in the box
          </p>
          <h4 className="text-center text-3.5xl font-bold uppercase -tracking--1% md:text-4.5xl">
            {data.title}
          </h4>
          <Description className="mx-auto max-w-[47.313rem] text-center md:text-lg">
            {data.description}
          </Description>
        </div>
        <div className="grid w-full gap-4">{renderBoxes()}</div>
      </div>
    </div>
  );
};

export default InsideBoxSection;
