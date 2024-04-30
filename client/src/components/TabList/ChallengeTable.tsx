import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { useDojo } from "../../dojo/useDojo";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity, Has, HasValue } from "@dojoengine/recs";

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
  const filteredPlayer = useEntityQuery([
    HasValue(Game, { player_b: player?.player_id }),
  ]);

  const game = useComponentValue(Game, filteredPlayer[0]);

  // console.log("Has Game", game);
  // console.log("game id", game?.game_id);
  // console.log("player", player)

  return(
    <div>
      <h1>hello</h1>
      <button className="rounded-full p-2 border-2"
      onClick={()=> accept_challenge(account.account, game?.game_id)}
      >accept challenge</button>
    </div>


  ) 
}
