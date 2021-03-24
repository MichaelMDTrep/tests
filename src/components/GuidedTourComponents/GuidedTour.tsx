import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Joyride, { TooltipRenderProps, Step } from 'react-joyride';
import styled from 'styled-components';
import { LayoutContext } from '../../state/Layout/context';

// import 'reactjs-popup/dist/index.css';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { TourContext } from '../../context/tour-context';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import { network } from '../../utils/connectors';
import { CheckCircleOutline } from '@material-ui/icons';
import { Card, CardContent, Grid } from '@material-ui/core';

import MobileStepper from '@material-ui/core/MobileStepper';

//import Button from 'react-bootstrap/Button';
import Map from '../Map/Map';
import Modal from '../Modals/Modal/Modal';
import ConnectWalletModal from '../Modals/ConnectWalletModal/ConnectWalletModal';
// import { LocationContext } from '../../context/location-context';

import './GuidedTour.css';
import Image1 from '../../assets/onboarding/CentralPark.png';
import Image2 from '../../assets/onboarding/CentralPark2.png';
// import Image3 from '../../assets/onboarding/button.png';
import likedProperty from '../../assets/svg/heartfull.svg';

const GuidedTour = () => {
    document.body.style.overflow = 'hidden';
    const metamaskUrl = 'https://metamask.io/'

    const steps: Step[] = [
        {
            target: '.TextField-without-border-radius',
            title: 'Search Bar',
            content:
                'This is the Search bar. Here you can search for any site or location in the world to view its availability and price.',
            placement: 'right',
            disableBeacon: true,
        },
        {
            target: '.dropdowns',
            title: 'Buy Property',
            content:
                "Click on a location on the map to view a property's details, including the coordinates and price. If the tile is purple, it's available!",
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '.dropdowns',
            title: 'Properties Toolbar',
            content:
                'The Properties Toolbar shows all the properties you own and those available for sale, as well as properties you have saved to your wishlist.',
            placement: 'right',
            disableBeacon: true,
        },
        {
            target: '.wallet-button',
            title: 'Wallet Connection',
            content:
                `To start buying real estate, you'll need to connect a blockchain wallet. This wallet will allow you to make Ether transactions on SuperWorld.`,
            placement: 'left',
            disableBeacon: true,
        },
    ];

    const TooltipBody = styled.div`
        background-color: #fff;
        width: 320px;
        position: relative;
        border-radius: 16px;
    `;

    const TooltipContent = styled.div`
        color: #000;
        padding: 20px;
        font-family: canada-type-gibson, sans-serif;
        font-size: 15px;
        color: #707070;
    `;

    const TooltipTitle = styled.h2`
        color: white;
        background-color: #5540c7;
        text-transform: uppercase;
        font-family: canada-type-gibson, sans-serif;
        font-size: 20px;
        font-weight: 600;
        padding: 2% 0% 1% 5%;
        margin: 0;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
    `;

    const NextButton = styled.button`
        background-color: #5540c7;
        color: #fff;
        padding: 0px 10px;
        border: 2px solid #5540c7;
        border-radius: 16px;
        font-family: canada-type-gibson, sans-serif;
        font-size: 15px;
        font-weight: 600;
        border-radius: 2em;
        margin-top: 5%;
        margin-right: 2%;
        margin-bottom: 3%;
        :hover {
            background-color: #909af8;
            border: 2px solid #909af8;
            cursor: pointer;
        }
        :focus {
            outline: none;
        }
    `;

    const SkipButton = styled.button`
        background-color: transparent;
        color: #5540c7;
        padding: 1.1rem;
        border: none;
        font-family: canada-type-gibson, sans-serif;
        font-size: 15px;
        :hover {
            color: #909af8;
            cursor: pointer;
        }
    `;

    const TooltipFooter = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 5px;
    `;

    const [showGettingStarted, setShowGettingStarted] = useState(true);
    const [showWalletConnect, setShowWalletConnect] = useState(false);
    const [showConnectSuccess, setShowConnectSuccess] = useState(false);
    const [showLocationCard, setShowLocationCard] = useState(false);
    const [run, setRun] = useState(false);
    // const locationContext: any = useContext(LocationContext);
    const history = useHistory();
    const tourContext = useContext(TourContext);

    const { active, activate, error } = useWeb3React<Web3Provider>();
    const triedEager = useEagerConnect();
    const { state, dispatch } = useContext(LayoutContext);

    useInactiveListener(!triedEager);
    useEffect(() => {
        if (triedEager && !active && !error) activate(network);
    }, [triedEager, active, error, activate]);

    const finishClickHandler = () => {
        tourContext.setTourMode(false);
        setShowGettingStarted(false);
        // setShowWalletConnect(true);
        dispatch({
            type: 'TOGGLE_SIGN_IN_MODAL',
            payload: !state.signInModalIsOpen,
        });
    };

    const connectClickHandler = () => {
        setShowWalletConnect(false);
        setShowConnectSuccess(true);
    };

    const startBuyingHandler = () => {
        setShowConnectSuccess(false);
        history.push('/');
    };

    const clickStartHandler = () => {
        window.location.hash = 'hide1-tooltap';
        tourContext.setTourMode(true);
        setShowGettingStarted(false);
        setRun(true);
    };

    const handleJoyrideCallback = (props: any) => {
        const { action, index, status } = props;
        console.log(index, action);
        tourContext.setSlideNum(index);
        // if (tourContext.slideNum == 1) {
        //      locationContext.setLocation([48.8584, 2.2945]); //Eiffel tower
        //      console.log(locationContext.location);
        //     return (
        //     <div className ="popup">
        //         <h3> Central Park  </h3>
        //         <img className ="Istyle" src = {Image1} alt = "image"/>
        //         <img className ="Istyle1" src = {Image2} alt = "image"/>
        //         <p className = "btext"> This land is for sale  = 800ETH
        //         <img className="Istyle2" src = {Image3} alt = "image" /></p>
        //         </div>)
        // }
        index === 1 ? setShowLocationCard(true) : setShowLocationCard(false);
        if (status === 'finished' || action === 'skip') {
            // setShowWalletConnect(true);
            // history.push('/');
            setRun(false);
            window.location.hash = 'hide1-tooltap';
            dispatch({
                type: 'TOGGLE_SIGN_IN_MODAL',
                payload: !state.signInModalIsOpen,
            });
        }
    };

    const Tooltip = ({ isLastStep, step, primaryProps, skipProps, tooltipProps }: TooltipRenderProps) => {
        return (
            <TooltipBody {...tooltipProps}>
                {step.title && <TooltipTitle>{step.title}</TooltipTitle>}
                {step.content && <TooltipContent>{step.content}</TooltipContent>}
                <MobileStepper
                    variant="dots"
                    steps={4}
                    position="static"
                    activeStep={tourContext.slideNum}
                    nextButton={<button disabled={true} style={{ display: 'none' }}></button>}
                    backButton={<button disabled={true} style={{ display: 'none' }}></button>}
                    style={{
                        background: 'white',
                        justifyContent: 'center',
                    }}
                />
                <TooltipFooter>
                    <SkipButton {...skipProps} style={{ visibility: isLastStep ? 'hidden' : 'visible' }}>
                        Skip Tour
                    </SkipButton>
                    <NextButton {...primaryProps}>{isLastStep ? 'DONE' : 'NEXT'}</NextButton>
                </TooltipFooter>
            </TooltipBody>
        );
    };

    return (
        <>
            <Map triedEager={triedEager} />
            {(showGettingStarted || showWalletConnect || showConnectSuccess) && (
                <div
                    className="Overlay"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        height: '98vh',
                        overflow: 'hidden',
                        mixBlendMode: 'hard-light',
                        transform: 'translateY(0vh)',
                        zIndex: 100,
                        pointerEvents: 'auto',
                    }}
                ></div>
            )}
            <Modal
                className="first"
                hidden={!showGettingStarted}
                header="GETTING STARTED"
                footerClass="get-started__modal-actions"
                footer={
                    <React.Fragment>
                        <button onClick={clickStartHandler}>TAKE GUIDED TOUR</button>
                        <button onClick={finishClickHandler}>CONNECT WALLET</button>
                    </React.Fragment>
                }
            >
                <p>Congratulations! Now you can own a piece of SuperWorld!</p>
            </Modal>
            <Modal
                hidden={!showConnectSuccess}
                header="SUCCESS!"
                footerClass="connect-success__modal-actions"
                footer={
                    <React.Fragment>
                        <button onClick={startBuyingHandler}>START BUYING</button>
                    </React.Fragment>
                }
            >
                <div className="connect-success__textContainer">
                    <CheckCircleOutline className="connect-success__icon" />
                    <p className="connect-success__text">Your wallet has been connected.</p>
                </div>
            </Modal>
            {showLocationCard && (
                <Card className="popup">
                    <CardContent>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <h2 style={{ fontFamily: 'Gibson', margin: '1px', maxWidth: '70%' }}>The Ballfield's Cafe</h2>
                            <img style={{ width: '25px' }} src={likedProperty} alt="liked Property" />
                        </Grid>
                        <p
                            style={{
                                fontFamily: 'Gibson',
                                fontSize: '18px',
                                width: '100%',
                                color: '#f08778',
                                margin: '1px',
                                marginTop: '5%',
                                display: 'flex',
                            }}
                        >
                            40.7, -73.967{' '}
                        </p>
                        <img className="Istyle" src={Image1} alt="Central Park" />
                        <img className="Istyle1" src={Image2} alt="Central Park" />
                        <p
                            style={{
                                fontFamily: 'Gibson',
                                fontSize: '17px',
                                margin: '1px',
                                width: '100%',
                                display: 'flex',
                                padding: '7px',
                            }}
                        >
                            Purchase for 100ETH
                            <button className="pbtn">Purchase</button>
                        </p>
                    </CardContent>
                </Card>
            )}
            {/* <h3> Central Park  </h3>
                <img className ="Istyle" src = {Image1} alt = "image"/>
                <img className ="Istyle1" src = {Image2} alt = "image"/>
                <p className = "btext"> This land is for sale  = 800ETH 
                <img className="Istyle2" src = {Image3} alt = "image" /></p>
                </div>} */}
            <Joyride
                steps={steps}
                callback={handleJoyrideCallback}
                continuous
                hideBackButton
                showSkipButton
                disableCloseOnEsc
                disableOverlayClose
                spotlightPadding={0}
                run={run}
                locale={{ last: 'Done' }}
                tooltipComponent={Tooltip}
                styles={{
                    buttonClose: {
                        display: 'none',
                    },
                    tooltip: {
                        padding: '0px',
                        border: 'solid 2px var(--light-purple)',
                        borderRadius: '1em',
                    },
                    tooltipContent: {
                        textAlign: 'left',
                    },
                    spotlight: {
                        borderRadius: '16px',
                    },
                }}
            />

            <ConnectWalletModal hidden={!showWalletConnect} connectClick={connectClickHandler} />
        </>
    );
};
export default GuidedTour;