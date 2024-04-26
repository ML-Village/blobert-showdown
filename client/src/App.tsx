import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { feltToString } from "./utils/starknet";
import Navbar from "./components/Navbar";
import { Spinner } from "flowbite-react";
import BlobberCarousel from "./components/Carousel/BlobberCarousel";

function App() {
  const {
    setup: {
      systemCalls: { register_player}, // already return a function (WRITE)
      clientComponents: { Player }, // return a client Component
    },
    account,
  } = useDojo();

  // entity id we are syncing (READ)
  const entityId = getEntityIdFromKeys([
    BigInt(account?.account.address),
  ]) as Entity;

  const player = useComponentValue(Player, entityId);

  // Console log
  console.log("PlAYER", player);

  return (
    <>
      <div className="min-h-screen bg-gray-800 px-60">
        {/* blobert navbar */}
        <Navbar />

        {/* create burner/clear burner */}
        <div className="flex text-orange-950 my-2">
          <div>
            {account?.isDeploying ? (
              <div className="w-full flex items-center justify-center">
                <Spinner
                  size="lg"
                  color="failure"
                  aria-label="Summoning Blobber"
                />
              </div>
            ) : (
              <button
                className={`
                        ${account.count >= 4 ? "bg-orange-900" : "bg-orange-300"} 
                        ${account.count >= 4 ? "text-white" : "text-orange-950"} 
                        border-2 border-orange-950
                        font-semibold
                        px-2 py-2 rounded-lg w-full`}
                onClick={() => account?.create()}
                disabled={account.count >= 4}
              >
                {account.count >= 4
                  ? "You have enough Blobbers."
                  : "Summon A Blobber"}
              </button>
            )}
          </div>
          <button
            className="bg-orange-300 border-2 border-orange-950 font-semibold mx-2 px-2 py-2 rounded-lg w-30"
            onClick={() => account.clear()}
          >
            Kick All Blobbers
          </button>
          <span className="flex items-center justify-end font-semibold mx-2 px-2 text-white">
            {`Summoned Blobbers: ${account.count}/4`}
          </span>
          <button
            className=" bg-green-700 border-2 border-orange-950 font-semibold mx-2 px-2 py-2 rounded-lg w-30"
            onClick={() =>
              alert(feltToString(String(player?.name ?? "")) ?? "")
            }
          >
            Check user
          </button>
        </div>

        {/* Blobbers carousel */}
        <div className="my-2">
          <BlobberCarousel />
        </div>

        {/* <button className=" bg-white" onClick={()=>{set_full_lineup(account.account,0,1,2,3,4,5,6)}}>
          Apply
        </button> */}
      </div>

      {/* Example */}
      <div className=" min-h-screen flex items-center justify-center flex-col">
        <button onClick={() => account.create()}> Create</button>
        <button onClick={() => account.clear()}> Clear</button>
        <div>
          select signer:{" "}
          <select
            value={account ? account.account.address : ""}
            onChange={(e) => account.select(e.target.value)}
          >
            {account?.list().map((account, index) => {
              return (
                <option value={account.address} key={index}>
                  {account.address}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={() => register_player(account.account, "cliff", 1)}>
          Register
        </button>
        <span>{feltToString(String(player?.name ?? "")) ?? ""}</span>
      </div>
    </>
  );
}

export default App;
