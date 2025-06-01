# Remify - Decentralized Remittance Platform

<div align="center">
  <img src="/remifylogo.png" alt="Remify Logo" width="200"/>
  
  [![Moonbeam](https://img.shields.io/badge/Moonbeam-Alpha-orange)](https://moonbeam.network/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-13-black)](https://nextjs.org/)
</div>

Remify is a decentralized remittance platform built on Moonbeam Alpha testnet, allowing users to send money securely and without hidden fees.

## 🌟 Features

<div align="center">
  <img src="/moonbeam network.jpg" alt="Moonbeam Network" width="400"/>
</div>

- 🌙 Built on Moonbeam Alpha testnet
- 💸 Zero hidden fees
- 🔒 Secure blockchain transactions
- 👤 User profile management
- 💰 USDC token support
- 🔍 Profile search functionality

## 🚀 Live Demo

- **Website**: [Coming Soon]
- **Video Tutorial**: [Coming Soon]

## 📋 Prerequisites

- Node.js (v18 or higher)
- MetaMask or any EVM-compatible wallet
- Moonbeam Alpha testnet configured in your wallet

## 🛠️ Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd remify
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 How to Use Remify

<div align="center">
  <img src="/dorahacks.jpeg" alt="DoraHacks" width="400"/>
</div>

### 1. Get Testnet Tokens
- Visit [Moonbeam Faucet](https://faucet.moonbeam.network/)
- Connect your wallet
- Request testnet tokens

### 2. Connect Your Wallet
- Click "Wallet Connect" in the top right
- Approve the connection in your wallet
- Your address will be displayed once connected

### 3. Register Your Profile
- Click "Register" in the navigation
- Enter your desired username
- Approve the transaction in your wallet
- Wait for the transaction to be confirmed

### 4. Search for Users
- Use the search bar to find other users
- Enter a username to search
- View user details and transaction history

### 5. Send Money
- Find a user you want to send money to
- Enter the amount of USDC
- Approve the transaction in your wallet
- Wait for confirmation

### 6. Check Your Balance
- Your USDC balance is displayed in the top right
- Click the "i" button to see detailed balance information
- Use the "Mint" button to get test USDC tokens

## 💻 Development

### Project Structure
```
remify/
├── src/
│   ├── app/
│   │   ├── home/         # Main application page
│   │   ├── welcome/      # Landing page
│   │   └── components/   # Reusable components
│   ├── contracts/        # Smart contract interactions
│   └── utils/           # Utility functions
├── public/              # Static assets
└── ...
```

### Key Components
- `Navbar.tsx`: Navigation and wallet connection
- `RegisterSection.tsx`: User registration
- `SearchProfilesSection.tsx`: Profile search
- `SendMoneySection.tsx`: Money transfer
- `RotatingBanner.tsx`: Transaction status display

### Smart Contracts
The application interacts with two main smart contracts:
1. `RemifyToken.sol`: USDC token contract
2. `Remify.sol`: Main platform contract

## 🧪 Testing

1. Unit Tests:
```bash
npm test
```

2. Integration Tests:
```bash
npm run test:integration
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🙏 Acknowledgments

<div align="center">
  <img src="/polkadot hi.png" alt="Polkadot" width="200"/>
</div>

- Moonbeam Network for the testnet infrastructure
- DoraHacks for the hackathon platform
- All contributors and supporters of the project

---

<div align="center">
  Made with ❤️ by the Remify Team
</div>
