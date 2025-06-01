'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import remiAbi from '../ABIs/remi.json';
import erc20Abi from '../ABIs/erc20.json';
import Image from 'next/image';

const REMITTANCE_ADDRESS = '0x99d669d9f80d5697B903bC2F497f1C9206A1f249';
const STABLECOIN_ADDRESS = '0x79DDFcC0c7913573e7d9b6583e798F644eD64170';

declare global {
  interface Window {
    ethereum?: import('ethers').Eip1193Provider;
  }
}

export default function Navbar() {
  const [address, setAddress] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [showRegisterNotif, setShowRegisterNotif] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [usdcAllowance, setUsdcAllowance] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);

  const connectWallet = async () => {
    setError(null);
    setConnecting(true);
    try {
      if (!window.ethereum) {
        setError('MetaMask is not installed.');
        setConnecting(false);
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt('1287')) {
        setError('Please switch to the Moonbeam testnet in MetaMask.');
        setConnecting(false);
        return;
      }
      setAddress(accounts[0]);
      // Read name from contract
      const contract = new ethers.Contract(REMITTANCE_ADDRESS, remiAbi, provider);
      const userName = await contract.addressToName(accounts[0]);
      if (userName && userName.trim() !== '') {
        setName(userName);
      } else {
        setName(null);
        setShowRegisterNotif(true);
        setTimeout(() => setShowRegisterNotif(false), 3000);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet.');
    }
    setConnecting(false);
  };

  const disconnect = () => {
    setAddress(null);
    setName(null);
    setError(null);
  };

  const fetchUsdcInfo = async (userAddr: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
      const erc20 = new ethers.Contract(STABLECOIN_ADDRESS, erc20Abi, provider);
      const balance = await erc20.balanceOf(userAddr);
      const allowance = await erc20.allowance(userAddr, REMITTANCE_ADDRESS);
      setUsdcBalance(ethers.formatUnits(balance, 18));
      setUsdcAllowance(ethers.formatUnits(allowance, 18));
    } catch (error: unknown) {
      setUsdcBalance('Error');
      setUsdcAllowance('Error');
      console.error('Error fetching USDC info:', error);
    }
  };

  const mintTokens = async () => {
    if (!address) return;
    setMinting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
      const signer = await provider.getSigner();
      const erc20 = new ethers.Contract(STABLECOIN_ADDRESS, erc20Abi, signer);
      const tx = await erc20.mint(address, ethers.parseUnits('1000', 18));
      await tx.wait();
      await fetchUsdcInfo(address);
    } catch (error: unknown) {
      console.error('Error minting tokens:', error);
    }
    setMinting(false);
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-black bg-opacity-80 text-white shadow-lg fixed top-0 left-0 z-50 backdrop-blur-md">
      <div className="flex items-center gap-6">
        <Image src="/polka.png" alt="Polka Logo" width={36} height={36} className="mr-2" />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-pink-300 to-white bg-clip-text text-transparent select-none tracking-tight mr-6">remify</span>
        <button className="text-lg font-semibold hover:text-purple-400 transition" onClick={() => document.getElementById('send-money')?.scrollIntoView({behavior: 'smooth'})}>Send Money</button>
        <button className="text-lg font-semibold hover:text-purple-400 transition" onClick={() => document.getElementById('search-profiles')?.scrollIntoView({behavior: 'smooth'})}>Search Profiles</button>
        <button className="text-lg font-semibold hover:text-purple-400 transition" onClick={() => document.getElementById('register')?.scrollIntoView({behavior: 'smooth'})}>Register</button>
        <button className="text-lg font-semibold hover:text-purple-400 transition" onClick={() => document.getElementById('how-to')?.scrollIntoView({behavior: 'smooth'})}>How To</button>
      </div>
      <div className="flex items-center gap-4">
        {address ? (
          <>
            <span className="bg-pink-800/40 text-pink-100 px-4 py-2 rounded-full font-mono text-sm shadow">
              {name ? name : `${address.slice(0, 6)}...${address.slice(-4)}`}
            </span>
            <button
              className="ml-2 bg-pink-800/40 hover:bg-pink-700/40 text-pink-100 font-bold py-2 px-4 rounded-full shadow transition"
              onClick={disconnect}
            >
              Disconnect
            </button>
            {address && (
              <button
                className="rounded-full bg-pink-800/40 text-pink-100 px-2 py-1 text-lg font-bold hover:bg-pink-700/40 transition relative"
                onClick={async () => {
                  setShowInfo(!showInfo);
                  if (!showInfo) await fetchUsdcInfo(address);
                }}
                title="Show USDC balance and allowance"
              >
                i
              </button>
            )}
          </>
        ) : (
          <button
            className="bg-pink-800/40 hover:bg-pink-700/40 text-pink-100 font-bold py-2 px-6 rounded-full shadow-lg transition disabled:opacity-60"
            onClick={connectWallet}
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : 'Wallet Connect'}
          </button>
        )}
      </div>
      {showRegisterNotif && (
        <div className="absolute left-8 top-full mt-2 bg-pink-800/40 text-pink-100 px-4 py-2 rounded shadow-lg text-sm z-50 animate-fade-in-out">
          Please register to the platform!
        </div>
      )}
      {error && (
        <div className="absolute top-full mt-2 right-8 bg-pink-800/40 text-pink-100 px-4 py-2 rounded shadow-lg text-sm z-50">
          {error}
        </div>
      )}
      {showInfo && address && (
        <div className="absolute right-0 top-full mt-2 bg-pink-900/90 text-pink-100 p-4 rounded-xl shadow-2xl z-50 min-w-[260px] border border-pink-800/40 flex flex-col gap-2 animate-fade-in-out">
          <div className="font-semibold mb-2 text-pink-200 text-lg flex items-center gap-2">
            <svg width='18' height='18' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' stroke='#f9a8d4' strokeWidth='2'/><text x='12' y='16' textAnchor='middle' fontSize='12' fill='#f9a8d4'>i</text></svg>
            USDC Info
          </div>
          <div>Balance: <span className="font-mono text-pink-200">{usdcBalance ?? '...'}</span></div>
          <div>Approved: <span className="font-mono text-pink-200">{usdcAllowance ?? '...'}</span></div>
          <button
            className="mt-3 w-full bg-pink-800/40 hover:bg-pink-700/40 text-pink-100 font-bold py-2 px-4 rounded-lg shadow transition disabled:opacity-60"
            onClick={mintTokens}
            disabled={minting}
          >
            {minting ? 'Minting...' : 'Mint 1000 USDC to Self'}
          </button>
          <button className="mt-2 text-xs text-pink-200 hover:text-pink-100" onClick={() => setShowInfo(false)}>Close</button>
        </div>
      )}
    </nav>
  );
} 