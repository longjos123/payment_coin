## Running the demo

To run the demo follow these steps:

1. Clone the project with the code below.
    ```sh

    # Make sure you have the above prerequisites installed already!
    git clone https://github.com/longjos123/payment_coin.git
    cd payment_coin # Navigate to the new folder.
    yarn install # Installs all the dependencies.
    ```
2. Create an Alchemy, Firebase, and CometChat project, copy and paste your key in the spaces below.
2. Update the `.env` file with the following details.
    ```sh
    PUBLIC_URL="" //URL ENVIRONMENT

    ENDPOINT_URL="" // RPC Có thể dùng RPC Alchemy
    SECRET_KEY="" // API Key Alchemy
    DEPLOYER_KEY="" //Private Key Wallet address to deploy
    
    REACT_APP_COMET_CHAT_REGION=""  //Region comechat
    REACT_APP_COMET_CHAT_APP_ID=""  //App id comechat
    REACT_APP_COMET_CHAT_AUTH_KEY="" 
    ```
3. Deloy smart contract bằng truffle
   - truffle compile
   - truffle migrate
4. Run the app using `yarn start`
<br/>
## Useful links

- 🏠 [Website](https://daltonic.github.io/)
- ⚽ [Metamask](https://metamask.io/)
- 🚀 [Remix Editor](https://remix.ethereum.org/)
- 💡 [Truffle](https://trufflesuite.com/)
- 📈 [Alchamy](https://www.alchemy.com/)
- 🔥 [ReactJs](https://reactjs.org/)
- 😊 [Creative Tim](https://www.creative-tim.com/)
- 🐻 [Solidity](https://soliditylang.org/)
- 👀 [Web3Js](https://docs.ethers.io/v5/)
- 🎅 [Faucet](https://faucets.chain.link/rinkeby)
- 🤖 [Ganache](https://trufflesuite.com/ganache/index.html)
- 👀 [CometChat](https://www.cometchat.com/)
- ✨ [Live Demo](https://fresher-a5113.web.app/)
