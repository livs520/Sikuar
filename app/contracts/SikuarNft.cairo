// SPDX-License-Identifier: MIT
// Implementación mínima de NFT en Cairo

#[starknet::contract]
mod Sikuar {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use starknet::ContractAddress;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, StorageMapReadAccess, StorageMapWriteAccess, Map};

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataImpl = ERC721Component::ERC721MetadataImpl<ContractState>;
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;
    impl ERC721HooksImpl = ERC721HooksEmptyImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        owner: ContractAddress,
        next_token_id: u256,
        token_hashes: Map<u256, u256>, // token_id -> sha256 hash
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress,name: ByteArray, symbol: ByteArray) {
        self.erc721.initializer(name, symbol, "");
        self.owner.write(owner);
        self.next_token_id.write(1);
    }

    #[abi(embed_v0)]
    impl Sikuar of IMinimalNFT<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress, hash: u256) {
            // Solo el owner puede mintear
            assert(starknet::get_caller_address() == self.owner.read(), 'Only owner can mint');
            
            let token_id = self.next_token_id.read();
            self.erc721.mint(to, token_id);
            
            // Almacenar el hash del token
            self.token_hashes.write(token_id, hash);
            
            self.next_token_id.write(token_id + 1);
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }

        fn get_next_token_id(self: @ContractState) -> u256 {
            self.next_token_id.read()
        }

        fn get_token_hash(self: @ContractState, token_id: u256) -> u256 {
            // Verificar que el token existe
            assert(self.erc721.exists(token_id), 'Token does not exist');
            self.token_hashes.read(token_id)
        }
    }

    #[starknet::interface]
    trait IMinimalNFT<TContractState> {
        fn mint(ref self: TContractState, to: ContractAddress, hash: u256);
        fn get_owner(self: @TContractState) -> ContractAddress;
        fn get_next_token_id(self: @TContractState) -> u256;
        fn get_token_hash(self: @TContractState, token_id: u256) -> u256;
    }
}