import { getInsideBoxData } from "@/lib/queries/home-page-queries";
import { Card } from "../ui/card";
import Description from "../description";

/**InsideBoxSection component
  Displays features or what we get in a box of a product in a bento grid style fashion.
*/

const InsideBoxSection = async () => {
  const data = await getInsideBoxData();

  const renderBoxes = () => {
    const boxes = data.content.map((item, index) => (
      <Card
        key={index}
        className="h-46 w-full rounded-lg border-none bg-secondaryDark p-4 md:h-[18.25rem] md:p-8"
      >
        <span className="break-words text-base font-bold leading-5 -tracking--1% text-white md:text-xl md:leading-[1.875rem]">
          {item.text}
        </span>
      </Card>
    )); // creates a box(card) with the content/data with basic styles, the boxes are not in layout here.

    const rows = []; // stores the no of rows: useful to track different layout of rows

    rows.push(
      <div
        key="first-row"
        className="flex w-full flex-row gap-3 md:gap-4 customNav:flex-col"
      >
        <Card className="h-46 w-full max-w-[37rem] rounded-lg border-none bg-secondaryDark p-4 md:h-[37.5rem] md:p-8 customNav:max-w-full">
          <span className="text-base font-bold leading-5 -tracking--1% text-white md:text-xl md:leading-[1.875rem]">
            {boxes[0].props.children}
          </span>
        </Card>

        <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
          {boxes.slice(1, 5)}
        </div>
      </div>,
    ); // First row with special layout of 1st box the biggest and other 4 box in 2x2 order beside the big box

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
    } // Remaining rows in 3(2 in smaller screens) box per row layout

    return rows;
  }; // renderes the content in a bento grid fashion

  return (
    <div className="bg-primaryDark px-4 py-10 text-white md:px-30 md:py-22">
      <div className="content space-y-8 md:space-y-16">
        <div className="space-y-3">
          <p className="text-center text-sm font-bold uppercase -tracking--1% text-primaryGreen md:text-base">
            what's in the box
          </p>
          <h4 className="text-center text-3.5xl font-bold uppercase -tracking--1% md:text-4.5xl">
            {data.title}
          </h4>
          <Description className="max-w-[47.313rem] md:text-lg">
            {data.description}
          </Description>
        </div>
        <div className="grid w-full gap-4">{renderBoxes()}</div>
      </div>
    </div>
  );
};

export default InsideBoxSection;
