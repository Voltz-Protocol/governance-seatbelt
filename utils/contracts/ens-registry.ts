import { Contract } from 'ethers'
import { provider } from '../clients/ethers'

export const ENS_REGISTRY_ABI = [
    'event NewOwner(bytes32 indexed node, bytes32 indexed label, address owner)',
    'event Transfer(bytes32 indexed node, address owner)',
    'event NewResolver(bytes32 indexed node, address resolver)',
    'event NewTTL(bytes32 indexed node, uint64 ttl)',
    'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
    'function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl) external',
]

export const ensRegistry = (address: string) => new Contract(address, ENS_REGISTRY_ABI, provider);