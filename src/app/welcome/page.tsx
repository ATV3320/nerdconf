import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Welcome() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 wave-gradient">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">Welcome to Remify</h1>
          <p className="text-xl text-pink-100 mb-8">Your Decentralized Remittance Platform</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 shadow-xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 rounded-xl p-6 shadow-lg">
              <div className="mb-4 flex justify-center items-center">
                <Image 
                  src="/moonbeam network.jpg" 
                  alt="Moonbeam Network" 
                  width={72} 
                  height={72} 
                  className="object-contain rounded-xl shadow-xl bg-white/10 px-4 py-2"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Moonbeam Powered</h3>
              <p className="text-pink-100">Built on Moonbeam Alpha testnet for seamless transactions</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-semibold text-white mb-2">Zero Fees</h3>
              <p className="text-pink-100">Send money without worrying about hidden charges</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
              <p className="text-pink-100">Your transactions are protected by blockchain security</p>
            </div>
          </div>
        </div>

        <Link 
          href="/home" 
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-colors duration-200 shadow-lg"
        >
          Enter App
        </Link>
      </div>
    </main>
  );
} 