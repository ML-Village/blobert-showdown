import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, updatePositionWithDirection } from "../utils";
import {
  getEntityIdFromKeys,
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

  return {
    register_player,
    set_full_lineup
  };
}
