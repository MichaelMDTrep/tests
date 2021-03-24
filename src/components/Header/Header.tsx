import React, { useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SWLogo from '../../assets/svg/icon_color.svg';
import helpIcon from '../../assets/svg/help.svg';
import accountIcon from '../../assets/svg/account.svg';
import greenDot from '../../assets/svg/green-dot.svg';
import MenuItem from '@material-ui/core/MenuItem';
import { LayoutContext } from '../../state/Layout/context';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import redArrow from '../../assets/svg/arrow ETH.svg';
import greenArrow from '../../assets/svg/arrowGreenETH.svg';
import Auth from '../HOC/Auth';
import SignInModal from '../Modals/SignInModal/SignInModal';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';
//Snackbar Notification
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// import { useWeb3Context } from '@web3-react/core';
//Badge Notification
import Badge from '@material-ui/core/Badge';
//Open Notification menu dropdown
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
//Lists
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import MapGL,
{  
    NotificationCount,
    AllNotifyText
} from '../Map/MapGL/MapGL';
import notificationIcon from '../../assets/svg/Notification Icon.svg';
import CheckMarkIcon from '../../assets/svg/CheckMarkIcon';
import './Header.css';
// T;
import './HeaderDisplayBreakpoints.css';
import { CircularProgress, Grid, IconButton, Link, Menu, TextField, Input, Dialog } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Axios from 'axios';
import copy from 'copy-to-clipboard';

interface Features {
    bbox?: Array<number>;
    center: Array<number>;
    geometry?: unknown;
    id?: string;
    matching_place_name?: string;
    matching_text?: string;
    place_name?: string;
    place_type?: Array<string>;
    properties?: unknown;
    relevance?: number;
    text?: string;
    type?: string;
}

interface Properties {
    name: string;
    lon: number;
    lat: number;
    owner: string;
    selling: boolean;
}

interface IHeader {
    onChangeListener: (e: string) => void;
    submitHandler: (e: any) => void;
    goToLocation: (coords: { latitude: number; longitude: number }) => void;
    searchResults: Features[];
    myProperties: Properties[];
    sellingProperties: Properties[];
    wishlistResults: any[];
    initContracts: () => void;
    account?: any;
}

interface Credentials {
    newUsername: string;
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const Header = ({
    onChangeListener,
    submitHandler,
    searchResults,
    myProperties,
    sellingProperties,
    goToLocation,
    wishlistResults,
    initContracts,
    account,
}: // account,
// account
IHeader): JSX.Element => {
    // const { account } = useWeb3React<Web3Provider>();
    // const [balance, setBalance] = useState<any>();
    // const context = useWeb3Context();
    const { state, dispatch } = useContext(LayoutContext);

    const [MyPropsAnchorEl, setMyPropsAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mySellingPropsAnchorEl, setMySellingPropsAnchorEl] = React.useState<null | HTMLElement>(null);
    const [myWishlistAnchorEl, setMyWishlistAnchorEl] = React.useState<null | HTMLElement>(null);
    const [profileDropDownAnchorEl, setProfileDropDownAnchorEl] = React.useState<null | HTMLElement>(null);
    const [myReferralsAnchorEl, setMyReferralsAnchorEl] = React.useState<null | HTMLElement>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>('');
    const [ethPrice, setEthPrice] = React.useState<any>(null);
    // Notification Snackbar
    // const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    //Open Notification menu dropdown
    const [openNotifyDropDown, setOpenNotifyDropDown] = React.useState<boolean>(false);
    const profileDropDownOpen = Boolean(profileDropDownAnchorEl);
    const myPropsOpen = Boolean(MyPropsAnchorEl);
    const MySellingPropsOpen = Boolean(mySellingPropsAnchorEl);
    const myWishlistOpen = Boolean(myWishlistAnchorEl);
    const myReferralsOpen = Boolean(myReferralsAnchorEl);

    //menu for changing username and password (top right of the webapp)
    const [currentUser, setCurrentUser] = React.useState<any>({});
    const [changeUsernamePressed, setChangeUsernamePressed] = React.useState<boolean>(false);
    const [changePasswordPressed, setChangePasswordPressed] = React.useState<boolean>(false);
    const [credentials, setCredentials] = React.useState({} as Credentials)
    const [changePasswordButtonDisabled, setChangePasswordButtonDisabled] = React.useState<boolean>(true);
    const [changeUsernameSuccessDialogOpen, setChangeUsernameSuccessDialogOpen] = React.useState<boolean>(false);
    const [changePasswordSuccessDialogOpen, setChangePasswordSuccessDialogOpen] = React.useState<boolean>(false);
    const [changePasswordErrorMessage, setChangePasswordErrorMessage] = React.useState<string>('');

    //referral
    const [referralLink, setReferralLink] = React.useState<any>(null);

    // Notification Snackbar
    // const mySnackbarOpen = Boolean(snackbarOpen);
    const myNotifyDropDown = Boolean(openNotifyDropDown);

    // type: 0 - MyPropsAnchor
    // type: 1 - MySellingPropsAnchor
    // type: 2 - MyWishlistProps
    const handleClick = (event: any, type: number) => {
        switch (type) {
            case 0:
                setMyPropsAnchorEl(event.currentTarget);
                break;
            case 1:
                setMySellingPropsAnchorEl(event.currentTarget);
                break;
            case 2:
                setMyWishlistAnchorEl(event.currentTarget);
                break;
            case 3:
                setProfileDropDownAnchorEl(event.currentTarget);
                break;
            case 4: 
                setMyReferralsAnchorEl(event.currentTarget);
                break;
            default:
                break;
        }
    };

    const handleClose = () => {
        setMySellingPropsAnchorEl(null);
        setMyPropsAnchorEl(null);
        setMyWishlistAnchorEl(null);
        setProfileDropDownAnchorEl(null);
        setMyReferralsAnchorEl(null);
    };

    //Open Notification menu dropdown
    const handleNotifyDropDownClick = () => {
        setOpenNotifyDropDown((prev) => !prev);
    };

    const handleNotifyDropDownClickAway = () => {
        setOpenNotifyDropDown(false);
    };

    //Check number of notification
    let NotifyShowNumCheck: string = "You're all caught up!";

    if (NotificationCount == 0) {
        NotifyShowNumCheck = "You're all caught up!";

    } else {
        NotifyShowNumCheck = "";
    }

    //change username/password Menu
    const changeUsernameHandleClick = () => {
        setChangeUsernamePressed(!changeUsernamePressed);
    }

    const changePasswordHandleClick = () => {
        setChangePasswordPressed(!changePasswordPressed);
    }

    const changeCredentialsHandleChanges = (e:any) => {
        e.persist();
        const newCredentials = {...credentials, [e.target.name]: e.target.value}
        setCredentials(newCredentials);
        if(newCredentials.newPassword === newCredentials.confirmNewPassword){
            setChangePasswordButtonDisabled(false);
         } else {
             setChangePasswordButtonDisabled(true);
         }
    }

    useEffect(() => {
        Axios.defaults.headers = {
            Authorization: Auth.getToken(),
        };
        Axios
                .get(`${process.env.REACT_APP_API_URL}/user/get`)
                    .then((res:any) => {
                        setCurrentUser(res.data);
                    })
                    .catch((e:any) => {
                        console.log(e);
                    });
    }, [document.cookie, credentials])

    const changeUsernameOnSubmit = (e: any) => {
        e.preventDefault();
        Axios.defaults.headers = {
            Authorization: Auth.getToken()
        };
        Axios.post(`${process.env.REACT_APP_API_URL}/user/changeUsername`, {username: credentials.newUsername})
            .then(response => {
                setChangeUsernameSuccessDialogOpen(true);
                setChangeUsernamePressed(false);
                setCredentials({...credentials, newUsername: credentials.newUsername});
            })
            .catch(error => {
                console.log(error);
            })
    }

    const changePasswordOnSubmit = (e: any) => {
        e.preventDefault();
        Axios.defaults.headers = {
            Authorization: Auth.getToken()
        };
        Axios.post(`${process.env.REACT_APP_API_URL}/user/changePassword`, {currentPassword: credentials.currentPassword, password: credentials.newPassword})
            .then(response => {
                if(response.data.status === 's') {
                    setChangePasswordErrorMessage('');
                    setChangePasswordSuccessDialogOpen(true);
                    setChangePasswordPressed(false);
                    setCredentials({...credentials, newPassword: credentials.newPassword});
                } else {
                    setChangePasswordErrorMessage('Please use a correct current password');
                }
            })
            .catch(error => {
                console.log('change password went to catch', error);
            })
    }

    const handleDialogClose = () => {
        setChangeUsernameSuccessDialogOpen(false);
        setChangePasswordSuccessDialogOpen(false);
    }

    const SuccessDialog = (onClose:any, open:boolean) => {
        return (
            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth='xs' classes={{paper: profileMenuClasses.successDialog}}>
                <div style={{display: 'flex', flexDirection:'column'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '98%'}}>
                        <div style={{cursor: 'pointer', width: '10%'}} onClick={handleDialogClose}>
                            <CloseIcon fontSize='large' />
                        </div>
                    </div>
                    <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px'}}>SUCCESS!</p>
                    {changeUsernameSuccessDialogOpen ? <p style={{textAlign: 'center', color: '#888888'}}>Username has been updated.</p> : <p style={{textAlign:'center', color: '#888888'}}>Password has been updated.</p>}
                    
                </div>
            </Dialog>
        )
    }

    const profileMenuStyles = makeStyles({
        'MuiList-padding': {
            paddingTop: '0px'
        },
        profileMenu: {
          width: '170px',
          backgroundColor: '#FFFFFF',
          filter: 'dropshadow(0 0 4px #E7E7E7)'
        },
        changeMenu: {
            backgroundColor: '#FFFFFF',
            filter: 'dropshadow(0 0 4px #E7E7E7)',
            width: '200px'
        },
        text1: {
            backgroundColor: '#5540C7',
            "&:hover": {
                backgroundColor: '#5540C7',
                cursor: 'default'
            }
        },
        text2: {
            "&:hover": {
                backgroundColor: '#FFFFFF',
                cursor: 'default'
            }
        },
        input: {
            border: '1px solid #F2F2F2', 
            borderRadius:'15px', 
            width:'175px', 
            height: '25px', 
            margin:'3% 0 0 -1.5%',
            padding: '0px',
            textIndent: '10px',
            fontSize: '13px',
            "&::placeholder": {
                fontSize: '10px',
                textIndent: '10px',
                lineHeight: '25px'
            }
        },
        successDialog: {
            borderRadius: '15px',
            width: '300px',
            height: '200px',
            border: '2px solid #9098FF'
        }
      });

    const profileMenuClasses = profileMenuStyles();

    const getEthDollarPrice = () => {
        Axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true`,
        ).then((res) => {
            // console.log(typeof res.data.ethereum.usd_24h_change);
            setEthPrice(res.data.ethereum);
        });
        // return <span>{ethPrice.usd}</span>;
    };

    useEffect(() => {
        getEthDollarPrice();
        // console.log('Header', myProperties);
    }, []);

    useEffect(() => {
        Axios.get(`https://superworldapp.com/api/json/referrer/get/${account}`)
            .then((response) => {
                setReferralLink(`https://superworldapp.com/b/?r=${response.data.data.code}`);
            })
            .catch(error => {
                console.log(error);
            })
    }, [account])

    const searches = searchResults.map((e: Features, i) => {
        const bot_text = e.place_name?.split(',').slice(1).join().trim();
        return {
            key: i,
            top_text: e.text,
            bottom_text: bot_text,
            coords: { latitude: e.center[1], longitude: e.center[0] },
        };
    });
    const ITEM_HEIGHT = 50;
    // console.log(account);
    const myPropsDropDown = (
        <div>
            <Button
                className="myPropsMenu"
                variant="contained"
                aria-label="my Props"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={account ? (e) => handleClick(e, 0) : () => dispatch({
                            type: 'TOGGLE_SIGN_IN_MODAL',
                            payload: !state.signInModalIsOpen,
                        })}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '250px',
                        maxHeight: '35px',
                        alignItems: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            fontFamily: 'GibsonSemiBold',
                        }}
                    >
                        MY PROPERTIES
                    </p>
                    {myPropsOpen ? (
                        <KeyboardArrowUpIcon style={{ marginLeft: 'auto' }} />
                    ) : (
                        <KeyboardArrowDownIcon style={{ marginLeft: 'auto' }} />
                    )}
                </div>
            </Button>
            <Menu
                anchorEl={MyPropsAnchorEl}
                getContentAnchorEl={null}
                keepMounted
                open={myPropsOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        borderRadius: '4px',
                        maxHeight: ITEM_HEIGHT * 5,
                        width: '300px',
                    },
                }}
            >
                {myProperties
                    ? myProperties.map((property, i) => {
                          return (
                              <MenuItem
                                  className="scroller"
                                  key={i}
                                  onClick={() => {
                                      goToLocation({
                                          latitude: property.lat,
                                          longitude: property.lon,
                                      });
                                      handleClose();
                                  }}
                              >
                                  <Grid
                                      container
                                      direction="row"
                                      justify="space-around"
                                      alignItems="center"
                                      style={{
                                          display: 'flex',
                                          width: '300px',
                                          maxWidth: '300px',
                                          maxHeight: '40px',
                                          marginBottom: '10px',
                                          //   alignItems: 'center',
                                          borderBottom: '1px solid #C0C0C0',
                                          whiteSpace: 'pre-line',
                                      }}
                                  >
                                      <p
                                          style={{
                                              paddingBottom: '1px',
                                              width: '70%',
                                              justifyContent: 'flex-start',
                                          }}
                                      >
                                          {property.name ? property.name : `${property.lon},${property.lat}`}
                                      </p>
                                      <p
                                          style={{
                                              paddingBottom: '1px',
                                              width: '30%',
                                              justifyContent: 'flex-end',
                                          }}
                                      >
                                          {property.selling ? '(Selling)' : null}
                                      </p>
                                  </Grid>
                              </MenuItem>
                          );
                      })
                    : null}
            </Menu>
        </div>
    );
    // console.log(mySellingProperties);
    const mySellingPropsDropDown = (
        <div>
            <Button
                className="forSaleMenu"
                variant="contained"
                aria-label="my Props"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => handleClick(e, 1)}
                disabled={!account || !Auth.getAuth()}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '250px',
                        maxHeight: '35px',
                        alignItems: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            fontFamily: 'GibsonSemiBold',
                        }}
                    >
                        FOR SALE
                    </p>
                    {MySellingPropsOpen ? (
                        <KeyboardArrowUpIcon style={{ marginLeft: 'auto' }} />
                    ) : (
                        <KeyboardArrowDownIcon style={{ marginLeft: 'auto' }} />
                    )}
                </div>
            </Button>
            <Menu
                id="long-menu"
                anchorEl={mySellingPropsAnchorEl}
                keepMounted
                open={MySellingPropsOpen}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        borderRadius: '4px',
                        maxHeight: ITEM_HEIGHT * 5,
                        width: '250px',
                    },
                }}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {sellingProperties
                    ? sellingProperties.map((property, i) => property.selling ? (
                          <MenuItem
                              className="scroller"
                              key={i}
                              onClick={() => {
                                  goToLocation({
                                      latitude: property.lat,
                                      longitude: property.lon,
                                  });
                                  handleClose();
                              }}
                          >
                              <span
                                  style={{
                                      display: 'flex',
                                      width: '300px',
                                      maxWidth: '300px',
                                      maxHeight: '40px',
                                      marginBottom: '10px',
                                      alignItems: 'center',
                                      borderBottom: '1px solid #C0C0C0',
                                      whiteSpace: 'pre-line',
                                  }}
                              >
                                  <p style={{ flex: '1' }}>
                                      {property?.name ? property?.name : `${property?.lat},${property?.lon}`}
                                  </p>
                              </span>
                          </MenuItem>
                      ) : null)
                    : null}
            </Menu>
        </div>
    );
    const myWishlist = (
        <div>
            <Button
                className="myWishlistMenu"
                variant="contained"
                aria-label="my Props"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => handleClick(e, 2)}
                disabled={!account || !Auth.getAuth()}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '250px',
                        maxHeight: '35px',
                        alignItems: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            fontFamily: 'GibsonSemiBold',
                        }}
                    >
                        WISHLIST
                    </p>
                    {myWishlistOpen ? (
                        <KeyboardArrowUpIcon style={{ marginLeft: 'auto' }} />
                    ) : (
                        <KeyboardArrowDownIcon style={{ marginLeft: 'auto' }} />
                    )}
                </div>
            </Button>
            <Menu
                id="long-menu"
                anchorEl={myWishlistAnchorEl}
                keepMounted
                open={myWishlistOpen}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        borderRadius: '4px',
                        maxHeight: ITEM_HEIGHT * 5,
                        width: '250px',
                    },
                }}
            >
                {wishlistResults !== undefined
                    ? wishlistResults.map((coords, i) => (
                          <MenuItem
                              className="scroller"
                              key={i}
                              onClick={() => {
                                  goToLocation({
                                      latitude: coords.coordinates[1],
                                      longitude: coords.coordinates[0],
                                  });
                                  handleClose();
                              }}
                          >
                              <span
                                  style={{
                                      display: 'flex',
                                      width: '300px',
                                      maxWidth: '300px',
                                      maxHeight: '40px',
                                      marginBottom: '10px',
                                      alignItems: 'center',
                                      borderBottom: '1px solid #C0C0C0',
                                      whiteSpace: 'pre-line',
                                  }}
                              >
                                  <p style={{ flex: '1' }}>{coords.name}</p>
                              </span>
                          </MenuItem>
                      ))
                    : null}
            </Menu>
        </div>
    );

    const copyReferralLink = () => {
        copy(referralLink)
    }

    const myReferrals = (
        <div>
            <Button
                className="myReferralsMenu"
                variant="contained"
                aria-label="my Props"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={(e) => handleClick(e, 4)}
                disabled={!account || !Auth.getAuth()}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '250px',
                        maxHeight: '35px',
                        alignItems: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: '13px',
                            fontFamily: 'GibsonSemiBold',
                        }}
                    >
                        REFERRALS
                    </p>
                    {myReferralsOpen ? (
                        <KeyboardArrowUpIcon style={{ marginLeft: 'auto' }} />
                    ) : (
                        <KeyboardArrowDownIcon style={{ marginLeft: 'auto' }} />
                    )}
                </div>
            </Button>
            <Menu
                id="long-menu"
                anchorEl={myReferralsAnchorEl}
                keepMounted
                open={myReferralsOpen}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        borderRadius: '3px',
                        maxHeight: ITEM_HEIGHT * 5,
                        width: '250px',
                        paddingLeft: '5px',
                        // paddingRight: '5px',
                        textAlign: 'center',
                    },
                }}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <p><b>Share SuperWorld with friends and get a FREE plot when they purchase property using your referral.</b></p>
                <MenuItem style={{paddingLeft: '60px'}}>
                
                    <div className='referral' onClick={copyReferralLink} >
                        <span id='referralLink'><u>Copy Your Referral Link</u></span>
                    </div>
                </MenuItem>
                <MenuItem  style={{paddingLeft: '68px'}}>
                    <div className='referrals'>
                        <a className="btn-facebook btn-hover" href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`} target='share' />
                        <a className="btn-twitter btn-hover" href={`https://twitter.com/home?status=${encodeURI("SuperWorld AR Real Estate")} ${referralLink}`} target='share' />
                        <a className="btn-linkedin btn-hover" href={`https://www.linkedin.com/shareArticle?url=${referralLink}&title=${encodeURI('SuperWorld AR Real Estate')}`} target='share' />
                        <a className="btn-email btn-hover" href={`mailto:?subject=${encodeURI('SuperWorld AR Real Estate')}&body=${referralLink}`} target='share' />
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );

    const openWalletModal = () => {
        if(!account) {
            dispatch({
                type: 'TOGGLE_SIGN_IN_MODAL',
                payload: !state.signInModalIsOpen,
            });
        }
    }

    const inputFocus = () => {
        const input = document.querySelectorAll('#input');
        input?.forEach(field => field.setAttribute('type', 'password'));
    }

    return (
        // <div style={{ zIndex: 1, position: 'sticky' }}>
        <div style={{ zIndex: 4, position: 'sticky' }}>
            <AppBar position="static" elevation={4} style={{ maxHeight: '60px' }}>
                <Toolbar className="toolbar">
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
                        <Grid item spacing={1}>
                            <a href='https://www.superworldapp.com/'>
                                <img src={SWLogo} style={{ width: '50px' }} alt="SuperWorld Logo"></img>
                            </a>
                        </Grid>
                        <Grid item spacing={1}>
                            <Autocomplete
                                // freeSolo
                                autoHighlight
                                // id="combo-box-demo"
                                options={searches}
                                autoComplete
                                onInputChange={(_e, val) => {
                                    setSearch(val);
                                    setLoading(true);
                                    // handleClick(e);
                                    onChangeListener(val);
                                    setLoading(false);
                                }}
                                loading={loading}
                                getOptionLabel={(option) => `${option.top_text}, ${option.bottom_text}`}
                                noOptionsText="No Places"
                                ListboxProps={{
                                    style: {
                                        width: '480px',
                                        padding: '0px 0px',
                                    },
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        size="small"
                                        rows={1}
                                        label="Search"
                                        variant="outlined"
                                        onKeyPress={(e) => {
                                            // console.log(e.key);
                                            if (e.key === 'Enter') {
                                                submitHandler(search);
                                            }
                                        }}
                                        className="TextField-without-border-radius"
                                        style={{
                                            width: '500px',
                                            height: '40px',
                                            borderRadius: '200px',
                                        }}
                                        fullWidth
                                    />
                                )}
                                renderOption={(option) => {
                                    const top = option.top_text;
                                    const test = option.bottom_text;
                                    return (
                                        <Grid container>
                                            <Grid item xs>
                                                <div
                                                    className="search-result"
                                                    onClick={() => {
                                                        goToLocation(option.coords);
                                                    }}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            goToLocation(option.coords);
                                                        }
                                                    }}
                                                >
                                                    <p
                                                        style={{
                                                            fontFamily: 'GibsonSemiBold',
                                                            margin: '1px',
                                                        }}
                                                    >
                                                        {top}
                                                    </p>
                                                    <p
                                                        style={{
                                                            fontFamily: 'Gibson',
                                                            margin: '1px',
                                                        }}
                                                    >
                                                        {test}
                                                    </p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    );
                                }}
                            />
                        </Grid>
                    </Grid>
                    {Auth.getAuth() ? (
                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <Grid item>
                                <Button className={account || Auth.getToken() ? "wallet-button" : 'not-connected'} disabled={false} onClick={openWalletModal}>
                                    <Grid container direction="row" justify="space-around" alignItems="center">
                                        {account ? <><Grid item>Wallet Connected</Grid>
                                        <Grid item>
                                            <img style={{ width: '10px' }} src={greenDot} alt="" />{' '}
                                        </Grid> </>
                                        : <Grid item>Connect Wallet</Grid>}
                                    </Grid>
                                </Button>
                            </Grid>
                            <Grid item spacing={2}>
                                {/* Notification button on top toolbar */}
                                <ClickAwayListener
                                    mouseEvent="onMouseDown"
                                    touchEvent="onTouchStart"
                                    onClickAway={handleNotifyDropDownClickAway}
                                >
                                    <div
                                        style={{
                                            position: 'relative',
                                        }}
                                    >
                                        <Badge badgeContent={NotificationCount} max={999} color="primary">
                                            <img
                                                src={notificationIcon}
                                                // onClick={SnackbarhandleClick}
                                                onClick={handleNotifyDropDownClick}
                                                //Style in Badge number
                                                style={{
                                                    maxWidth: '30px',
                                                    cursor: 'pointer',
                                                    color: '#FFFFFF',
                                                    fontFamily: 'GibsonSemiBold',
                                                    fontSize: '12px',
                                                }}
                                            ></img>
                                        </Badge>

                                        {/* Notification dropdown open here */}
                                        {myNotifyDropDown ? (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 60,
                                                    right: -190,
                                                    marginRight: '100px',
                                                    width: '201px',
                                                    height: '269px',
                                                    maxHeight: '269px',
                                                    overflow: 'auto',
                                                    backgroundColor: 'white',
                                                    fontFamily: 'Gibson',
                                                    alignItems: 'flex-start',
                                                    borderRadius: '5px',
                                                    boxShadow: '4px 5px 5px 4px rgba(0, 0, 0, 0.14)',
                                                    boxSizing: 'inherit',
                                                    zIndex: 7,
                                                }}
                                            >
                                                <div style={{}}>
                                                    <List
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <ListItem alignItems="flex-start">
                                                            <ListItemText
                                                                primary=""
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            color="textPrimary"
                                                                            display="inline"
                                                                            style={{}}
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    position: 'fixed',
                                                                                    fontFamily: 'Gibson',
                                                                                    fontSize: '11pt',
                                                                                    color: '#888888',
                                                                                    margin: '60px auto 0px',
                                                                                    padding: '15px',
                                                                                }}
                                                                            >
                                                                                <CheckMarkIcon
                                                                                    notificationCount={
                                                                                        NotificationCount
                                                                                    }
                                                                                ></CheckMarkIcon>
                                                                                {NotifyShowNumCheck}
                                                                            </div>

                                                                            {/* Show all data for notification dropdown. */}
                                                                            {AllNotifyText.map((value) => {
                                                                                return (
                                                                                    <div
                                                                                        style={{
                                                                                            fontFamily: 'Gibson',
                                                                                            fontSize: '11pt',
                                                                                            color: '888888',
                                                                                            padding: '5px 15px 5px',
                                                                                            borderBottom:
                                                                                                '1px solid #E0E0E0',
                                                                                        }}
                                                                                    >
                                                                                        {value.text}
                                                                                        <span
                                                                                            style={{
                                                                                                fontFamily: 'Gibson',
                                                                                                fontSize: '8pt',
                                                                                                color: '888888',
                                                                                                marginTop: '5px',
                                                                                                marginBottom: '5px',
                                                                                            }}
                                                                                        >
                                                                                            {' '}
                                                                                            <br />
                                                                                            {value.time}{' '}
                                                                                        </span>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </Typography>
                                                                        {}
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </List>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </ClickAwayListener>
                            </Grid>
                            <Grid item spacing={2}>
                                <IconButton onClick={(e) => handleClick(e, 3)}>
                                    <img src={accountIcon} style={{ maxWidth: '30px' }} alt="My Profile Settings"></img>
                                </IconButton>
                                {changeUsernamePressed ? <Menu
                                    classes={{paper: profileMenuClasses.changeMenu}}
                                    id="long-menu"
                                    anchorEl={profileDropDownAnchorEl}
                                    keepMounted
                                    getContentAnchorEl={null}
                                    open={profileDropDownOpen}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            // maxHeight: ITEM_HEIGHT * 4.5,
                                            // width: '300px',
                                            // padding: '1px',
                                        },
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem disableGutters classes={{root: profileMenuClasses.text2}}>
                                        <div 
                                            style={{
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                alignItems: 'center', 
                                                borderBottom: '1px solid #F2F2F2', 
                                                minWidth: '100%', 
                                                maxHeight: '10px', 
                                                padding: '10px 0px 20px 15px'
                                                }}
                                                >
                                            <div 
                                                style={{
                                                    cursor: 'pointer', 
                                                    width: '20%', 
                                                    maxHeight: '10px', 
                                                    transform: 'scale(.7, .7)', 
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center', 
                                                    marginLeft: '-8%'
                                                    }} 
                                                    onClick={changeUsernameHandleClick}
                                                    >
                                                        <ArrowBackIosIcon fontSize='small' color='action'/>
                                            </div>
                                            <p 
                                                style={{
                                                    width: '80%', 
                                                    maxHeight: '10px', 
                                                    color: '#000000', 
                                                    fontWeight: 'bold', 
                                                    fontSize: '11px', 
                                                    marginBottom: '8%'
                                                    }}
                                                    >
                                                        &#8288;Change Username
                                            </p>
                                        </div>
                                    </MenuItem>
                                    <MenuItem disableGutters classes={{root: profileMenuClasses.text2}}>
                                        <div 
                                            style={{
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                justifyContent: 'center', 
                                                borderBottom: '1px solid #F2F2F2', 
                                                minWidth: '100%', 
                                                whiteSpace: 'pre-line', 
                                                maxHeight: '50px'
                                                }}
                                                >
                                            <p 
                                                style={{
                                                    color: '#000000', 
                                                    width: '100%', 
                                                    fontSize: '11px', 
                                                    fontWeight: 600, 
                                                    maxHeight: '12px', 
                                                    margin: '0 0 0 5%'
                                                    }}
                                                    >
                                                        &#8288;Current Username
                                            </p>
                                            <p 
                                                style={{
                                                    color: '#000000', 
                                                    width: '100%', 
                                                    fontSize: '10px', 
                                                    margin: '3% 0 10% 5%', 
                                                    maxHeight: '10px'
                                                    }}
                                                    >
                                                        {currentUser.username}
                                            </p>
                                        </div>
                                    </MenuItem>
                                    <MenuItem disableGutters classes={{root: profileMenuClasses.text2}}>
                                        <div 
                                            style={{
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                justifyContent:'center', 
                                                minWidth:'100%', 
                                                whiteSpace:'pre-line'
                                                }}
                                                >
                                            <p 
                                                style={{
                                                    color: '#888888', 
                                                    fontSize:'11px', 
                                                    margin: '0 0 0 5%', 
                                                    maxHeight: '10px'
                                                    }}
                                                    >
                                                        &#8288;New Username
                                            </p>
                                            <div 
                                            style={{
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                alignItems: 'center'
                                                }}
                                                >
                                                <Input 
                                                    key='newUsernameInput'
                                                    id='newUsername'
                                                    type='text' 
                                                    classes={{input: profileMenuClasses.input}} 
                                                    disableUnderline 
                                                    placeholder='New Username' 
                                                    name='newUsername' 
                                                    value={credentials.newUsername} 
                                                    onChange={changeCredentialsHandleChanges}
                                                    />
                                            </div>
                                            <Button 
                                                style={{
                                                    width: '100px', 
                                                    height: '26px', 
                                                    margin: '7% 0 0 5%', 
                                                    borderRadius: '15px', 
                                                    fontSize: '11px', 
                                                    backgroundColor: '#5540C7', 
                                                    color: '#FFFFFF', 
                                                    fontWeight: 600
                                                    }} 
                                                onClick={changeUsernameOnSubmit}
                                                >
                                                    CONFIRM
                                            </Button>
                                        </div>
                                    </MenuItem>
                                </Menu>
                                     : null 
                                    }

                                {changePasswordPressed ? <Menu
                                    classes={{paper: profileMenuClasses.changeMenu}}
                                    id="long-menu"
                                    anchorEl={profileDropDownAnchorEl}
                                    keepMounted
                                    getContentAnchorEl={null}
                                    open={profileDropDownOpen}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            // maxHeight: ITEM_HEIGHT * 4.5,
                                            // width: '300px',
                                            // padding: '1px',
                                        },
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem disableGutters classes={{root: profileMenuClasses.text2}}>
                                        <div 
                                            style={{
                                                display: 'flex', 
                                                flexDirection: 'row', 
                                                alignItems: 'center', 
                                                borderBottom: '1px solid #F2F2F2', 
                                                minWidth: '100%', 
                                                maxHeight: '10px', 
                                                padding: '10px 0px 20px 15px'
                                                }}
                                                >
                                            <div 
                                                style={{
                                                    cursor: 'pointer', 
                                                    width: '20%', 
                                                    maxHeight: '10px', 
                                                    transform: 'scale(.7, .7)', 
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center', 
                                                    marginLeft: '-8%'
                                                    }} 
                                                onClick={changePasswordHandleClick}
                                                >
                                                    <ArrowBackIosIcon fontSize='small' color='action'/>
                                            </div>
                                            <p 
                                                style={{
                                                    width: '80%', 
                                                    maxHeight: '10px', 
                                                    color: 'black', 
                                                    fontWeight: 'bold', 
                                                    fontSize: '11px', 
                                                    marginBottom: '8%'
                                                    }}
                                                    >
                                                        &#8288;Change Password
                                            </p>
                                        </div>
                                    </MenuItem>
                                    <MenuItem disableGutters classes={{root: profileMenuClasses.text2}}>
                                        <div 
                                            style={{
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                justifyContent:'center', 
                                                alignItems: 'space-evenly', 
                                                minWidth:'100%', 
                                                whiteSpace:'pre-line'
                                                }}
                                                >
                                            <p 
                                                style={{
                                                    color: '#888888', 
                                                    fontSize:'11px', 
                                                    margin: '0 0 0 5%', 
                                                    maxHeight: '10px'
                                                    }}
                                                    >
                                                        &#8288;Current Password
                                            </p>
                                            <div 
                                                style={{
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center', 
                                                    margin: '0 0 5% 0'
                                                    }}
                                                    >
                                                    <Input 
                                                        key='currentPasswordInput'
                                                        id='input'
                                                        type='text' 
                                                        classes={{input: profileMenuClasses.input}} 
                                                        disableUnderline
                                                        value={credentials.currentPassword} 
                                                        placeholder='Current Password' 
                                                        name='currentPassword'
                                                        onChange={changeCredentialsHandleChanges}
                                                        autoComplete='off'
                                                        onFocus={inputFocus}
                                                    />
                                            </div>
                                            {changePasswordErrorMessage ? <div style={{color:'red', fontSize: '10px', marginLeft: '5%', marginTop: '-5%'}}>{changePasswordErrorMessage}</div> : null}
                                            <label 
                                                style={{
                                                    color: '#888888', 
                                                    fontSize: '11px', 
                                                    margin: '0 0 0 5%', 
                                                    maxHeight: '10px'
                                                    }}
                                                    >
                                                        &#8288;New Password
                                            </label>
                                            <div 
                                                style={{
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center', 
                                                    margin: '0 0 5% 0'
                                                    }}
                                                    >
                                                <Input
                                                    key='newPasswordInput'
                                                    id='input'
                                                    type='text' 
                                                    classes={{input: profileMenuClasses.input}}
                                                    disableUnderline 
                                                    placeholder='New Password' 
                                                    name='newPassword' 
                                                    value={credentials.newPassword} 
                                                    onChange={changeCredentialsHandleChanges}
                                                    autoComplete='off'
                                                    onFocus={inputFocus}
                                                    />
                                            </div>
                                            <p 
                                                style={{
                                                    color: '#888888', 
                                                    fontSize: '11px', 
                                                    margin: '0 0 0 5%', 
                                                    maxHeight: '10px'
                                                    }}
                                                    >
                                                        &#8288;Confirm New Password
                                            </p>
                                            <div 
                                                style={{
                                                    display: 'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center'
                                                    }}
                                                    >
                                                <Input 
                                                    key='confirmNewPasswordInput'
                                                    id='input'
                                                    type='text' 
                                                    classes={{input: profileMenuClasses.input}} 
                                                    disableUnderline
                                                    placeholder='Confirm Password' 
                                                    name='confirmNewPassword' 
                                                    value={credentials.confirmNewPassword} 
                                                    onChange={changeCredentialsHandleChanges}
                                                    autoComplete='off'
                                                    onFocus={inputFocus}
                                                    />
                                            </div>
                                            <Button 
                                                style={!changePasswordButtonDisabled ? {
                                                    width: '100px', 
                                                    height: '26px', 
                                                    margin: '7% 0 0 5%', 
                                                    borderRadius: '15px', 
                                                    fontSize: '11px', 
                                                    backgroundColor: '#5540C7', 
                                                    color: '#FFFFFF'
                                                    } : {
                                                        width: '100px', 
                                                        height: '26px', 
                                                        margin: '7% 0 0 5%', 
                                                        borderRadius: '15px', 
                                                        fontSize: '11px', 
                                                        backgroundColor: '#5540C7', 
                                                        color: '#FFFFFF',
                                                        opacity: '35%'
                                                    }} 
                                                onClick={changePasswordOnSubmit}
                                                disabled={changePasswordButtonDisabled}
                                                >
                                                    CONFIRM
                                            </Button>
                                        </div>
                                    </MenuItem>
                                </Menu> : null}

                                <Menu
                                    classes={{paper: profileMenuClasses.profileMenu, list: profileMenuClasses["MuiList-padding"]}}
                                    id="long-menu"
                                    anchorEl={profileDropDownAnchorEl}
                                    keepMounted
                                    getContentAnchorEl={null}
                                    open={profileDropDownOpen}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            
                                            // maxHeight: ITEM_HEIGHT * 4.5,
                                            // width: '300px',
                                            // padding: '1px',
                                        },
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem disableGutters classes={{root: profileMenuClasses.text1}}>
                                        <div 
                                            style={{
                                                display: 'flex', 
                                                flexDirection:'column', 
                                                maxHeight: '50px', 
                                                justifyContent: 'center', 
                                                marginLeft: '10px',
                                                padding: '10px 3px 5px 3px'
                                                }}
                                                >
                                            <li 
                                                style={{
                                                    color: '#FFFFFF', 
                                                    fontFamily: 'Gibson', 
                                                    fontSize: '15px', 
                                                    fontWeight: 600
                                                    }}
                                                    >
                                                        Hello, {currentUser.username}
                                            </li>
                                            <li 
                                                style={{
                                                    color: '#FFFFFF', 
                                                    fontFamily: 'Gibson',
                                                    fontSize: '13px'
                                                    }}
                                                    >
                                                        {currentUser.email}
                                            </li>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={changeUsernameHandleClick} disableGutters>
                                        <span 
                                            style={{
                                                display: 'flex', 
                                                maxHeight: '10px', 
                                                alignItems: 'center', 
                                                whiteSpace: 'pre-line', 
                                                marginLeft: '10px',
                                                padding: '10px 3px 5px 3px'
                                                }}
                                                >
                                            <p 
                                                style={{
                                                    flex: '1', 
                                                    color: '#888888', 
                                                    fontFamily: 'Gibson', 
                                                    fontSize: '13px'
                                                    }}
                                                    >
                                                        Change username
                                            </p>
                                        </span>
                                    </MenuItem>
                                    <MenuItem onClick={changePasswordHandleClick} disableGutters>
                                        <span 
                                            style={{
                                                display: 'flex',
                                                maxHeight: '10px', 
                                                alignItems: 'center', 
                                                whiteSpace: 'pre-line', 
                                                marginLeft: '10px',
                                                padding: '10px 3px 5px 3px'
                                                }}
                                                >
                                            <p 
                                                style={{
                                                    flex: '1', 
                                                    color: '#888888', 
                                                    fontFamily: 'Gibson', 
                                                    fontSize: '13px', 
                                                    margin: '5px 0'
                                                    }}
                                                    >
                                                        Change password
                                            </p>
                                        </span>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            Axios.defaults.headers = {
                                                Authorization: Auth.getToken(),
                                            };
                                            Axios.post(`${process.env.REACT_APP_API_URL}/user/logout`)
                                                .then(() => {
                                                    // console.log('LOGGED OUT');
                                                })
                                                .catch((_e: any) => {
                                                    // console.log('LOGGED OUT ERROR');
                                                    console.log(_e);
                                                });
                                            Auth.logout();
                                            handleClose();
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: 'flex',
                                                maxHeight: '10px',
                                                alignItems: 'center',
                                                whiteSpace: 'pre-line',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    flex: '1',
                                                    color: '#5540c7',
                                                    fontFamily: 'Gibson',
                                                    fontSize: '11px',
                                                }}
                                            >
                                                Log Out
                                            </p>
                                        </span>
                                    </MenuItem>
                                </Menu>
                            </Grid>
                            <Grid item spacing={2}>
                                <Link
                                    href="https://www.superworldapp.com/contact/faq/FAQ/"
                                    target="_blank"
                                >
                                    <IconButton edge="end">
                                        <img style={{ maxWidth: '30px' }} src={helpIcon} alt="FAQ"></img>
                                    </IconButton>
                                </Link>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
                            <Grid item spacing={2}>
                                <Button
                                    className="LoginButton-header"
                                    onClick={() =>
                                        dispatch({
                                            type: 'TOGGLE_SIGN_IN_MODAL',
                                            payload: !state.signInModalIsOpen,
                                        })
                                    }
                                >
                                    ENTER SUPERWORLD
                                </Button>
                            </Grid>
                            <Grid item spacing={2}>
                                <Link
                                    href="https://www.blockchain.superworldapp.com/ar-real-estate#comp-kdf4ww18"
                                    target="_blank"
                                >
                                    <IconButton edge="end">
                                        <img style={{ maxWidth: '30px' }} src={helpIcon} alt="FAQ"></img>
                                    </IconButton>
                                </Link>
                            </Grid>
                        </Grid>
                    )}
                </Toolbar>
                <div>
                    {/* Arrow for hide & show Toolbar*/}
                    <div className="Arrow-hide-tap">
                        <Link id="hide1-tooltap" href="#hide1-tooltap" className="hide-tooltap">
                            <div style={{
                                    position: 'absolute',
                                    right: '50%',
                                    marginRight: '-65px',
                                    color: '#5a45c9',
                                    fontSize: '1.5rem',
                                    height: '28px',
                                    display: 'flex',
                                    justifySelf: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '130px',
                                    backgroundColor: 'white',
                                    borderRadius: '0 0 50px 50px',
                                    boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.14)',
                                    // boxSizing: 'border-box',
                                }}
                            >
                                    <span style={{fontSize: '13px', fontWeight: 'bold', margin: '0px 10px 0px 10px'}}>Show more</span>
                                    <ExpandMoreIcon />
                            </div>    
                        </Link>
                        <Link id="show1-tooltap" href="#show1-tooltap" className="show-tooltap">
                        <div style={{
                                    position: 'absolute',
                                    right: '50%',
                                    marginRight: '-65px',
                                    color: '#5a45c9',
                                    fontSize: '1.5rem',
                                    // border: '0',
                                    height: '28px',
                                    width: '130px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    top: '64px',
                                    backgroundColor: 'white',
                                    borderRadius: '0 0 50px 50px',
                                    boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.14)'
                                }}>
                                    <span style={{fontSize: '13px', fontWeight: 'bold', margin: '0px 10px 0px 10px'}}>Show less</span>
                                    <ExpandLessIcon />
                            </div>
                        </Link>
                        <div className="details-tooltap">
                            {/* <AppBar position="static" className="toolbar" hidden> */}
                            <Toolbar className="bottom-bar">
                                <>
                                    <Grid
                                        className="dropdowns"
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="center"
                                        xs={12}
                                        spacing={5}
                                    >
                                        <Grid item spacing={5}>
                                            {myPropsDropDown}
                                        </Grid>
                                        <Grid item spacing={5}>
                                            {mySellingPropsDropDown}
                                        </Grid>
                                        <Grid item spacing={5}>
                                            {myWishlist}
                                        </Grid>
                                        <Grid item spacing={5}>
                                            {myReferrals}
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        xs={3}
                                        container
                                        direction="row"
                                        justify="flex-end"
                                        alignItems="center"
                                        spacing={5}
                                    >
                                        {ethPrice ? (
                                            <div>
                                                <span className="ethPrice">
                                                    {`0.1 ETH = ${(ethPrice?.usd / 10).toFixed(2)} USD`}{' '}
                                                </span>
                                                <span
                                                    className={
                                                        ethPrice.usd_24h_change > 0 ? 'green-percent' : 'red-percent'
                                                    }
                                                >
                                                    {ethPrice.usd_24h_change.toFixed(2)}
                                                    %
                                                    <img
                                                        className={
                                                            ethPrice.usd_24h_change > 0 ? 'green-arrow' : 'red-arrow'
                                                        }
                                                        src={ethPrice.usd_24h_change > 0 ? greenArrow : redArrow}
                                                        alt=""
                                                    />
                                                </span>
                                                {/* <span className="percentage">-4.9%</span> */}
                                            </div>
                                        ) : (
                                            <div style={{marginRight: '10px'}}>
                                                <CircularProgress />
                                            </div>
                                        )}
                                    </Grid>
                                </>
                            </Toolbar>
                            {/* </AppBar> */}
                        </div>
                    </div>
                </div>
            </AppBar>
            {/* Div for my properties, selling, wishlist button */}
            <SignInModal initContracts={initContracts} />
            {(changeUsernameSuccessDialogOpen || changePasswordSuccessDialogOpen) ? <SuccessDialog onClose={handleDialogClose} style={profileMenuClasses.successDialog}/> : null}
        </div>
    );
};

export default Header;