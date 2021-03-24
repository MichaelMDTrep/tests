import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { useEagerConnect, useInactiveListener } from '../hooks';
import { network } from '../utils/connectors';
import Map from '../components/Map';
import HttpsRedirect from 'react-https-redirect';
import { LocationContext } from '../context/location-context';
import GuidedTour from '../components/GuidedTourComponents/GuidedTour';
import OnboardingSlidesNew from '../components/GuidedTourComponents/OnboardingSlidesNew';
// import OnboardingSlides from "../components/GuidedTourComponents/OnboardingSlides";

export default function App() {
    const { active, activate, error } = useWeb3React<Web3Provider>();
    const [location, setLocation] = useState([0, 0]);
    const triedEager = useEagerConnect();
    useInactiveListener(!triedEager);

    useEffect(() => {
        if (triedEager && !active && !error) activate(network);
    }, [triedEager, active, error, activate]);

    return (
        <HttpsRedirect>
            <LocationContext.Provider value={{ location: location, setLocation: setLocation }}>
                <Router>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/#hide1-tooltap" />
                            <Map triedEager={triedEager} />
                        </Route>
                        <Route path="/slides" exact>
                            <OnboardingSlidesNew />
                        </Route>
                        <Route path="/guided-tour" exact>
                            <GuidedTour />
                        </Route>
                    </Switch>
                </Router>
            </LocationContext.Provider>
        </HttpsRedirect>
    );
}
