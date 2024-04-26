use starknet::ContractAddress;

#[starknet::interface]
trait IGame<TContractState> {
    fn choose_move(
        self: @TContractState,
        game_id: u128,
        caller: ContractAddress,
        enemy: ContractAddress,
        move_id: u16
    );
}

#[dojo::contract]
mod game {
    use super::{IGame};

    use starknet::ContractAddress;
    use dojo_starter::models::game::{BlobertInGame, Game};

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[abi(embed_v0)]
    impl GameImpl of IGame<ContractState> {
        fn choose_move(
            self: @ContractState,
            game_id: u128,
            caller: ContractAddress,
            enemy: ContractAddress,
            move_id: u16,
            slot: u8
        ) {
            //step 1 get the current blobertInGame 
            let blobert: BlobertInGame = get!(self.world(), (game_id, caller, slot), BlobertInGame);
            let game: Game = get!(self.world(), game_id, Game);
            assert(game.player_a != 0, 'Game is not found');

            if (move_id != 0) {
                //This means the user used a move
                if (caller == game.player_a) {
                    //get the enemy's blobert 
                    let enemy_blobert: BlobertInGame = get!(
                        self.world(),
                        (game_id, game.player_b, game.player_b_active_slot),
                        BlobertInGame
                    );
                } else if (caller == game.player_b) {} else {}
            //get the player enemy data 
            } else { //This means the user is switching blobert
            }
        }
    }
}

fn calculate_battle() {}
