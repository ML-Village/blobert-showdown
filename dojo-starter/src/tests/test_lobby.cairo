#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo_starter::models::{player::{Player, Lineup, player}};
    use dojo_starter::models::{bloberts::{BlobertDex, bloberts}};
    use dojo_starter::models::{game::{Game, GameStatus, game}};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};

    #[test]
    #[available_gas(30000000)]
    fn test_lobby_function() {
        let caller = starknet::contract_address_const::<0x0>();
        let caller_b = starknet::contract_address_const::<0x1111>();

        //models
        let mut models = array![player::TEST_CLASS_HASH, bloberts::TEST_CLASS_HASH, game::TEST_CLASS_HASH];

        //deploy world with models 
        let world = spawn_test_world(models);

        //deploy systems contract
        
    }

};
