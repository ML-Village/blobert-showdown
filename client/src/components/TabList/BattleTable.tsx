import { Table } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useDojo } from "../../dojo/useDojo";
import { useEntityQuery } from "@dojoengine/react";
import { Has } from "@dojoengine/recs";
import BattleRows from "./BattleRows";

const customTableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "w-full text-left text-sm text-gray-500",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full bg-orange-700 drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-6 py-4",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-300",
    cell: {
      base: "bg-orange-950/50 px-6 py-3",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 hover:text-black cursor-pointer",
    striped: "text-gray-300 odd:bg-[#605850]/70 even:bg-[#664A44]",
  },
};

export const BattleTable = () => {
  const {
    setup: {
      clientComponents: { Player, Lineup }, // return a client Component
    },
    account,
  } = useDojo();

  const hasPlayer = useEntityQuery([Has(Player)]); // to check all entityid in a model
  // console.log("HAS PLAYER ", hasPlayer);

  return (
    <>
      <Table theme={customTableTheme} hoverable striped className="text-center">
        <Table.Head>
          <Table.HeadCell>Blobber Name</Table.HeadCell>

          <Table.HeadCell>Blob1</Table.HeadCell>
          <Table.HeadCell>Blob2</Table.HeadCell>
          <Table.HeadCell>Blob3</Table.HeadCell>
          <Table.HeadCell>Blob4</Table.HeadCell>
          <Table.HeadCell>Blob5</Table.HeadCell>
          <Table.HeadCell>Blob6</Table.HeadCell>

          <Table.HeadCell>Total Games</Table.HeadCell>
          <Table.HeadCell>Win Rate</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {hasPlayer.map((value, index) => (
            <BattleRows key={index} value={value} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
