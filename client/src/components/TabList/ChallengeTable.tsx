import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import { useDojo } from "../../dojo/useDojo";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity, Has, HasValue } from "@dojoengine/recs";

export default function ChallengeTable() {
  const {
    setup: {
      systemCalls: { register_player }, // already return a function WRITE
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

  const game = useComponentValue(Game, filteredPlayer);

  console.log("Has Game", game);

  return <div>hello</div>;
}
