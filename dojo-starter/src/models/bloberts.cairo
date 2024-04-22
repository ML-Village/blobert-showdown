use starknet::ContractAddress;

#[derive(Model, Copy, Drop, Serde)]
struct BlobertDex {
    #[key]
    blob_id: u32,
    name: felt252,
    randomlvl: u8,
    hp: u16,
    atk: u16,
    def: u16,
    spa: u16,
    spd: u16,
    spe: u16,
}
