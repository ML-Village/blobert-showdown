use starknet::{ContractAddress};
use dojo_starter::models::player::{Player, Lineup};

#[dojo::interface]
trait ILobby {

    fn register_player(name: felt252, profile_pic: u16);

    fn set_profilepic(profile_pic: u16);

    fn set_full_lineup(
        game_id: u128,
        slot1: u32,
        slot2: u32,
        slot3: u32,
        slot4: u32,
        slot5: u32,
        slot6: u32
    );

    //fn set_pokemon(slot:u8, pokemon_id: u32);
    fn create_battle_room(
        turn_expiry: u64, 
        total_turn_time: u64);

    fn challenge_player(
        target_player: ContractAddress, 
        turn_expiry: u64, 
        total_turn_time: u64,
        challenge_expiry: u64,
        );
    fn accept_challenge(game_id: u128);
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};

    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{player:: {Player, Lineup}};
    use dojo_starter::models::{pokemon:: {Pokedex}};
    use dojo_starter::models::{game:: {Game, GameStatus}};
    use dojo_starter::utils::{utils, seed_gen::{make_seed}};

    #[abi(embed_v0)]
    impl LobbyImpl of ILobby<ContractState> {
        fn register_player(world:IWorldDispatcher, name: felt252, profile_pic: u16) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let mut player = get!(world, caller, (Player));
            let mut lineup = get!(world, (caller,0), (Lineup));

            //player.player_id = caller;
            player.name = name;
            player.profile_pic = profile_pic;
            player.total_duels = 0;
            player.total_wins = 0;
            player.total_losses = 0;

            if (player.timestamp == 0) {
                player.timestamp = get_block_timestamp();
            }

            player.timestamp = get_block_timestamp();

            //lineup.player_id = caller;
            lineup.slot1 = 0;
            lineup.slot2 = 0;
            lineup.slot3 = 0;
            lineup.slot4 = 0;
            lineup.slot5 = 0;
            lineup.slot6 = 0;

            set!(world, (player, lineup));

            // TODO: emit event?
        }

        fn set_profilepic(world: IWorldDispatcher, profile_pic: u16) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let mut player = get!(world, caller, (Player));
            player.profile_pic = profile_pic;

            set!(world, (player));
        }

        fn set_full_lineup(world: IWorldDispatcher,
            game_id: u128,
            slot1: u32,
            slot2: u32,
            slot3: u32,
            slot4: u32,
            slot5: u32,
            slot6: u32
        ) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            //get the pokemon lineup of player
            let mut lineup: Lineup = get!(world, (caller,0), (Lineup));

            //Get all the pokemon from 1-6 if they exist
            let mut poke1: Pokedex = get!(world, slot1, (Pokedex));
            let mut poke2: Pokedex = get!(world, slot2, (Pokedex));
            let mut poke3: Pokedex = get!(world, slot3, (Pokedex));
            let mut poke4: Pokedex = get!(world, slot4, (Pokedex));
            let mut poke5: Pokedex = get!(world, slot5, (Pokedex));
            let mut poke6: Pokedex = get!(world, slot6, (Pokedex));

            //Do a check if its empty then its doesnt exist
            assert(poke1.name != '', 'Pokemon not found in Dex');
            assert(poke2.name != '', 'Pokemon not found in Dex');
            assert(poke3.name != '', 'Pokemon not found in Dex');
            assert(poke4.name != '', 'Pokemon not found in Dex');
            assert(poke5.name != '', 'Pokemon not found in Dex');
            assert(poke6.name != '', 'Pokemon not found in Dex');

            //set the pokemon lineup
            lineup.slot1 = slot1;
            lineup.slot2 = slot2;
            lineup.slot3 = slot3;
            lineup.slot4 = slot4;
            lineup.slot5 = slot5;
            lineup.slot6 = slot6;

            //set the lineup state change
            set!(world, (lineup));
        }

        fn create_battle_room(world: IWorldDispatcher, 
            turn_expiry: u64, 
            total_turn_time: u64) 
        {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let game_id = make_seed(caller);

            //Check if the lineup is filled , if not revert
            let lineup: Lineup = get!(world, (caller,0), (Lineup));
            assert((
                lineup.slot1 != 0 &&
                lineup.slot2 != 0 &&
                lineup.slot3 != 0 &&
                lineup.slot4 != 0 &&
                lineup.slot5 != 0 &&
                lineup.slot6 != 0
            ), 'Lineup is not ready');

            //If all good then just create the new game
            let game = Game {
                game_id: game_id,
                player_a: caller,
                player_b: utils::zero_address(),
                player_a_active_slot: 1,
                player_b_active_slot: 1,
                turn: 0,
                game_status: GameStatus::Awaiting,
                winner: utils::zero_address(),
                winner_slot: 0,
                turn_expiry: turn_expiry,
                challenge_expiry: 0,
                total_turn_time: total_turn_time,
                timestamp_start: get_block_timestamp(),
                timestamp_end: 0,
            };

            //set the state change
            set!(world, (game, 
                Lineup {
                    player_id: caller,
                    game_id: game_id,
                    slot1: lineup.slot1,
                    slot2: lineup.slot2,
                    slot3: lineup.slot3,
                    slot4: lineup.slot4,
                    slot5: lineup.slot5,
                    slot6: lineup.slot6
                }));
            
            // TODO: emit event?

        }

        fn challenge_player(world:IWorldDispatcher, 
            target_player: ContractAddress, 
            turn_expiry: u64, 
            total_turn_time: u64,
            challenge_expiry: u64,
            ){
                // Get the address of the current caller, possibly the player's address.
                let caller = get_caller_address();

                let game_id = make_seed(caller);

                //Check if the lineup is filled , if not revert
                let callerlineup: Lineup = get!(world, (caller,0), (Lineup));
                assert((
                    callerlineup.slot1 != 0 &&
                    callerlineup.slot2 != 0 &&
                    callerlineup.slot3 != 0 &&
                    callerlineup.slot4 != 0 &&
                    callerlineup.slot5 != 0 &&
                    callerlineup.slot6 != 0
                ), 'Lineup is not ready');

                //If all good then just create the new game
                let game = Game {
                    game_id: game_id,
                    player_a: caller,
                    player_b: target_player,
                    player_a_active_slot: 1,
                    player_b_active_slot: 1,
                    turn: 0,
                    game_status: GameStatus::Awaiting,
                    winner: utils::zero_address(),
                    winner_slot: 0,
                    turn_expiry: turn_expiry,
                    challenge_expiry: 0,
                    total_turn_time: total_turn_time,
                    timestamp_start: get_block_timestamp(),
                    timestamp_end: 0,
                };

                //set the state change
                set!(world, (game, 
                    Lineup {
                        player_id: caller,
                        game_id: game_id,
                        slot1: callerlineup.slot1,
                        slot2: callerlineup.slot2,
                        slot3: callerlineup.slot3,
                        slot4: callerlineup.slot4,
                        slot5: callerlineup.slot5,
                        slot6: callerlineup.slot6
                    }));

                // TODO: emit event?
            
            }

        
        fn accept_challenge(world:IWorldDispatcher, game_id: u128){
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            //Get the game
            let mut game = get!(world, game_id, (Game));

            // Check if target player is the caller
            assert(game.player_b == caller, 'Caller not Callenged Player');

            //Check if the challenged lineup is filled , if not revert
            let callerlineup: Lineup = get!(world, (caller,0), (Lineup));
            assert((
                callerlineup.slot1 != 0 &&
                callerlineup.slot2 != 0 &&
                callerlineup.slot3 != 0 &&
                callerlineup.slot4 != 0 &&
                callerlineup.slot5 != 0 &&
                callerlineup.slot6 != 0
            ), 'Lineup is not ready');

            //set the state change
            set!(world, (game, 
                Lineup {
                    player_id: caller,
                    game_id: game_id,
                    slot1: callerlineup.slot1,
                    slot2: callerlineup.slot2,
                    slot3: callerlineup.slot3,
                    slot4: callerlineup.slot4,
                    slot5: callerlineup.slot5,
                    slot6: callerlineup.slot6
            }));
            
            // TODO: emit event?

        }
    }
}

#[cfg(test)]
mod tests {}
