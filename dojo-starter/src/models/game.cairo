use starknet::ContractAddress;
use dojo_starter::models::moves::{SideEffect};

#[derive(Model, Copy, Drop, Serde)]
struct Game {
    #[key]
    game_id: u128,

    player_a: ContractAddress, // challenger
    player_b: ContractAddress, // challenged

    player_a_active_slot: u8,
    player_b_active_slot: u8,

    turn: u16, // turn number
    game_status: GameStatus,
    winner: ContractAddress,
    winner_slot: u8, // 0: technical expired, 1: player a, 2: player b

    // timestamps in unix epoch
    turn_expiry: u64,           // Unix time, time for each turn to expire (0 for unlimited)
    challenge_expiry: u64,      // Unix time, time for challenge to expire (0 for unlimited)
    total_turn_time: u64,       // Unix time, total game time (0 for unlimited)
    timestamp_start: u64,       // Unix time, started
    timestamp_end: u64,         // Unix time, ended
}

//
// The shot of each player on a Round
#[derive(Copy, Drop, Serde, Introspect)]
struct GameMove {
    // player input
    hash: u64,          // hashed action (salt + action)
    salt: u64,          // the player's secret salt
    move: u16,        // the player's chosen action 
} // 224 bits

// Each duel round
#[derive(Model, Copy, Drop, Serde)]
struct Turn {
    #[key]
    game_id: u128,
    #[key]
    turn_status: u8,
    //---------------
    state: u8,      // turn state
    move_a: GameMove,   // player_a move
    move_b: GameMove,   // player_b move

    // timestamps in unix epoch
    timestamp_start: u64,       // Unix time, started
    timestamp_end: u64,         // Unix time, ended
} // (8 + 224 + 224) = 456 bits ~ 2 felts (max 504)


#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum TurnStatus {
    Null,
    Commit,
    Reveal,
    Finish
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum GameStatus {
    Null,
    Awaiting,
    Withdrawn,
    Refused,
    Expired,
    InProgress,
    Ended
}

#[derive(Model, Copy, Drop, Serde)]
struct PokeInGame {
    #[key]
    game_id: u32,
    #[key]
    player_id: ContractAddress,
    #[key]
    slot: u8,

    pokemon_id: u32,

    lvl: u8,
    hp: u16,
    atk: u16,
    def: u16,
    spa: u16,
    spd: u16,
    spe: u16,

    move1: u16,
    move1_limit: u8,
    move2: u16,
    move2_limit: u8,
    move3: u16,
    move3_limit: u8,
    move4: u16,
    move4_limit: u8,

    side_effect1: SideEffect,
    side_effect2: SideEffect,
    side_effect3: SideEffect,
    side_effect4: SideEffect,

    status: PokeGameStatus
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum PokeGameStatus {
    Alive,
    Fainted,
}