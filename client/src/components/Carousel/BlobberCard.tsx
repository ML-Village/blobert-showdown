import { Burner } from "@dojoengine/create-burner";
import { useEffect, useRef, useState } from "react";
import { publicBlobbersPath } from "../../constants/blobbers";
import { feltToString, stringToFelt } from "../../utils/starknet";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity, Has } from "@dojoengine/recs";
import { useDojo } from "../../dojo/useDojo";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { ChooseBlobertModel } from "../PickBlobert";
import { publicBlobertsPath } from "../../constants";

export const BlobberCard = ({
  accountTarget,
  blobbersIndex,
  burnerAddress,
  selected,
}: {
  accountTarget: Burner;
  blobbersIndex: number;
  burnerAddress: string;
  selected: boolean;
}) => {
  const {
    setup: {
      systemCalls: { register_player }, // already return a function WRITE
      clientComponents: { Player, Lineup }, // return a client Component
    },
    account,
  } = useDojo();

  // READ FUNCTION
  // const has = useEntityQuery([Has(Player)]); // to check all entityid in a model
  const entityId = getEntityIdFromKeys([BigInt(burnerAddress)]) as Entity;
  const entityId2 = getEntityIdFromKeys([
    BigInt(burnerAddress),
    BigInt(0),
  ]) as Entity;
  const lineup = useComponentValue(Lineup, entityId2);
  const player = useComponentValue(Player, entityId);
  // console log
  console.log("LINEUP", lineup?.slot1);

  const handleRegisterName = () => {
    if (!nameInputValue) {
      alert("Input name");
      return;
    }

    console.log(stringToFelt(nameInputValue));
    register_player(account.account, nameInputValue, blobbersIndex);
    setNameInputValue(""); // Clear the input field
  };

  // input config
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [nameInputValue, setNameInputValue] = useState("");
  const handleNameInputChange = (e: any) => {
    setNameInputValue(e.target.value);
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className={`${selected ? "border-2 border-yellow-400" : "border border-white"}
        rounded-lg p-4 bg-orange-200/30 w-[880px] flex items-center mb-2`}
    >
      {/* profile image */}
      <div
        className={`${selected ? `border-orange-500` : `border-white`}
            mx-2 h-28 w-28 border rounded-lg flex items-center justify-center`}
      >
        <img
          className="w-full"
          src={publicBlobbersPath[blobbersIndex % publicBlobbersPath.length]}
          alt="..."
        />
      </div>

      {/* data section */}
      <div className="flex flex-col w-full">
        {/* input name and register button */}
        <div className="flex mt-2 mx-2">
          <label className="mr-2 flex justify-center items-center text-white">
            Blobber Name
          </label>

          <input
            className="flex-grow rounded-lg mx-2 text-gray-800 bg-slate-300
           focus:no-outline focus:ring-2 focus:ring-offset-transparent 
           focus:border-yellow-500 focus:ring-yellow-500
            "
            type="text"
            placeholder={
              feltToString(String(player?.name ?? "")) || "Enter Blobber name"
            }
            maxLength={20}
            value={nameInputValue}
            onChange={handleNameInputChange}
            ref={nameInputRef}
            onClick={() => nameInputRef.current?.focus()}
            disabled={feltToString(String(player?.name ?? "")) !== ""}
          />
          <button
            className={`border border-white rounded-lg px-2 text-white 
              ${
                feltToString(String(player?.name ?? "")) === ""
                  ? `bg-orange-800 hover:bg-orange-600`
                  : `bg-gray-800`
              }
              `}
            onClick={handleRegisterName}
            disabled={feltToString(String(player?.name ?? "")) !== ""}
          >
            {feltToString(String(player?.name ?? "")) === ""
              ? `Register Name`
              : `Blobber Registered`}
          </button>
        </div>

        {/* signer address and select blobber button */}
        <div
          className="mx-2 my-2 flex items-center text-sm text-white
            "
        >
          <span>signer: {burnerAddress}</span>
          <button
            className={`ml-auto p-2 rounded-md
              ${
                selected
                  ? `bg-yellow-300/35 border-2 border-orange-500`
                  : `border-2 border-green-900 bg-emerald-500 text-black font-semibold hover:bg-green-800 hover:text-white`
              }
              `}
            disabled={selected}
            onClick={() => account.select(burnerAddress)}
          >
            {selected ? `Blobber Selected` : `Use This Blobber`}
          </button>
        </div>

        {/* configure blobert lineup */}
        <div className=" flex items-center justify-center">
          <div className="flex grid-cols-6 gap-1 justify-between w-full mx-1 px-1">
            <img
              className="h-20 border rounded-lg"
              src={
                lineup?.slot1 === undefined || lineup?.slot1 === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot1) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                lineup?.slot2 === undefined || lineup?.slot1 === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot2) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                lineup?.slot3 === undefined || lineup?.slot1 === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot3) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                lineup?.slot4 === undefined || lineup?.slot1 === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot4) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                lineup?.slot5 === undefined || lineup?.slot1 === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot5) - 1) % publicBlobertsPath.length
                    ]
              }
            />
            <img
              className="h-20 border rounded-lg"
              src={
                lineup?.slot6 === undefined || lineup?.slot1 === 0
                  ? "/pc.png"
                  : publicBlobertsPath[
                      (Number(lineup?.slot6) - 1) % publicBlobertsPath.length
                    ]
              }
            />
          </div>

          <button
            className="bg-orange-300 shrink px-2 py-2 border rounded-lg text-wrap text-sm"
            onClick={() => setOpenModal(true)}
          >
            configure Blobert Line-up
          </button>
          <ChooseBlobertModel
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
    </div>
  );
};
