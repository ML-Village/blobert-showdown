use starknet::{ContractAddress};
use dojo_starter::models::player::{Player, Lineup};

#[starknet::interface]
trait ILobby<TContractState> {
    fn register_player(self: @TContractState, name: felt252, profile_pic: u16);

    fn set_profile_pic(self: @TContractState, profile_pic: u16);

    fn set_full_lineup(
        self: @TContractState,
        game_id: u128,
        slot1: u32,
        slot2: u32,
        slot3: u32,
        slot4: u32,
        slot5: u32,
        slot6: u32
    );

    //fn set_blobert(slot:u8, blob_id: u32);
    fn create_battle_room(self: @TContractState, turn_expiry: u64, total_turn_time: u64);

    fn challenge_player(
        self: @TContractState,
        target_player: ContractAddress,
        turn_expiry: u64,
        total_turn_time: u64,
        challenge_expiry: u64,
    );
    
    fn accept_challenge(self: @TContractState, game_id: u128);
}

#[dojo::contract]
mod lobby {
    use super::{ILobby};

    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use dojo_starter::models::{player::{Player, Lineup}};
    use dojo_starter::models::{bloberts::{BlobertDex}};
    use dojo_starter::models::{game::{Game, GameStatus}};
    use dojo_starter::utils::{utils, seed_gen::{make_seed}};
    use dojo_starter::types::events;
    use dojo_starter::systems::{utils as util};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PlayerRegistered: events::PlayerRegistered,
        ProfilePicSet: events::ProfilePicSet,
        LineupSet: events::LineupSet,
        BattleRoomCreated: events::BattleRoomCreated,
        PlayerChallenged: events::PlayerChallenged,
        ChallengedAccepted: events::ChallengeAccepted
    }

    #[abi(embed_v0)]
    impl LobbyImpl of ILobby<ContractState> {
        fn register_player(self: @ContractState, name: felt252, profile_pic: u16) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let mut player = get!(self.world(), caller, (Player));
            let mut lineup = get!(self.world(), (caller, 0), (Lineup));

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

            set!(self.world(), (player, lineup));

            emit!(self.world(), events::PlayerRegistered { player: caller, name, profile_pic })
        }

        fn set_profile_pic(self: @ContractState, profile_pic: u16) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let mut player = get!(self.world(), caller, (Player));
            player.profile_pic = profile_pic;

            set!(self.world(), (player));

            emit!(self.world(), events::ProfilePicSet { player: caller, profile_pic })
        }

        fn set_full_lineup(
            self: @ContractState,
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

            //get the blobert lineup of player
            let mut lineup: Lineup = get!(self.world(), (caller, 0), (Lineup));

            //Get all the blobert from 1-6 if they exist
            let mut blob1: BlobertDex = get!(self.world(), slot1, (BlobertDex));
            let mut blob2: BlobertDex = get!(self.world(), slot2, (BlobertDex));
            let mut blob3: BlobertDex = get!(self.world(), slot3, (BlobertDex));
            let mut blob4: BlobertDex = get!(self.world(), slot4, (BlobertDex));
            let mut blob5: BlobertDex = get!(self.world(), slot5, (BlobertDex));
            let mut blob6: BlobertDex = get!(self.world(), slot6, (BlobertDex));

            //Do a check if its empty then its doesnt exist
            assert(blob1.name != '', 'Blobert not found in Dex');
            assert(blob2.name != '', 'Blobert not found in Dex');
            assert(blob3.name != '', 'Blobert not found in Dex');
            assert(blob4.name != '', 'Blobert not found in Dex');
            assert(blob5.name != '', 'Blobert not found in Dex');
            assert(blob6.name != '', 'Blobert not found in Dex');

            //set the blobert lineup
            lineup.slot1 = slot1;
            lineup.slot2 = slot2;
            lineup.slot3 = slot3;
            lineup.slot4 = slot4;
            lineup.slot5 = slot5;
            lineup.slot6 = slot6;

            //set the lineup state change
            set!(self.world(), (lineup));

            emit!(
                self.world(),
                events::LineupSet { player: caller, slot1, slot2, slot3, slot4, slot5, slot6 }
            )
        }

        fn create_battle_room(self: @ContractState, turn_expiry: u64, total_turn_time: u64) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let game_id = make_seed(caller);

            //Check if the lineup is filled , if not revert
            let lineup: Lineup = get!(self.world(), (caller, 0), (Lineup));
            assert(
                (lineup.slot1 != 0
                    && lineup.slot2 != 0
                    && lineup.slot3 != 0
                    && lineup.slot4 != 0
                    && lineup.slot5 != 0
                    && lineup.slot6 != 0),
                'Lineup is not ready'
            );

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
            set!(
                self.world(),
                (
                    game,
                    Lineup {
                        player_id: caller,
                        game_id: game_id,
                        slot1: lineup.slot1,
                        slot2: lineup.slot2,
                        slot3: lineup.slot3,
                        slot4: lineup.slot4,
                        slot5: lineup.slot5,
                        slot6: lineup.slot6
                    }
                )
            );

            emit!(self.world(), events::BattleRoomCreated { player: caller, game_id, turn_expiry })
        }

        fn challenge_player(
            self: @ContractState,
            target_player: ContractAddress,
            turn_expiry: u64,
            total_turn_time: u64,
            challenge_expiry: u64,
        ) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            let game_id = make_seed(caller);

            //Check if the lineup is filled , if not revert
            let callerlineup: Lineup = get!(self.world(), (caller, 0), (Lineup));
            assert(
                (callerlineup.slot1 != 0
                    && callerlineup.slot2 != 0
                    && callerlineup.slot3 != 0
                    && callerlineup.slot4 != 0
                    && callerlineup.slot5 != 0
                    && callerlineup.slot6 != 0),
                'Lineup is not ready'
            );

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
            set!(
                self.world(),
                (
                    game,
                    Lineup {
                        player_id: caller,
                        game_id: game_id,
                        slot1: callerlineup.slot1,
                        slot2: callerlineup.slot2,
                        slot3: callerlineup.slot3,
                        slot4: callerlineup.slot4,
                        slot5: callerlineup.slot5,
                        slot6: callerlineup.slot6
                    }
                )
            );

            emit!(
                self.world(),
                events::PlayerChallenged { player: caller, game_id, turn_expiry, challenge_expiry }
            )
        }


        fn accept_challenge(self: @ContractState, game_id: u128) {
            // Get the address of the current caller, possibly the player's address.
            let caller = get_caller_address();

            //Get the game
            let mut game = get!(self.world(), game_id, (Game));

            // Check if target player is the caller
            assert(game.player_b == caller, 'Caller not Callenged Player');

            game.game_status = GameStatus::InProgress;

            //Check if the challenged lineup is filled , if not revert
            let callerlineup: Lineup = get!(self.world(), (caller, 0), (Lineup));
            assert(
                (callerlineup.slot1 != 0
                    && callerlineup.slot2 != 0
                    && callerlineup.slot3 != 0
                    && callerlineup.slot4 != 0
                    && callerlineup.slot5 != 0
                    && callerlineup.slot6 != 0),
                'Lineup is not ready'
            );

            //set the state change
            set!(
                self.world(),
                (
                    game,
                    Lineup {
                        player_id: caller,
                        game_id: game_id,
                        slot1: callerlineup.slot1,
                        slot2: callerlineup.slot2,
                        slot3: callerlineup.slot3,
                        slot4: callerlineup.slot4,
                        slot5: callerlineup.slot5,
                        slot6: callerlineup.slot6
                    }
                )
            );

            util::battle_start(self.world(), game.player_a, game.player_b, game.game_id);

            emit!(self.world(), events::ChallengeAccepted { player: caller, game_id })
        }
    }
}

#[cfg(test)]
mod tests {}
