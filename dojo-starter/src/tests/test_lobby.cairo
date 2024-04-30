#[cfg(test)]
mod tests {
    use starknet::{class_hash::Felt252TryIntoClassHash, testing};
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};
    use dojo_starter::tests::utils::utils;
    use dojo_starter::utils::timestamp::timestamp;
    use dojo_starter::models::{player::{Player, Lineup, player}};
    use dojo_starter::models::{bloberts::{BlobertDex}};
    use dojo_starter::models::{game::{Game, GameStatus, game}};
    use dojo_starter::systems::lobby::{lobby, ILobbyDispatcher, ILobbyDispatcherTrait};
    use dojo_starter::systems::registry::{registry, IRegistryDispatcher, IRegistryDispatcherTrait};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};

    #[test]
    #[available_gas(30000000000)]
    fn test_lobby_function() {
        let caller = starknet::contract_address_const::<0x0>();
        let caller_b = starknet::contract_address_const::<0x1111>();

        //models
        let mut models = array![player::TEST_CLASS_HASH, game::TEST_CLASS_HASH];

        //deploy world with models 
        let world = spawn_test_world(models);

        //deploy systems contract
        let lobby_systems = ILobbyDispatcher {
            contract_address: world
                .deploy_contract('salt1', lobby::TEST_CLASS_HASH.try_into().unwrap())
        };

        let registry_systems = IRegistryDispatcher {
            contract_address: world
                .deploy_contract('salt2', registry::TEST_CLASS_HASH.try_into().unwrap())
        };

        //step 1 register all the blobert
        utils::register_blobert_registry(registry_systems, caller);

        //step 2 to test register both player 
        testing::set_contract_address(caller); //change caller

        lobby_systems.register_player('player_1', 0);
        utils::register_blobert_lineup(lobby_systems, caller);

        testing::set_contract_address(caller_b);

        lobby_systems.register_player('player_2', 0);
        utils::register_blobert_lineup(lobby_systems, caller_b);

        let player_1: Player = get!(world, caller, Player);

        let player_2: Player = get!(world, caller_b, Player);

        let current_game_id: u128 = 0;

        let blobert_lineup_1: Lineup = get!(world, (caller, current_game_id), Lineup);

        let blobert_lineup_2: Lineup = get!(world, (caller_b, current_game_id), Lineup);

        assert(player_1.name == 'player_1', 'Name of the player is wrong');
        assert(player_2.name == 'player_2', 'Name of the player is wrong');

        assert(blobert_lineup_1.slot1 == 1, 'Blobert ID is wrong on Player A');
        assert(blobert_lineup_2.slot1 == 1, 'Blobert ID is wrong on Player B');

        //step 3 challenge and accept

        let game_id = lobby_systems
            .challenge_player(
                caller, timestamp::from_days(1), timestamp::from_days(1), timestamp::from_days(1)
            );

        testing::set_contract_address(caller);
        lobby_systems.accept_challenge(game_id);
    }
}
