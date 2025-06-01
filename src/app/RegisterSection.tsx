'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import remiAbi from '../ABIs/remi.json';

const REMITTANCE_ADDRESS = '0x99d669d9f80d5697B903bC2F497f1C9206A1f249';

const ACCOUNT_TYPES = [
  { label: 'Personal', value: 0 },
  { label: 'NGO', value: 1 },
  { label: 'Business', value: 2 },
];

// Add minimal interface for event emitter
interface EthereumEventEmitter {
  on(event: string, handler: (...args: unknown[]) => void): void;
  removeListener(event: string, handler: (...args: unknown[]) => void): void;
}

export default function RegisterSection() {
  const [address, setAddress] = useState<string | null>(null);
  const [registeredName, setRegisteredName] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState(0);
  const [infoHover, setInfoHover] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWalletAndName = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        const contract = new ethers.Contract(REMITTANCE_ADDRESS, remiAbi, provider);
        const name = await contract.addressToName(accounts[0]);
        if (name && name.trim() !== '') {
          setRegisteredName(name);
        } else {
          setRegisteredName(null);
        }
      }
    };
    fetchWalletAndName();
    if (window.ethereum) {
      (window.ethereum as unknown as EthereumEventEmitter).on('accountsChanged', fetchWalletAndName);
      (window.ethereum as unknown as EthereumEventEmitter).on('chainChanged', fetchWalletAndName);
      return () => {
        (window.ethereum as unknown as EthereumEventEmitter).removeListener('accountsChanged', fetchWalletAndName);
        (window.ethereum as unknown as EthereumEventEmitter).removeListener('chainChanged', fetchWalletAndName);
      };
    }
  }, []);

  const validateUsername = (value: string) => /^[a-z0-9]+$/.test(value);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validateUsername(username)) {
      setError('Only lowercase alphanumeric usernames are allowed.');
      return;
    }
    if (!window.ethereum || !address) {
      setError('Connect your wallet first.');
      return;
    }
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(REMITTANCE_ADDRESS, remiAbi, signer);
      const tx = await contract.register(username.toLowerCase(), accountType);
      await tx.wait();
      setSuccess('Registration successful!');
      setRegisteredName(username.toLowerCase());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    }
    setLoading(false);
  };

  const isRegistered = !!registeredName;

  return (
    <section id="register" className="w-full bg-white/80 dark:bg-black/60 rounded-2xl shadow-xl p-10 border border-green-200 dark:border-green-900">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Register</h2>
      <form className="flex flex-col gap-6" onSubmit={handleRegister}>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg flex items-center gap-2">
            Choose your username
            <span
              className="relative cursor-pointer"
              onMouseEnter={() => setInfoHover(true)}
              onMouseLeave={() => setInfoHover(false)}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#888">i</text></svg>
              {infoHover && (
                <span className="absolute left-6 top-0 bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap shadow-lg">
                  we&apos;ll convert the username to lowercase
                </span>
              )}
            </span>
          </label>
          <input
            type="text"
            value={username}
            onChange={e => {
              const val = e.target.value.toLowerCase();
              if (val === '' || validateUsername(val)) setUsername(val);
            }}
            placeholder="username"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={isRegistered || loading}
            autoComplete="off"
          />
          <span className="text-xs text-gray-500">Only lowercase letters and numbers allowed.</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-lg">Account type</label>
          <select
            value={accountType}
            onChange={e => setAccountType(Number(e.target.value))}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={isRegistered || loading}
          >
            {ACCOUNT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-lime-500 hover:to-green-500 transition disabled:opacity-60"
          disabled={isRegistered || loading}
        >
          {isRegistered ? 'Already Registered' : loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="text-red-600 font-semibold text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 font-semibold text-sm mt-2">{success}</div>}
        {isRegistered && (
          <div className="text-gray-500 text-sm mt-2">You are already registered as <span className="font-mono font-bold">{registeredName}</span>.</div>
        )}
      </form>
    </section>
  );
} 