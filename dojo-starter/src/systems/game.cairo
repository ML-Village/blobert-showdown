use starknet::ContractAddress;
use dojo_starter::models::game::{Game};

#[starknet::interface]
trait IGame<TContractState> {
    fn commit_move(
        self: @TContractState, game_id: u128, caller: ContractAddress, turn: u16, hash: u64
    );
}

#[dojo::contract]
mod game {
    use super::{IGame};

    use starknet::ContractAddress;
    use dojo_starter::models::game::{BlobertInGame, Game, Turn, GameMove, GameStatus, TurnStatus};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    fn _assert_challenge(
        self: @ContractState, caller: ContractAddress, game_id: u128, turn: u16
    ) -> (Game, u8) {
        let game: Game = get!(self.world(), game_id, Game);

        // Assert Duelist is in the challenge
        let player_number: u8 = if (game.player_a == caller) {
            1
        } else if (game.player_b == caller) {
            2
        } else {
            0
        };
        assert(player_number == 1 || player_number == 2, 'Not your Challenge!');

        // Correct Challenge state
        assert(game.game_status == GameStatus::InProgress.into(), 'Challenge is not In Progress');
        assert(game.turn == turn, 'Bad Round number');

        (game, player_number)
    }

    //process the game
    fn process_turn() {}

    #[abi(embed_v0)]
    impl GameImpl of IGame<ContractState> {
        fn commit_move(
            self: @ContractState, game_id: u128, caller: ContractAddress, turn: u16, hash: u64
        ) {
            let caller: ContractAddress = starknet::get_caller_address();

            let (_game, player_number) = _assert_challenge(self, caller, game_id, turn);

            let mut turn: Turn = get!(self.world(), (game_id, turn), Turn);

            assert(turn.turn_status == TurnStatus::Commit.into(), 'Round not in Commit');

            //store hash 
            if (player_number == 1) {
                assert(turn.move_a.hash == 0, 'Already Committed');
                turn.move_a.hash = hash
            } else if (player_number == 2) {
                assert(turn.move_b.hash == 0, 'Already Committed');
                turn.move_b.hash = hash
            }

            //finish commit 
            if (turn.move_a.hash != 0 && turn.move_b.hash != 0) {
                turn.turn_status = TurnStatus::Reveal.into();
            }

            set!(self.world(), (turn));
        }
    }
}

