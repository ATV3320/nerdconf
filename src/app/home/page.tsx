import React from "react";
import RegisterSection from "../RegisterSection";
import SearchProfilesSection from "../SearchProfilesSection";
import SendMoneySection from "../SendMoneySection";
import Image from 'next/image';
import Navbar from "../Navbar";

export default function Home() {
  return (
    <main className="min-h-screen wave-gradient">
      <Navbar />
      <div className="flex flex-col items-center gap-24 max-w-3xl mx-auto pb-20">
        {/* Send Money Section */}
        <SendMoneySection />

        {/* Search Profiles Section */}
        <SearchProfilesSection />

        {/* Register Section */}
        <RegisterSection />

        {/* How To Section */}
        <section id="how-to" className="w-full bg-white/10 backdrop-blur-lg rounded-2xl p-12 border-4 border-pink-300 mt-24 flex flex-col items-center gap-12 shadow-xl">
          <h2 className="text-4xl font-extrabold mb-8 text-white tracking-tight">How To Use Remify</h2>
          <div className="flex flex-col gap-12 w-full max-w-4xl">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <Image src="/moonbeam network.jpg" alt="Moonbeam Network" width={180} height={72} className="object-contain rounded-xl shadow-xl bg-white/10 px-4 py-2" />
              <div className="flex-1 text-lg md:text-2xl font-semibold text-white">
                <span className="text-pink-200 font-bold">Step 1:</span> Our platform is deployed on Moonbeam Alpha testnet. Get yourself some funds from the <a href="https://faucet.moonbeam.network/" target="_blank" rel="noopener noreferrer" className="underline text-pink-200 hover:text-pink-100">Moonbeam Faucet</a>.
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <Image src="/metamask.png" alt="DoraHacks" width={180} height={72} className="object-contain rounded-xl shadow-xl bg-white/10 px-4 py-2" />
              <div className="flex-1 text-lg md:text-2xl font-semibold text-white">
                <span className="text-pink-200 font-bold">Step 2:</span> Register yourself on our platform and log in with your EVM-compatible wallet for maximum compatibility.
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <Image src="/polkadot hi.png" alt="Polkadot Hi" width={180} height={72} className="object-contain rounded-xl shadow-xl bg-white/10 px-4 py-2" />
              <div className="flex-1 text-lg md:text-2xl font-semibold text-white">
                <span className="text-pink-200 font-bold">Step 3:</span> Try searching for random usernames like <span className="bg-pink-900/50 px-2 py-1 rounded font-mono">receiver</span> or <span className="bg-pink-900/50 px-2 py-1 rounded font-mono">sender</span>. You can even send them tokens!
              </div>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <div className="flex-1 text-lg md:text-2xl font-semibold text-white">
                <span className="text-pink-200 font-bold">Step 4:</span> After connecting your wallet, check your stablecoin balance at the top right. You can top up for free anytime.
              </div>
            </div>
            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              <div className="flex-1 text-lg md:text-2xl font-semibold text-white">
                <span className="text-pink-200 font-bold">Step 5:</span> Watch your data update on-chain and enjoy a remittance platform with no hidden charges!
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 