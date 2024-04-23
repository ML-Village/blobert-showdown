use core::traits::Into;
use core::traits::TryInto;
use core::clone::Clone;
use starknet::ContractAddress;
use array::{ArrayTrait, Array};
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use dojo_starter::models::{
    game::{BlobertInGame, BlobertGameStatus}, bloberts::BlobertDex, player::Lineup,
    moves::{MoveBook, Gen1RandomMoveSet, SideEffect}
};

fn battle_start(
    world: IWorldDispatcher, player_a: ContractAddress, player_b: ContractAddress, game_id: u128
) {
    //first , we need to set the player_a blobert in game 1 - 6 
    let blobert_lineup: Lineup = get!(world, (player_a, game_id), Lineup);

    let mut a: Array<u32> = ArrayTrait::new();
    a.append(blobert_lineup.slot1);
    a.append(blobert_lineup.slot2);
    a.append(blobert_lineup.slot3);
    a.append(blobert_lineup.slot4);
    a.append(blobert_lineup.slot5);
    a.append(blobert_lineup.slot6);

    let mut number: u32 = 0;
    while number <= 5 {
        let blobert_id = a[number].clone();
        let mut slot = 1;
        let (
            lvl_1,
            hp_1,
            atk_1,
            def_1,
            spa_1,
            spd_1,
            spe_1,
            move_1,
            move_1_limit,
            move_2,
            move_2_limit,
            move_3,
            move_3_limit,
            move_4,
            move_4_limit
        ) =
            get_blobert_stats(
            world, blobert_id
        );

        let blobert = BlobertInGame {
            game_id,
            player_id: player_a,
            slot: slot,
            blob_id: blobert_lineup.slot1,
            lvl: lvl_1,
            hp: hp_1,
            atk: atk_1,
            def: def_1,
            spa: spa_1,
            spd: spd_1,
            spe: spe_1,
            move1: move_1,
            move1_limit: move_1_limit,
            move2: move_2,
            move2_limit: move_2_limit,
            move3: move_3,
            move3_limit: move_3_limit,
            move4: move_4,
            move4_limit: move_4_limit,
            side_effect1: SideEffect::None,
            side_effect2: SideEffect::None,
            side_effect3: SideEffect::None,
            side_effect4: SideEffect::None,
            status: BlobertGameStatus::Alive
        };

        slot += 1;
        number += 1;

        set!(world, (blobert));
    };

    //first , we need to set the player_a blobert in game 1 - 6 
    let blobert_lineup: Lineup = get!(world, (player_b, game_id), Lineup);

    let mut b: Array<u32> = ArrayTrait::new();
    b.append(blobert_lineup.slot1);
    b.append(blobert_lineup.slot2);
    b.append(blobert_lineup.slot3);
    b.append(blobert_lineup.slot4);
    b.append(blobert_lineup.slot5);
    b.append(blobert_lineup.slot6);

    let mut number: u32 = 0;
    while number <= 5 {
        let blobert_id = b[number].clone();
        let mut slot = 1;
        let (
            lvl_1,
            hp_1,
            atk_1,
            def_1,
            spa_1,
            spd_1,
            spe_1,
            move_1,
            move_1_limit,
            move_2,
            move_2_limit,
            move_3,
            move_3_limit,
            move_4,
            move_4_limit
        ) =
            get_blobert_stats(
            world, blobert_id
        );

        let blobert = BlobertInGame {
            game_id,
            player_id: player_b,
            slot: slot,
            blob_id: blobert_lineup.slot1,
            lvl: lvl_1,
            hp: hp_1,
            atk: atk_1,
            def: def_1,
            spa: spa_1,
            spd: spd_1,
            spe: spe_1,
            move1: move_1,
            move1_limit: move_1_limit,
            move2: move_2,
            move2_limit: move_2_limit,
            move3: move_3,
            move3_limit: move_3_limit,
            move4: move_4,
            move4_limit: move_4_limit,
            side_effect1: SideEffect::None,
            side_effect2: SideEffect::None,
            side_effect3: SideEffect::None,
            side_effect4: SideEffect::None,
            status: BlobertGameStatus::Alive
        };

        slot += 1;
        number += 1;

        set!(world, (blobert));
    };
}

#[inline(always)]
fn get_blobert_stats(
    world: IWorldDispatcher, blobert_id: u32
) -> (u8, u16, u16, u16, u16, u16, u16, u16, u8, u16, u8, u16, u8, u16, u8) {
    let blobert: BlobertDex = get!(world, blobert_id, BlobertDex);

    let lvl = blobert.randomlvl;
    let hp = blobert.hp;
    let atk = blobert.atk;
    let def = blobert.def;
    let spa = blobert.spa;
    let spd = blobert.spd;
    let spe = blobert.spe;

    let moves: Gen1RandomMoveSet = get!(world, blobert_id, Gen1RandomMoveSet);

    let move_1: MoveBook = get!(world, moves.move_1, MoveBook);
    let move_2: MoveBook = get!(world, moves.move_2, MoveBook);
    let move_3: MoveBook = get!(world, moves.move_3, MoveBook);
    let move_4: MoveBook = get!(world, moves.move_4, MoveBook);

    (
        lvl,
        hp,
        atk,
        def,
        spa,
        spd,
        spe,
        move_1.move_id,
        move_1.move_limit,
        move_2.move_id,
        move_2.move_limit,
        move_3.move_id,
        move_3.move_limit,
        move_4.move_id,
        move_4.move_limit
    )
}

#[inline(always)]
fn get_move_stats(world: IWorldDispatcher, move_id: u16) -> (felt252, u8) {
    let move: MoveBook = get!(world, move_id, MoveBook);

    (move.name, move.move_limit)
}
