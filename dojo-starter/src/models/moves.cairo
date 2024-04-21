use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct MoveBook {
    #[key]
    move_id: u16,
    accuracy: u8,
    basepower: u16,
    category: MoveCategory,
    name: felt252,
    pp: u16,
    priority: u8,
    secondary: u16,
    target: MoveTarget,
    moveSystemCallBack: u16,
    flags: u16,
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum MoveCategory {
    Physical,
    Special,
    Status
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum MoveTarget {
    Any,
    Self,
    Normal,
    AllAdjacent,
    AllyTeam
}

#[derive(Copy, Drop, Serde, PartialEq, Introspect)]
enum SideEffect {
    Burn,
    Paralyzed,
    Frozen,
    Sleep,
    Poison,
    Confusion,
    Flinch
}

#[derive(Model, Copy, Drop, Serde)]
struct Gen1RandomMoveSet {
    #[key]
    poke_id: u32,
    move_1: u16,
    move_2: u16,
    move_3: u16,
    move_4: u16
}
