import { AccountInterface } from "starknet";
import {
  getEvents,
  setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  contractComponents: ContractComponents
) {
  const register_player = async (
    account: AccountInterface,
    name: string,
    profile_pic: number
  ) => {
    try {
      const { transaction_hash } = await client.lobby.register_player({
        account,
        name,
        profile_pic,
      });
      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const set_profile_pic = async (
    account: AccountInterface,
    profile_pic: number
  ) => {
    try {
      const { transaction_hash } = await client.lobby.set_profile_pic({
        account,
        profile_pic,
      });

      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const set_full_lineup = async (
    account: AccountInterface,
    game_id: number,
    slot1: number,
    slot2: number,
    slot3: number,
    slot4: number,
    slot5: number,
    slot6: number
  ) => {
    try {
      const { transaction_hash } = await client.lobby.set_full_lineup({
        account,
        game_id,
        slot1,
        slot2,
        slot3,
        slot4,
        slot5,
        slot6,
      });
      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const create_battle_room = async (
    account: AccountInterface,
    turn_expiry: number,
    total_turn_time: number
  ) => {
    try {
      const { transaction_hash } = await client.lobby.create_battle_room({
        account,
        turn_expiry,
        total_turn_time,
      });

      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const challenge_player = async (
    account: AccountInterface,
    target_player: bigint,
    turn_expiry: number,
    total_turn_time: number,
    challenge_expiry: number
  ) => {
    try {
      const { transaction_hash } = await client.lobby.challenge_player({
        account,
        target_player,
        turn_expiry,
        total_turn_time,
        challenge_expiry,
      });

      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
      //Game.removeOverride(gameId);
    } finally {
      //Game.removeOverride(gameId);
    }
  };

  const accept_challenge = async (
    account: AccountInterface,
    game_id: any
  ) => {
    try {
      const { transaction_hash } = await client.lobby.accept_challenge({
        account,
        game_id,
      });

      console.log(
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );

      setComponentsFromEvents(
        contractComponents,
        getEvents(
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 100,
          })
        )
      );
    } catch (e) {
      console.log(e);
      //Game.removeOverride(gameId);
    } finally {
      //Game.removeOverride(gameId);
    }
  };

  return {
    register_player,
    set_profile_pic,
    set_full_lineup,
    create_battle_room,
    challenge_player,
    accept_challenge
  };
}
