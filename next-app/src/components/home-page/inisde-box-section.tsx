import { getInsideBoxData } from "@/lib/queries/home-page-queries";
import { BentoCard } from "./bento-card";
import {
  Box,
  BoxContent,
  BoxDescription,
  BoxHeader,
  BoxTitle,
} from "../ui/box";

const InsideBoxSection = async () => {
  const data = await getInsideBoxData();

  const renderBoxes = () => {
    const boxes = data.content.map((item, index) => (
      <BentoCard key={index} text={item.text} index={index} />
    )); // Map through the content for each box

    const rows = [];

    rows.push(
      <div
        key="first-row"
        className="flex w-full flex-row gap-3 md:gap-4 customNav:flex-col"
      >
        {/* This will render the first box which is bigger than the rest */}
        <BentoCard
          text={data.content[0].text}
          className="max-w-[37rem] md:h-[37.5rem] customNav:max-w-full"
          index={0}
        />
        {/* Rest of the boxes in the first row */}
        <div className="grid w-full grid-cols-2 gap-3 md:gap-4">
          {boxes.slice(1, 5)}
        </div>
      </div>,
    ); // Fn to render the first row of boxes

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
    } // renders the remaining boxes in the 3 boxes per row format

    return rows;
  }; // Fn to render the boxes

  return (
    <div className="bg-primaryDark px-4 py-10 text-white md:px-30 md:py-22">
      <Box>
        <BoxHeader className="md:space-y-3">
          <p className="text-center text-sm font-bold uppercase -tracking--1% text-primaryGreen md:text-base">
            what&apos;s in the box
          </p>
          <BoxTitle className="text-3.5xl md:text-4.5xl">{data.title}</BoxTitle>
          <BoxDescription className="mx-auto max-w-[47.313rem] text-center md:text-lg">
            {data.description}
          </BoxDescription>
        </BoxHeader>
        <BoxContent className="grid w-full gap-4">{renderBoxes()}</BoxContent>
      </Box>
    </div>
  );
};

export default InsideBoxSection;
