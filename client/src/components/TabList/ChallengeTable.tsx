import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { useDojo } from "../../dojo/useDojo";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity, Has, HasValue } from "@dojoengine/recs";
import { CustomFlowbiteTheme, Table } from "flowbite-react";
import ChallengersRows from "./ChallengersRow";

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

export default function ChallengeTable() {
  const {
    setup: {
      systemCalls: { accept_challenge }, // already return a function WRITE
      clientComponents: { Player, Game }, // return a client Component
    },
    account,
  } = useDojo();

  const playerEntityId = getEntityIdFromKeys([
    BigInt(account.account.address),
  ]) as Entity;
  const hasGame = useEntityQuery([Has(Game)]); // to check all entityid in a model

  const player = useComponentValue(Player, playerEntityId);
  const filteredGame = useEntityQuery([
    HasValue(Game, { player_b: player?.player_id }),
  ]);
  const game = useComponentValue(Game, filteredGame[1]);

  //CONSOLE
  // console.log("filtered game", filteredGame);
  // console.log("game",game)
  // console.log("player id",player?.player_id)

  // const filteredPlayer = useEntityQuery([
  //   HasValue(Player, {player_id: player?.player_id })
  // ])

  return (
    <div>
      <h1 className=" text-slate-300 p-2 text-xl"> Challenger</h1>
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
          {filteredGame.map((value, index) => (
            <ChallengersRows key={index} value={value} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
