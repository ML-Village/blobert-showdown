import { CustomFlowbiteTheme, Dropdown, Modal } from "flowbite-react";
import { feltToString } from "../../utils/starknet";
import { publicBlobbersPath, publicBlobertsPath } from "../../constants";
import { useState } from "react";
import { useDojo } from "../../dojo/useDojo";

const customModalThem: CustomFlowbiteTheme["modal"] = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
    show: {
      on: "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
      off: "hidden",
    },
  },
  content: {
    base: "relative h-full w-full p-4 md:h-auto",
    inner:
      "bg-orange-200/95 relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
  body: {
    base: "flex-1 overflow-auto p-6",
    popup: "pt-0",
  },
  header: {
    base: "flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600",
    popup: "border-b-0 p-2",
    title: "text-xl font-medium text-gray-900 dark:text-white",
    close: {
      base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-700 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      icon: "h-5 w-5",
    },
  },
};

interface RowModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  player: any;
  lineup: any;
}

export default function RowModal({
  openModal,
  setOpenModal,
  player,
  lineup,
}: RowModalProps) {
  const {
    setup: {
      systemCalls: { challenge_player }, // already return a function WRITE
    },
    account,
  } = useDojo();

  const [turnLabel, setTurnLabel] = useState("1 hour");
  const [totalLabel, setTotalLabel] = useState("1 hour");
  const [challengeLabel, setChallengeLabel] = useState("1 hour");

  // console.log(player);

  return (
    <Modal
      theme={customModalThem}
      dismissible
      position="top-center"
      size="5xl"
      popup
      show={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>
        <div className="w-full py-2 px-4 pt-7 text-2xl font-bold">
          {feltToString(String(player?.name ?? ""))}
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-start">
          {/* blobbers and stats */}
          <div className="w-full flex justify-between items-center">
            {/* blobbers div */}
            <div className="w-fit grid grid-cols-6 gap-2">
              <div className="flex items-center justify-center">
                <img
                  className="h-16 rounded-lg border border-gray-800"
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
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="h-16 rounded-lg border border-gray-800"
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
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="h-16 rounded-lg border border-gray-800"
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
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="h-16 rounded-lg border border-gray-800"
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
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="h-16 rounded-lg border border-gray-800"
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
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="h-16 rounded-lg border border-gray-800"
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
                />
              </div>
            </div>

            {/* stats div */}
            <div className="mr-8">
              <div className="flex flex-col items-end justify-center text-xl font-bold text-gray-800">
                <span>Total Games: {player?.total_duels}</span>
                <span>
                  Win Rate:
                  {player?.total_duels > 0
                    ? `${Math.round((player?.total_wins / player?.total_duels) * 100)}%`
                    : "0%"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex">
            <div>
              <img
                className=" h-24"
                src={
                  publicBlobbersPath[
                    player?.profile_pic % publicBlobbersPath.length
                  ]
                }
              />
            </div>
            <div>
              <h1 className=" text-2xl">Challenge condiiton</h1>
              <h2> turn expiry</h2>
              <Dropdown label={turnLabel} dismissOnClick={false}>
                <Dropdown.Item onClick={() => setTurnLabel("1 hour")}>
                  1 hour
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTurnLabel("2 hours")}>
                  2 hours
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTurnLabel("3 hours")}>
                  3 hours
                </Dropdown.Item>
              </Dropdown>
              <h2> total_turn_time</h2>
              <Dropdown label={totalLabel} dismissOnClick={false}>
                <Dropdown.Item onClick={() => setTotalLabel("1 hour")}>
                  1 hour
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTotalLabel("2 hours")}>
                  2 hours
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setTotalLabel("3 hours")}>
                  3 hours
                </Dropdown.Item>
              </Dropdown>
              <h2> challenge_expiry</h2>
              <Dropdown label={challengeLabel} dismissOnClick={false}>
                <Dropdown.Item onClick={() => setChallengeLabel("1 hour")}>
                  1 hour
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setChallengeLabel("2 hours")}>
                  2 hours
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setChallengeLabel("3 hours")}>
                  3 hours
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          <div className="flex gap-8 mt-10">
            <button
              className="border-2 rounded-xl m-2 p-2"
              onClick={() =>
                challenge_player(account.account, player?.player_id,10,10,10)
              }
            >
              Challenge to a showdown
            </button>
            <button className="border-2 rounded-xl m-2 p-2">Cancel</button>
          </div>

          {/* showdown challenge buttons
            <div className=" mt-10 w-full flex justify-start items-center text-orange-200 font-medium gap-2">
              <button className="bg-[#664A44] px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-white">
                Challenge Blobber to A ShowDown!
              </button>
              <button className="bg-[#664A44] px-4 py-2 rounded-lg hover:bg-blue-800/50">
                Nvm Me too Sked.
              </button>
            </div> */}
        </div>
      </Modal.Body>
    </Modal>
  );
}
