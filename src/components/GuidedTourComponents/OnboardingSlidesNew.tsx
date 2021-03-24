import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//SuperWorld Logo
import SuperWorldLogo from '../../assets/onboarding/SWlogo.png';

//images
import Image0 from '../../assets/onboarding/Image0.png';
import Image1 from '../../assets/onboarding/Image1.png';
import Image2 from '../../assets/onboarding/Image2.png';
import Image3 from '../../assets/onboarding/Image3.png';
import Image4 from '../../assets/onboarding/Image4.png';

import './OnboardingSlidesNew.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        hidden: {
            visibility: 'hidden',
            float: 'right',
        },
        buttonNext: {
            marginRight: theme.spacing(10),
            backgroundColor: '#5540C7',
            color: 'white',
            border: '2px solid #5540C7',
            borderRadius: '16px',
            fontFamily: 'canada-type-gibson, sans-serif',
            fontStyle: 'normal',
            fontWeight: 'bold',
            padding: '5px 20px',
            float: 'right',
            marginTop: '2.5vh',
            '&:hover': {
                backgroundColor: '#909afb',
                borderColor: 'white',
            },
        },

        buttonBack: {
            marginRight: theme.spacing(1),
            backgroundColor: 'white',
            color: '#5540C7',
            border: '2px solid #5540C7',
            borderRadius: '16px',
            fontFamily: 'canada-type-gibson, sans-serif',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '15px',
            padding: '5px 20px',
            float: 'right',
            marginTop: '2.5vh',
            '&:hover': {
                color: '#909afb',
                backgroundColor: 'white',
                borderColor: '#909afb',
            },
        },
    }),
);

const Slides = [
    // {

    //     "image": Image0,
    //     "imageclass": "cryptoiscool0-img",
    //     "title": "Welcome to Superworld",
    //     "description": "Thank you for joining SuperWorld! Let's "+
    //     "learn about some of the many unique features that SuperWorld has to offer. ",
    //     "buttons":[],
    //     "multipleBtns":false

    // },

    {
        image: Image1,
        imageclass: 'cryptoiscool1-img',
        title: 'What is Superworld Virtual Real Estate?',
        style: 'style1.class',
        description:
            'The SuperWorld virtual real estate platform is mapped over the entire surface of the globe, allowing users to purchase —literally—any place on Earth. ' +
            'From skyscrapers and stadiums to historical monuments and iconic structures including wonders of the natural world,' +
            ' everyone has a favorite place that they would love to own in our virtual world.',
        description2: 'Each plot of land is a 100m x 100m rectangle which is about the size of a city block.',
        buttons: [],
        multipleBtns: false,
    },

    {
        image: Image2,
        imageclass: 'cryptoiscool2-img',
        title: 'Why does SuperWorld use blockchain technology?',
        description:
            'SuperWorld is built on the ethereum platform because it makes our virtual real estate platform decentralized.' +
            'It provides users proof of authenticity of ownership of their respective unique virtual plot, tradability, and continuing innovation.',
        description2:
            'SuperWorld uses the ERC-721 standard of tradable assets, meaning that each plot is a non-fungible token (NFT)' +
            ' — characterized by its digital scarcity as a collectible and wholly distinct asset to buy, sell, trade, or hold.',
        description3:
            'So, when you buy a piece of SuperWorld virtual real estate, you acquire a unique and irreplicable piece of the' +
            ' Ethereum blockchain, including monetization opportunities available on your virtual property.',
        buttons: [],
        multipleBtns: false,
    },
    {
        image: Image3,
        imageclass: 'cryptoiscool3-img',
        title: 'Why should I buy SuperWorld virtual real estate?',
        description:
            'When you purchase a plot of virtual real estate in SuperWorld, you’ll not only own a one-of-a-kind digital asset, ' +
            'you’ll also become a stakeholder on our platform and share in revenue created on your virtual land from user activity, such as: In-game purchases, transactions, advertising, eCommerce, digital commerce, and gaming.',
        buttons: [],
        multipleBtns: false,
    },
    {
        image: Image4,
        imageclass: 'cryptoiscool4-img',
        title: 'How does the SuperWorld mobile app integrate with our virtual real estate?',
        description:
            'SuperWorld’s mobile application allows users to discover, create, and personalize the “real world” with ' +
            'persistent AR content, including videos, audio, photos, text, animation, and 3D objects.',
        buttons: [{ name: 'Done', class: 'enter-btn' }],
        href: '#welcome',
        multipleBtns: false,
    },
];

function getStepContent(step: number, display: boolean) {
    return (
        <div className={display ? 'slide' : 'hidden'}>
            <img
                className={`slide-illustration ${Slides[step].imageclass}`}
                src={Slides[step].image}
                alt={`Slide ${step}`}
            />
            <div className="slide-info">
                <h3 className="slide-title">{Slides[step].title}</h3>
                <p className="slide-description">{Slides[step].description}</p>
                <p className="slide-description">{Slides[step].description2}</p>
                {Slides[step].description3 ? <p className='slide-description'>{Slides[step].description3}</p> : null}
            </div>
        </div>
    );
}

export default function OnboardingSlidesNew() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(-1);
    const history = useHistory();

    const handleFinish = () => {
        history.push('/guided-tour');
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleStart = () => {
        setActiveStep(0);
    };

    return (
        <>
            {activeStep === -1 ? (
                <div>
                    <div className="slide-header">
                        <span>
                            <img className="sw-logo" src={SuperWorldLogo} alt="SW logo" />
                            <button className="skip-Btn" onClick={handleFinish}>
                                {' '}
                                Skip{' '}
                            </button>
                        </span>
                    </div>
                    <div className="intro-content">
                        <div className="slide-info">
                            <h3 className="intro-title">Welcome to Superworld</h3>
                            <p className="intro-description">
                                Let’s learn more about the many unique features that SuperWorld has to offer.
                            </p>
                            <button className="start-btn" onClick={handleStart}>
                                Start
                            </button>
                        </div>
                        <img className={'globe-img'} src={Image0} alt={`Slides 0`} />
                    </div>
                </div>
            ) : (
                <div className="onboarding-body">
                    <div className="slide-header">
                        <span>
                            <img className="sw-logo" src={SuperWorldLogo} alt="SW logo" />
                            {activeStep !== 3 && (
                                <button className="skip-Btn" onClick={handleFinish}>
                                    {' '}
                                    Skip{' '}
                                </button>
                            )}
                        </span>
                    </div>
                    <div className="slide-content">
                        <Typography>{getStepContent(0, activeStep === 0)}</Typography>
                        <Typography>{getStepContent(1, activeStep === 1)}</Typography>
                        <Typography>{getStepContent(2, activeStep === 2)}</Typography>
                        <Typography>{getStepContent(3, activeStep === 3)}</Typography>
                    </div>
                    <div className="slide-footer">
                        <Button onClick={activeStep !== 3 ? handleNext : handleFinish} className={classes.buttonNext}>
                            {activeStep !== 3 ? 'NEXT' : 'DONE'}
                        </Button>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={activeStep === 0 ? classes.hidden : classes.buttonBack}
                        >
                            PREVIOUS
                        </Button>
                        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                            {[0, 1, 2, 3].map((index) => {
                                return (
                                    <Step key={index}>
                                        <StepButton onClick={handleStep(index)}></StepButton>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </div>
                </div>
            )}
        </>
    );
}