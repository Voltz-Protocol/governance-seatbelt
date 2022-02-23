/**
 * @notice Simulation configuration file for Voltz proposal
*/


import { SimulationConfigNew } from '../types';
import {ENS_REGISTRY_ABI} from "../utils/contracts/ens-registry";
import { Interface } from '@ethersproject/abi'; 
import { namehash } from '@ethersproject/hash';
import { keccak256 } from '@ethersproject/keccak256';

const ENS_REGISTRY_ADDRESS = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";

const NODE: string = namehash("uniswap.eth");
const LABEL: string = keccak256('v3-core-license-grants');
const OWNER_UNISWAP_GOVERNANCE_TIMELOCK: string = "0x1a9C8182C09F50C8318d769245beA52c32BE35BC";
const RESOLVER_PUBLIC_ENS_RESOLVER: string = "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41";
const TTL: number = 0;

const ensRegistryInterface = new Interface(ENS_REGISTRY_ABI);
const setSubnodeRecordCalldata = ensRegistryInterface.encodeFunctionData("setSubnodeRecord", [NODE, LABEL, OWNER_UNISWAP_GOVERNANCE_TIMELOCK, RESOLVER_PUBLIC_ENS_RESOLVER, TTL]);

export const config: SimulationConfigNew = {
    type: "new",
    daoName: "Uniswap",
    governorAddress: "0x408ED6354d4973f66138C91495F2f2FCbd8724C3",
    targets: [ENS_REGISTRY_ADDRESS], // array of targets to call
    values: [0], // array of values with each call
    signatures: [''], // array of function signatures -- leave empty if generating calldata with ethers like done in here
    calldatas: [setSubnodeRecordCalldata], // array of encoded calldata (including function signatures)
    description: "Voltz Additional Use Grant"
}