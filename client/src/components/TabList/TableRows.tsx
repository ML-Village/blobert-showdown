// import { Table } from "flowbite-react";

import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { Table } from "flowbite-react";
import { useDojo } from "../../dojo/useDojo";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity, HasValue } from "@dojoengine/recs";
import { feltToString } from "../../utils/starknet";
import { publicBlobbersPath, publicBlobertsPath } from "../../constants";
import RowModal from "./RowModal";
import { useState } from "react";

// value is player entityid

export default function TableRows({ value }: any) {
  const {
    setup: {
      clientComponents: { Player, Lineup }, // return a client Component
    },
  } = useDojo();

  const player = useComponentValue(Player, value);
  const filteredPlayer = useEntityQuery([
    HasValue(Lineup, { player_id: player?.player_id }),
  ]);
  const lineup = useComponentValue(Lineup, filteredPlayer);

  //console

  const [openModal, setOpenModal] = useState(false);

  return (
    // <Table.Row>
    //   <Table.Cell>
    //     <h1>pic: {player?.profile_pic}</h1>
    //     <h1>{feltToString(String(player?.name ?? ""))}</h1>

    //   </Table.Cell>
    //   <Table.Cell>
    //     <h1>pic: {player?.profile_pic}</h1>
    //     <h1>{feltToString(String(player?.name ?? ""))}</h1>

    //   </Table.Cell>

    // </Table.Row>

    <>
      <Table.Row
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Table.Cell className="text-left whitespace-nowrap font-medium">
          <div className="flex flex-col items-center justify-center">
            <img
              className="h-16"
              src={
                publicBlobbersPath[
                  player?.profile_pic % publicBlobbersPath.length
                ]
              }
            />
            <span>{feltToString(String(player?.name ?? ""))}</span>
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center">
            <img
              className="h-14 rounded-md border border-gray-800"
              src={
                lineup?.slot1 === undefined ||
                lineup?.slot1 === 0 ||
                isNaN(lineup?.slot1)
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot1) - 1) % publicBlobertsPath.length
                    ]
              }
              alt=""
            />
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center">
            <img
              className="h-14 rounded-md border border-gray-800"
              src={
                lineup?.slot2 === undefined ||
                lineup?.slot2 === 0 ||
                isNaN(lineup?.slot2)
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot2) - 1) % publicBlobertsPath.length
                    ]
              }
              alt=""
            />
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center">
            <img
              className="h-14 rounded-md border border-gray-800"
              src={
                lineup?.slot3 === undefined ||
                lineup?.slot3 === 0 ||
                isNaN(lineup?.slot3)
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot3) - 1) % publicBlobertsPath.length
                    ]
              }
              alt=""
            />
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center">
            <img
              className="h-14 rounded-md border border-gray-800"
              src={
                lineup?.slot4 === undefined ||
                lineup?.slot4 === 0 ||
                isNaN(lineup?.slot4)
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot4) - 1) % publicBlobertsPath.length
                    ]
              }
              alt=""
            />
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center">
            <img
              className="h-14 rounded-md border border-gray-800"
              src={
                lineup?.slot5 === undefined ||
                lineup?.slot5 === 0 ||
                isNaN(lineup?.slot5)
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot5) - 1) % publicBlobertsPath.length
                    ]
              }
              alt=""
            />
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="flex items-center justify-center">
            <img
              className="h-14 rounded-md border border-gray-800"
              src={
                lineup?.slot6 === undefined ||
                lineup?.slot6 === 0 ||
                isNaN(lineup?.slot6)
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot6) - 1) % publicBlobertsPath.length
                    ]
              }
              alt=""
            />
          </div>
        </Table.Cell>
        <Table.Cell className="font-semibold">{player?.total_duels}</Table.Cell>
        <Table.Cell className="font-semibold">
          {player?.total_duels > 0
            ? `${Math.round((player?.total_wins / player?.total_duels) * 100)}%`
            : "0%"}
        </Table.Cell>
      </Table.Row>

      <RowModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        player={player}
        lineup={lineup}
      />
    </>
  );
}
