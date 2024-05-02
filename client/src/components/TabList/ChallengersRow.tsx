import { Table } from "flowbite-react";
import { useDojo } from "../../dojo/useDojo";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity, Has, HasValue } from "@dojoengine/recs";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { publicBlobbersPath, publicBlobertsPath } from "../../constants";
import { feltToString } from "../../utils/starknet";
import ChallengerModal from "./ChallengeModal";
import { useState } from "react";

export default function ChallengersRows({ value }: any) {
  const {
    setup: {
      systemCalls: { accept_challenge }, // already return a function WRITE
      clientComponents: { Player, Game, Lineup }, // return a client Component
    },
    account,
  } = useDojo();

  // const playerEntityId = getEntityIdFromKeys([
  //   BigInt(account.account.address),
  // ]) as Entity;

  // const player = useComponentValue(Player, playerEntityId);
  const game = useComponentValue(Game, value);

  const filteredOponents = useEntityQuery([
    HasValue(Player, { player_id: game?.player_a }),
  ]);
  const filteredLineup = useEntityQuery([
    HasValue(Lineup, { player_id: game?.player_a }),
  ]);
  const oponent = useComponentValue(Player, filteredOponents[0]);
  const lineup = useComponentValue(Lineup, filteredLineup[0]);

  const lineups = useEntityQuery([Has(Lineup)]);

  // console.log("lineups", lineups);
  // console.log("asdasd", filteredOponents);
  // console.log(lineup)
  // console.log("player", player?.player_id)
  console.log("game", game?.game_status);

  const [openModal, setOpenModal] = useState(false);

  const gameStatus = game?.game_status;

  return (
    <>
      {(gameStatus === "Awaiting" || gameStatus === "0x1") && (
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
                      oponent?.profile_pic % publicBlobbersPath.length
                    ]
                  }
                />
                <span>{feltToString(String(oponent?.name ?? ""))}</span>
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
                          (Number(lineup?.slot1) - 1) %
                            publicBlobertsPath.length
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
                          (Number(lineup?.slot2) - 1) %
                            publicBlobertsPath.length
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
                          (Number(lineup?.slot3) - 1) %
                            publicBlobertsPath.length
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
                          (Number(lineup?.slot4) - 1) %
                            publicBlobertsPath.length
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
                          (Number(lineup?.slot5) - 1) %
                            publicBlobertsPath.length
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
                          (Number(lineup?.slot6) - 1) %
                            publicBlobertsPath.length
                        ]
                  }
                  alt=""
                />
              </div>
            </Table.Cell>
            <Table.Cell className="font-semibold">
              {oponent?.total_duels}
            </Table.Cell>
            <Table.Cell className="font-semibold">
              {oponent?.total_duels > 0
                ? `${Math.round((oponent?.total_wins / oponent?.total_duels) * 100)}%`
                : "0%"}
            </Table.Cell>
          </Table.Row>

          <ChallengerModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            oponent={oponent}
            lineup={lineup}
            gameId={game?.game_id}
          />
        </>
      )}
    </>
  );
}
