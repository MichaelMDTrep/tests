import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import CssBaseline from '@material-ui/core/CssBaseline';

import './index.css';
import App from './pages/App';
import { TokenProvider } from './state/Token/context';
import { LayoutProvider } from './state/Layout/context';

function getLibrary(provider: any): Web3Provider {
    return new Web3Provider(provider);
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <TokenProvider>
                <LayoutProvider>
                    <CssBaseline />
                    <App />
                </LayoutProvider>
            </TokenProvider>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
