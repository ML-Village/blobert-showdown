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
import { register } from "module";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { client }: { client: IWorld },
    contractComponents: ContractComponents,
    { Player, Lineup, Game, }: ClientComponents
) {
    
    const register_player = async (account: AccountInterface, name: string, profile_pic: number) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        // const playerId = uuid();
        // Player.addOverride(playerId, {
        //     entity: entityId,
        //     value: { 
        //         player: BigInt(entityId), 
        //         name: name,
        //         total_duels: 0,
        //         total_wins: 0,
        //         total_losses: 0,
        //         ranking: BigInt(0),
        //         timestamp: BigInt(Date.now()),
        //     },
        // });

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
            //Player.removeOverride(playerId);
        } finally {
            //Player.removeOverride(playerId);
        }
    }

    const set_profilepic = async (account: AccountInterface, profile_pic: number) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        // const playerId = uuid();
        // Player.addOverride(playerId, {
        //     entity: entityId,
        //     value: { 
        //         player: BigInt(entityId), 
        //         profile_pic: profile_pic,
        //     },
        // });

        try {
            const { transaction_hash } = await client.lobby.set_profilepic({
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
            //Player.removeOverride(playerId);
        } finally {
            //Player.removeOverride(playerId);
        }
    }

    const set_full_lineup = async (account: AccountInterface, game_id: BigInt, slot1: number, slot2: number, slot3: number, slot4: number, slot5: number, slot6: number) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        // const lineupId = uuid();
        // Lineup.addOverride(lineupId, {
        //     entity: entityId,
        //     value: { 
        //         player_id: BigInt(entityId), 
        //         game_id: game_id,
        //         slot1: slot1,
        //         slot2: slot2,
        //         slot3: slot3,
        //         slot4: slot4,
        //         slot5: slot5,
        //         slot6: slot6,
        //     },
        // });

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
            //Lineup.removeOverride(lineupId);
        } finally {
            //Lineup.removeOverride(lineupId);
        }
    }

    const create_battle_room = async (account: AccountInterface, turn_expiry:number, total_turn_time:number) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        // const gameId = uuid();
        // Game.addOverride(gameId, {
        //     entity: entityId,
        //     value: { 
        //         game_id: game_id, 
        //         player1: player1,
        //         player2: player2,
        //         turn: 0,
        //         turn_status: 0,
        //         move_a: { hash: BigInt(0), salt: BigInt(0), move: 0 },
        //         move_b: { hash: BigInt(0), salt: BigInt(0), move: 0 },
        //         timestamp_start: BigInt(Date.now()),
        //         timestamp_end: BigInt(Date.now()),
        //     },
        // });

        try {
            const { transaction_hash } = await client.lobby.create_battle_room({
                account,
                turn_expiry,
                total_turn_time
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
    }

    const challenge_player = async (account: AccountInterface, target_player: bigint, turn_expiry:number, total_turn_time:number, challenge_expiry:number) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        // const gameId = uuid();
        // Game.addOverride(gameId, {
        //     entity: entityId,
        //     value: { 
        //         game_id: game_id, 
        //         player1: player1,
        //         player2: player2,
        //         turn: 0,
        //         turn_status: 0,
        //         move_a: { hash: BigInt(0), salt: BigInt(0), move: 0 },
        //         move_b: { hash: BigInt(0), salt: BigInt(0), move: 0 },
        //         timestamp_start: BigInt(Date.now()),
        //         timestamp_end: BigInt(Date.now()),
        //     },
        // });

        try {
            const { transaction_hash } = await client.lobby.challenge_player({
                account,
                target_player,
                turn_expiry,
                total_turn_time,
                challenge_expiry
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

    }

    const accept_challenge = async (account: AccountInterface, game_id: number) => {
        const entityId = getEntityIdFromKeys([
            BigInt(account.address),
        ]) as Entity;

        // const gameId = uuid();
        // Game.addOverride(gameId, {
        //     entity: entityId,
        //     value: { 
        //         game_id: game_id, 
        //         player1: player1,
        //         player2: player2,
        //         turn: 0,
        //         turn_status: 0,
        //         move_a: { hash: BigInt(0), salt: BigInt(0), move: 0 },
        //         move_b: { hash: BigInt(0), salt: BigInt(0), move: 0 },
        //         timestamp_start: BigInt(Date.now()),
        //         timestamp_end: BigInt(Date.now()),
        //     },
        // });

        try {
            const { transaction_hash } = await client.lobby.accept_challenge({
                account,
                game_id
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

    }

    return {
        register_player,
        set_profilepic,
        set_full_lineup,
        create_battle_room,
        challenge_player,
        accept_challenge
    };
}
