'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import remiAbi from '../ABIs/remi.json';

const REMITTANCE_ADDRESS = '0x99d669d9f80d5697B903bC2F497f1C9206A1f249';

const ACCOUNT_TYPE_LABELS = ['Personal', 'NGO', 'Business'];

function isAddress(input: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(input);
}

export default function SearchProfilesSection() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchedByAddress, setSearchedByAddress] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    setSearchedByAddress(false);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      let username = input;
      if (isAddress(input)) {
        setSearchedByAddress(true);
        const contract = new ethers.Contract(REMITTANCE_ADDRESS, remiAbi, provider);
        username = await contract.getNameByAddress(input);
        if (!username || username.trim() === '') {
          setError('No user exists for this address.');
          setLoading(false);
          return;
        }
      }
      // Now search by username
      const contract = new ethers.Contract(REMITTANCE_ADDRESS, remiAbi, provider);
      const account = await contract.getAccountByName(username);
      // accountType, totalReceived, totalSent, wallet
      setResult({
        username,
        accountType: Number(account[0]),
        totalReceived: account[1].toString(),
        totalSent: account[2].toString(),
        wallet: account[3],
      });
    } catch (err: any) {
      setError('No user exists with this name or address.');
    }
    setLoading(false);
  };

  return (
    <section id="search-profiles" className="w-full bg-white/80 dark:bg-black/60 rounded-2xl shadow-xl p-10 border border-blue-200 dark:border-blue-900">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Search Profiles</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name or address"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-cyan-500 hover:to-blue-500 transition"
          disabled={loading || !input}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <div className="text-red-600 font-semibold text-sm mt-4">{error}</div>}
      {result && (
        <div className="mt-6 flex flex-col gap-2">
          <div className="text-lg font-bold">{result.username}</div>
          <div className="text-md">Account Type: <span className="font-semibold">{ACCOUNT_TYPE_LABELS[result.accountType] || 'Unknown'}</span></div>
          <div className="text-md">Total Received: <span className="text-blue-600 font-mono">{ethers.formatUnits(result.totalReceived, 18)}</span></div>
          <div className="text-md">Total Sent: <span className="text-green-600 font-mono">{ethers.formatUnits(result.totalSent, 18)}</span></div>
          {!searchedByAddress && (
            <div className="text-md">Wallet Address: <span className="font-mono">{result.wallet}</span></div>
          )}
        </div>
      )}
    </section>
  );
} 