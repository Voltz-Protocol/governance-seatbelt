import { Contract } from 'ethers'
import { provider } from '../clients/ethers'

export const ENS_PUBLIC_RESOLVER_ABI = [
    'function setText(bytes32 node, string calldata key, string calldata value) external'
];

export const ensPublicResolver = (address: string) => new Contract(address, ENS_PUBLIC_RESOLVER_ABI, provider);