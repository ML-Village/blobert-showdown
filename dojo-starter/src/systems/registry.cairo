use dojo_starter::models::bloberts::BlobertDex;

#[starknet::interface]
trait IRegistry<TContractState> {
    fn create_blobert(
        self: @TContractState,
        blob_id: u32,
        name: felt252,
        randomlvl: u8,
        hp: u16,
        atk: u16,
        def: u16,
        spa: u16,
        spd: u16,
        spe: u16,
    );
}

#[dojo::contract]
mod registry {
    use super::{IRegistry};
    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::{bloberts::{BlobertDex}};

    #[abi(embed_v0)]
    impl RegistryImpl of IRegistry<ContractState> {
        fn create_blobert(
            self: @ContractState,
            blob_id: u32,
            name: felt252,
            randomlvl: u8,
            hp: u16,
            atk: u16,
            def: u16,
            spa: u16,
            spd: u16,
            spe: u16,
        ) {
            let blobert = BlobertDex { blob_id, name, randomlvl, hp, atk, def, spa, spd, spe };

            set!(self.world(), (blobert));
        }
    }
}
