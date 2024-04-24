/* Autogenerated file. Do not edit manually. */

import { Account, AccountInterface, num } from "starknet";
import { DojoProvider } from "@dojoengine/core";
import { Direction } from "../../utils";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export interface MoveProps {
  account: Account | AccountInterface;
  direction: Direction;
}

export async function setupWorld(provider: DojoProvider) {
  // function actions() {
  //   const contract_name = "actions";

  //   const spawn = async ({ account }: { account: AccountInterface }) => {
  //     try {
  //       return await provider.execute(account, contract_name, "spawn", []);
  //     } catch (error) {
  //       console.error("Error executing spawn:", error);
  //       throw error;
  //     }
  //   };

  //   const move = async ({ account, direction }: MoveProps) => {
  //     try {
  //       return await provider.execute(account, contract_name, "move", [
  //         direction,
  //       ]);
  //     } catch (error) {
  //       console.error("Error executing move:", error);
  //       throw error;
  //     }
  //   };
  //   return { spawn, move };
  // }

  function lobby() {
    const contract_name = "lobby";

    const register_player = async ({
      account,
      name,
      profile_pic,
    }: {
      account: AccountInterface;
      name: string;
      profile_pic: number;
    }) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "register_player",
          [name, profile_pic]
        );
      } catch (error) {
        console.error("Error executing register_player:", error);
        throw error;
      }
    };

    const set_profile_pic = async ({
      account,
      profile_pic,
    }: {
      account: AccountInterface;
      profile_pic: number;
    }) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "set_profile_pic",
          [profile_pic]
        );
      } catch (error) {
        console.error("Error executing set_profile_pic:", error);
        throw error;
      }
    };

    const set_full_lineup = async ({
      account,
      game_id,
      slot1,
      slot2,
      slot3,
      slot4,
      slot5,
      slot6,
    }: {
      account: AccountInterface;
      game_id: number;
      slot1: number;
      slot2: number;
      slot3: number;
      slot4: number;
      slot5: number;
      slot6: number;
    }) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "set_full_lineup",
          [game_id, slot1, slot2, slot3, slot4, slot5, slot6]
        );
      } catch (error) {
        console.error("Error executing set_full_lineup:", error);
        throw error;
      }
    };

    const create_battle_room = async ({
      account,
      turn_expiry,
      total_turn_time,
    }: {
      account: AccountInterface;
      turn_expiry: number;
      total_turn_time: number;
    }) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "create_battle_room",
          [turn_expiry, total_turn_time]
        );
      } catch (error) {
        console.error("Error executing create_battle_room:", error);
        throw error;
      }
    };

    const challenge_player = async ({
      account,
      target_player,
      turn_expiry,
      total_turn_time,
      challenge_expiry,
    }: {
      account: AccountInterface;
      target_player: bigint;
      turn_expiry: number;
      total_turn_time: number;
      challenge_expiry: number;
    }) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "challenge_player",
          [target_player, turn_expiry, total_turn_time, challenge_expiry]
        );
      } catch (error) {
        console.error("Error executing challenge_player:", error);
        throw error;
      }
    };

    const accept_challenge = async ({
      account,
      game_id,
    }: {
      account: AccountInterface;
      game_id: number;
    }) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "accept_challenge",
          [game_id]
        );
      } catch (error) {
        console.error("Error executing accept_challenge:", error);
        throw error;
      }
    };

    return {
      register_player,
      set_profile_pic,
      set_full_lineup,
      create_battle_room,
      challenge_player,
      accept_challenge,
    };
  }

  return {
    // actions: actions(),
    lobby: lobby()
  };
}
