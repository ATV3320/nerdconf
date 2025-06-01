'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import remiAbi from '../ABIs/remi.json';
import erc20Abi from '../ABIs/erc20.json';

const REMITTANCE_ADDRESS = '0x99d669d9f80d5697B903bC2F497f1C9206A1f249';
const STABLECOIN_ADDRESS = '0x79DDFcC0c7913573e7d9b6583e798F644eD64170';

export default function SendMoneySection() {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!username || !amount) {
      setError('Please enter both username and amount.');
      return;
    }
    if (!window.ethereum) {
      setError('Wallet not connected.');
      return;
    }
    setLoading(true);
    setLoadingMsg('Checking balance...');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const erc20 = new ethers.Contract(STABLECOIN_ADDRESS, erc20Abi, signer);
      const remi = new ethers.Contract(REMITTANCE_ADDRESS, remiAbi, signer);
      const amountInWei = ethers.parseEther(amount);
      const balance = await erc20.balanceOf(userAddress);
      if (balance < amountInWei) {
        setError('Insufficient token balance.');
        setLoading(false);
        setLoadingMsg('');
        return;
      }
      setLoadingMsg('Checking allowance...');
      const allowance = await erc20.allowance(userAddress, REMITTANCE_ADDRESS);
      if (allowance < amountInWei) {
        setLoadingMsg('Approving token spend...');
        const approveTx = await erc20.approve(REMITTANCE_ADDRESS, amountInWei);
        await approveTx.wait();
      }
      setLoadingMsg('Sending tokens...');
      console.log('sendStablecoin inputs:', {
        username,
        amount,
        amountInWei: amountInWei.toString(),
        userAddress,
      });
      const tx = await remi.sendStablecoin(username, amountInWei);
      await tx.wait();
      setSuccess('Transfer successful!');
      setUsername('');
      setAmount('');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Transfer failed.');
    }   
    setLoading(false);
    setLoadingMsg('');
  };

  return (
    <section id="send-money" className="w-full bg-white/80 dark:bg-black/60 rounded-2xl shadow-xl p-10 mt-8 border border-purple-200 dark:border-purple-900">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Send Money</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Recipient Username"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input
          type="number"
          placeholder="Amount"
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min="0"
          step="any"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-pink-500 hover:to-purple-500 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Send'}
        </button>
        {error && <div className="text-red-600 font-semibold text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 font-semibold text-sm mt-2">{success}</div>}
      </form>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black rounded-xl shadow-lg p-8 flex flex-col items-center gap-4">
            <span className="text-lg font-bold text-purple-600">{loadingMsg || 'Processing...'}</span>
            <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
          </div>
        </div>
      )}
    </section>
  );
} 