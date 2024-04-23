use traits::{Into, TryInto};
use starknet::{ContractAddress};

#[derive(Drop, starknet::Event)]
struct NewGameEvent {
    game_id: u128,
    player_a: ContractAddress,
    player_b: ContractAddress,
}

#[derive(Drop, starknet::Event)]
struct GameAcceptedEvent {
    game_id: u128,
    player_a: ContractAddress,
    player_b: ContractAddress,
    accepted: bool,
}

#[derive(Drop, starknet::Event)]
struct PlayerRegistered {
    player: ContractAddress,
    name: felt252,
    profile_pic: u16
}

#[derive(Drop, starknet::Event)]
struct ProfilePicSet {
    player: ContractAddress,
    profile_pic: u16
}

#[derive(Drop, starknet::Event)]
struct LineupSet {
    player: ContractAddress,
    slot1: u32,
    slot2: u32,
    slot3: u32,
    slot4: u32,
    slot5: u32,
    slot6: u32
}

#[derive(Drop, starknet::Event)]
struct BattleRoomCreated {
    player: ContractAddress,
    game_id: u128,
    turn_expiry: u64
}

#[derive(Drop, starknet::Event)]
struct PlayerChallenged {
    player: ContractAddress,
    game_id: u128,
    turn_expiry: u64,
    challenge_expiry: u64
}

#[derive(Drop, starknet::Event)]
struct ChallengeAccepted {
    player: ContractAddress,
    game_id: u128,
}

