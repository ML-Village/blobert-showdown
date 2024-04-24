import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { useEffect, useState } from "react";
import "./App.css";
import { Direction } from "./utils";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "./dojo/useDojo";
import { feltToString } from "./utils/starknet";




function App() {

  const {
    setup: {
      systemCalls: { register }, // already return a function (WRITE)
      clientComponents: { Player }, // return a client Component
    },
    account,
  } = useDojo();

   // entity id we are syncing (READ)
   const entityId = getEntityIdFromKeys([
    BigInt(account?.account.address),
  ]) as Entity;

  const player = useComponentValue(Player,entityId);

  console.log("player", player)

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center flex flex-col">
        <button onClick={()=> register(account.account, "owen", 1)} >CHECK</button>
        <span>{feltToString(String(player?.name ?? "")) ?? ""}</span>
      </div>
    </>
  );
}

export default App;
