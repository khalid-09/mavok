import { getInsideBoxData } from "@/lib/queries/home-page-queries";
import { roboto } from "./about-section";
import { Card } from "../ui/card";

const InsideBoxSection = async () => {
  const data = await getInsideBoxData();

  const renderBoxes = () => {
    const boxes = data.content.map((item, index) => (
      <Card
        key={index}
        className="h-46 w-full rounded-lg border-none bg-secondaryDark p-8 md:h-[18.25rem]"
      >
        <span className="text-white">{item.text}</span>
      </Card>
    ));

    const rows = [];

    rows.push(
      <div
        key="first-row"
        className="flex w-full flex-row gap-3 md:gap-4 customNav:flex-col"
      >
        <Card className="h-46 w-full max-w-[37rem] rounded-lg border-none bg-secondaryDark p-4 md:h-[37.5rem] md:p-8 customNav:max-w-full">
          <span className="text-white">{boxes[0].props.children}</span>
        </Card>
        <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
          {boxes.slice(1, 5)}
        </div>
      </div>,
    ); // First row (1 large + 2 small)

    for (let i = 5; i < boxes.length; i += 3) {
      rows.push(
        <div
          key={`row-${i / 3}`}
          className="flex w-full gap-3 md:gap-4 customNav:grid customNav:grid-cols-2"
        >
          {boxes.slice(i, i + 3)}
        </div>,
      );
    } // Additional rows (3 boxes per row)

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
          <p
            className={`${roboto.className} mx-auto max-w-[47.313rem] text-center text-base text-primaryLight antialiased md:text-lg`}
          >
            {data.description}
          </p>
        </div>
        <div className="grid w-full gap-4">{renderBoxes()}</div>
      </div>
    </div>
  );
};

export default InsideBoxSection;
