use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    player_id: ContractAddress,
    //------------------------
    name: felt252,
    profile_pic: u16,
    total_duels: u16,
    total_wins: u16,
    total_losses: u16,
    ranking: u256,
    timestamp: u64, // Unix time, 1st registered
}

#[derive(Model, Copy, Drop, Serde)]
struct Lineup {
    #[key]
    player_id: ContractAddress,
    #[key]
    game_id: u128,

    slot1: u32,
    slot2: u32,
    slot3: u32,
    slot4: u32,
    slot5: u32,
    slot6: u32,
}


