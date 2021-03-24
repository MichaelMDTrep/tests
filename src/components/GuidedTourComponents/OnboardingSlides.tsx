import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./styles/OnboardingSlides.css";
//components
import Carousel  from 'react-material-ui-carousel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';

//SuperWorld Logo
import SuperWorldLogo from "../../assets/onboarding/SWlogo.png";

//images
import Image0  from "../../assets/onboarding/Image0.png";
import Image1 from "../../assets/onboarding/Image1.png";
import Image2 from "../../assets/onboarding/Image2.png";
import Image3 from "../../assets/onboarding/Image3.png";
import Image4 from "../../assets/onboarding/Image4.png";


let buttonZIndex = 0;

const theme = createMuiTheme({
    transitions: {
      // So we have `transition: none;` everywhere
      create: () => 'none',
    },
  });
const OnboardingSlides= (props: any) => {

    const Slides=[
        {
            
            "image": Image0,
            "imageclass": "cryptoiscool0-img",
            "title": "Welcome to Superworld",
            "description": "Thank you for joining SuperWorld! Let's "+
            "learn about some of the many unique features that SuperWorld has to offer. ",
            "buttons":[],
            "multipleBtns":false
            
        },
        
        {
    
            "image": Image1,
            "imageclass": "cryptoiscool1-img",
            "title": "What is Superworld Virtual Real Estate?", style: "style1.class", 
            "description": "SuperWorld is a real estate platform that allows users to buy and sell "+
            "plots of digital land all over the world through Augmented Reality.",
            "description2":"SuperWorld's AR layer divides the world into 64.8 billion grids, each priced at 0.1 Ether.",
            "buttons":[],
            "multipleBtns":false
            
        },
        
        {
            "image": Image2,
          // "imageclass": "inverted-y-direction",
            "imageclass": "cryptoiscool2-img",
            "title": "Why does Superworld Use Cryptocurrency?",
            "description": "Thanks to cryptocurrency, SuperWorld is a decentralized marketplace that lets users complete transactions smoothly and directly.",
            "description2":"Crypto also allows for anonymity in transactions, mitigating fraud risk, and protecting the identity and data of the consumer.", 
            "buttons":[],
            "multipleBtns":false
            
        },
        {
            "image": Image3,
            "imageclass": "cryptoiscool3-img",
            "title": "Why Buy With Superworld?",
            "description": "SuperWorld's decentralized platform enables owners of the virtual real estate to receive a share "+
            "of the revenue from all activity, including e-commerce, digital commerce, advertising, data analytics, and transactions on their property. ",
            "buttons":[],
            "multipleBtns":false
        },
        {
            "image": Image4,
            //"imageclass": "inverted-y-direction",
            "imageclass": "cryptoiscool4-img",
            "title": "How does SuperWorld Mobile App use AR?",
            "description": "SuperWorld's mobile app is a social media platform that uses the same AR real estate technology as the website.",
            "description2":"It allows users to personalize the digital world with a variety of AR content creation, discovery, and monetization features.", 
            "buttons":[{"name":"Done", "class": "enter-btn"}],
            "href": "#welcome",
            "multipleBtns":false
        }
    ]

    const history = useHistory();
    const [slideNum, setSlideNum]= useState(-1);
    
    const handleSelect = (selectedIndex: number) => {
        console.log(selectedIndex);
       setSlideNum(selectedIndex);
    };

    const handleFinish = () => {
        history.push('/guided-tour');
    }

    return (
        <>
        {slideNum === -1 && 
            <div>
            <img className="sw-logo" src={SuperWorldLogo} alt="SW logo"/>
                        <button  className ="skip-Btn" onClick={() => {handleFinish()}}> Skip </button>
                        <img className={`slide-illustration ${Slides[0].imageclass}`} src={Slides[0].image} alt={`Slides 0`}/>
                       {/* <video autoPlay playsInline muted className={` slide-illustration ${slides[0].imageclass}`} src={slides[0].video} alt={`Slide 0`}/> */}
                        <div className="slide-info">
                            <h3 className="style1">{Slides[0].title}</h3>
                            <p className="slide-description">{Slides[0].description}</p>
                            <p className="slide-description">{Slides[0].description2}</p>
                            <button className="start-section" onClick={() => handleSelect(0)}>Start</button>
                        </div>
            </div>  
            
        }
            
            {slideNum !== -1 && 
            <Carousel
                indicators={true}
                onChange = {handleSelect}
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
                autoPlay = {false}
                fullHeightHover = { false }
                >
                {Slides
                    .filter(s => s.title !== "Welcome to Superworld")
                    .map((Slide, index) => (
                        <div key={index}>
                        <img className="sw-logo" src={SuperWorldLogo} alt="SW logo"/>
                        {slideNum !== 3 && <button className="skip-Btn" onClick={() => handleFinish()}> Skip </button>}
                        {slideNum === 3 && <button className="done-Btn" onClick={() => handleFinish()}>DONE</button>}
                        <img className={`slide-illustration ${Slide.imageclass}`} src={Slide.image} alt={`Slide ${index}`}/>
                        <div className="slide-info">
                            <h3 className="slide-title">{Slide.title}</h3>
                            <p className="slide-description">{Slide.description}</p>
                           <p className="slide-description">{Slide.description2}</p>
                        </div>
                        </div>
                ))}
		    </Carousel>
        }
        </>

        
    );
}




export default OnboardingSlides;