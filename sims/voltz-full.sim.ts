/**
 * @notice Simulation configuration file for Voltz proposal
*/


import { SimulationConfigNew } from '../types';
import {ENS_PUBLIC_RESOLVER_ABI} from "../utils/contracts/ens-public-resolver";
import {ENS_REGISTRY_ABI} from "../utils/contracts/ens-registry";
import { Interface } from '@ethersproject/abi'; 
import { namehash } from '@ethersproject/hash';
import { utils } from 'ethers';
import { keccak256 } from '@ethersproject/keccak256';

const ENS_REGISTRY_ADDRESS = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";

const NODE_TOP_LEVEL: string = namehash("uniswap.eth");
const LABEL: string = keccak256(utils.toUtf8Bytes("v3-core-license-grants"));
const OWNER_UNISWAP_GOVERNANCE_TIMELOCK: string = "0x1a9C8182C09F50C8318d769245beA52c32BE35BC";
const RESOLVER_PUBLIC_ENS_RESOLVER: string = "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41";
const TTL: number = 0;

const NODE: string = namehash("v3-core-license-grants.uniswap.eth");
const KEY: string = "Voltz Uni v3 Additional Use Grant";
const VALUE: string = `
Voltz Labs Technology Limited (“Voltz”) is granted an additional use grant to allow the Voltz DAO to use the Uniswap V3 Core software code (which is made available to Voltz subject to license available at https://github.com/Uniswap/v3-core/blob/main/LICENSE (the “Uniswap Code”)).  	
As part of this additional use grant, the Voltz DAO receives a limited worldwide license to use the Uniswap Code for the purposes of:
creating, deploying and making available aspects of an interest rate swap automated market maker (the “IRS AMM”); 
to modify and update the IRS AMM over time; and 
deploy the IRS AMM and portions thereof as smart contracts on blockchain-based applications and protocols.  
The Voltz DAO is permitted to use subcontractors to do this work.  
This license is conditional on Voltz and the Voltz DAO complying with the terms of the Business Source License 1.1, made available at https://github.com/Uniswap/v3-core/blob/main/LICENSE.
`

const ensRegistryInterface = new Interface(ENS_REGISTRY_ABI);
const setSubnodeRecordCalldata = ensRegistryInterface.encodeFunctionData("setSubnodeRecord", [NODE_TOP_LEVEL, LABEL, OWNER_UNISWAP_GOVERNANCE_TIMELOCK, RESOLVER_PUBLIC_ENS_RESOLVER, TTL]);

const ensPublicResolverInterface = new Interface(ENS_PUBLIC_RESOLVER_ABI);
const setTextCalldata = ensPublicResolverInterface.encodeFunctionData("setText", [NODE, KEY, VALUE])


export const config: SimulationConfigNew = {
    type: "new",
    daoName: "Uniswap",
    governorAddress: "0x408ED6354d4973f66138C91495F2f2FCbd8724C3",
    targets: [ENS_REGISTRY_ADDRESS, RESOLVER_PUBLIC_ENS_RESOLVER], // array of targets to call
    values: [0, 0], // array of values with each call
    signatures: ['', ''], // array of function signatures -- leave empty if generating calldata with ethers like done in here
    calldatas: [setSubnodeRecordCalldata, setTextCalldata], // array of encoded calldata (including function signatures)
    description: "Voltz Additional Use Grant"
}