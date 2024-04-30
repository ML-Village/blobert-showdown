#[cfg(test)]
mod utils {
    use starknet::{ContractAddress, testing};
    use dojo_starter::systems::lobby::{ILobbyDispatcher, ILobbyDispatcherTrait};
    use dojo_starter::systems::registry::{IRegistryDispatcher, IRegistryDispatcherTrait};


    fn register_blobert_lineup(system: ILobbyDispatcher, sender: ContractAddress) {
        testing::set_caller_address(sender);
        system.set_full_lineup(0, 1, 2, 3, 4, 5, 6);
    }
    fn register_blobert_registry(system: IRegistryDispatcher, sender: ContractAddress) {
        testing::set_caller_address(sender);
        system.create_blobert(1, 'blobert_1', 10, 100, 100, 100, 100, 100, 100);
        system.create_blobert(2, 'blobert_2', 10, 100, 100, 100, 100, 100, 100);
        system.create_blobert(3, 'blobert_3', 10, 100, 100, 100, 100, 100, 100);
        system.create_blobert(4, 'blobert_4', 10, 100, 100, 100, 100, 100, 100);
        system.create_blobert(5, 'blobert_5', 10, 100, 100, 100, 100, 100, 100);
        system.create_blobert(6, 'blobert_6', 10, 100, 100, 100, 100, 100, 100);
    }
}
