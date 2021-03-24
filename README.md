# Web Client

## Setup

Before you can get started running the application, you'll need to grab the compiled contracts (ABIs). Currently, the repo is called 'superworld_map'

1. Switch to the [dev](https://github.com/superworldapp/superworld_map/tree/dev) branch.

2. Follow the README instructions.

3. After deploying the contracts to Ropsten, grab the compiled contracts inside the **build** folder and place them in the src folder. If there is already a contracts folder inside src, delete it and replace it with the new contracts you've just compiled.

## Installation

1. Install dependencies. **NOTE: THERE IS A CURRENT BUG WITH MAPGL SO YOU MAY NEED TO RUN THIS TWICE**

    ```bash
    npm i
    ```

2. Fill the client's .env file, similar to how it is done within the contracts repo. You can get the API key's by visiting the link below. Don't delete the .env.example.

    [INFURA](https://infura.io/)
    [FORTMATIC](https://fortmatic.com/)
    [PORTIS](https://www.portis.io/)
    [MAPBOX](https://www.mapbox.com/)

3. Start the application.

    ```bash
    npm start
    ```

4. Once the application is running, make sure MetaMask is set to Ropsten and you have some test ether. You can get some with a faucet by visiting this [link](https://faucet.ropsten.be/) or this [link](https://faucet.metamask.io/)

## Folder Structure

### @types

In Typescript, some packages are built with TS (e.g. @web3-react). Other packages aren't compatible with TS because they are built with vanilla JavaScript (e.g. react). Thus, they need an '@types/...' package (e.g. @types/react). You can find a list of supported packages at [definitelytyped](https://definitelytyped.org/)
or by searching on NPM. When you install a types package, make sure to install it as a dev dependency (e.g. npm i -D @types/react).

In the chance that the package does not have a corresponding @types package, you can loosely define the package within the @types file

### assets

Graphics including logos, icons, svg's, png's, etc.

### components

Building blocks of the project. Currently includes...

### contracts

Compiled ABI's after running truffle compile

### hooks

Custom react hooks

### pages

Routes, screens, or whatever you'd like to call them

### state

Global state

### utils

Utility functions, connectors, constants, and other useful files that don't below in other folders
