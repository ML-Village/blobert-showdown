use dojo_starter::models::pokemon::Pokedex;

#[dojo::interface]
trait IRegistry {

    fn create_pokemon(
        pokemon_id: u128,
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
    use dojo_starter::models::{pokemon::{Pokedex}};

    #[abi(embed_v0)]
    impl RegistryImpl of IRegistry<ContractState> {
        fn create_pokemon(world: IWorldDispatcher, 
            pokemon_id: u32, 
            name: felt252,
            randomlvl: u8,
            hp: u16,
            atk: u16,
            def: u16,
            spa: u16,
            spd: u16,
            spe: u16,
        ) {
            let pokemon = Pokedex {
                pokemon_id, 
                name, 
                randomlvl, 
                hp, 
                atk,
                def,
                spa,
                spd,
                spe
            };

            set!(world, (pokemon));
            return ();
        }
    }
}
