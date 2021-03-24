"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var AppBar_1 = require("@material-ui/core/AppBar");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var Button_1 = require("@material-ui/core/Button");
var icon_color_svg_1 = require("../../assets/svg/icon_color.svg");
var help_svg_1 = require("../../assets/svg/help.svg");
// import notificationIcon from '../../assets/svg/notification.svg';
var account_svg_1 = require("../../assets/svg/account.svg");
var red_dot_svg_1 = require("../../assets/svg/red-dot.svg");
var green_dot_svg_1 = require("../../assets/svg/green-dot.svg");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var context_1 = require("../../state/Layout/context");
// import { shortenAddress } from '../../utils';
// import { injected, fortmatic, portis } from '../../utils/connectors';
var ExpandLess_1 = require("@material-ui/icons/ExpandLess");
var ExpandMore_1 = require("@material-ui/icons/ExpandMore");
var arrow_ETH_svg_1 = require("../../assets/svg/arrow ETH.svg");
var arrowGreenETH_svg_1 = require("../../assets/svg/arrowGreenETH.svg");
var Auth_1 = require("../HOC/Auth");
var SignInModal_1 = require("../Modals/SignInModal/SignInModal");
// import VisibilityIcon from '@material-ui/icons/Visibility';
var KeyboardArrowDown_1 = require("@material-ui/icons/KeyboardArrowDown");
var KeyboardArrowUp_1 = require("@material-ui/icons/KeyboardArrowUp");
//Badge Notification
require("./styles/Header.css");
require("./styles/HeaderDisplayBreakpoints.css");
var core_1 = require("@material-ui/core");
var lab_1 = require("@material-ui/lab");
var axios_1 = require("axios");
//Badge Notification
var Badge_1 = require("@material-ui/core/Badge");
//Open Notification menu dropdown
var ClickAwayListener_1 = require("@material-ui/core/ClickAwayListener");
//Lists
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Typography_1 = require("@material-ui/core/Typography");
var MapGL_1 = require("../Map/MapGL/MapGL");
var Notification_Icon_svg_1 = require("../../assets/svg/Notification Icon.svg");
var CheckMarkIcon_1 = require("../../assets/svg/CheckMarkIcon");
var Header = function (_a) {
    var triedEager = _a.triedEager, toggleMapStyle = _a.toggleMapStyle, goToUserLocation = _a.goToUserLocation, onChangeListener = _a.onChangeListener, submitHandler = _a.submitHandler, searchResults = _a.searchResults, myProperties = _a.myProperties, mySellingProperties = _a.mySellingProperties, goToLocation = _a.goToLocation, wishlistResults = _a.wishlistResults, initContracts = _a.initContracts, account = _a.account;
    // const { account, connector, library, error } = useWeb3React<Web3Provider>();
    // const [balance, setBalance] = useState<any>();
    var _b = react_1.useContext(context_1.LayoutContext), state = _b.state, dispatch = _b.dispatch;
    var _c = react_1["default"].useState(null), MyPropsAnchorEl = _c[0], setMyPropsAnchorEl = _c[1];
    var _d = react_1["default"].useState(null), mySellingPropsAnchorEl = _d[0], setMySellingPropsAnchorEl = _d[1];
    var _f = react_1["default"].useState(null), myWishlistAnchorEl = _f[0], setMyWishlistAnchorEl = _f[1];
    var _g = react_1["default"].useState(null), profileDropDownAnchorEl = _g[0], setProfileDropDownAnchorEl = _g[1];
    var _h = react_1["default"].useState(false), loading = _h[0], setLoading = _h[1];
    var _j = react_1["default"].useState(''), search = _j[0], setSearch = _j[1];
    var _k = react_1["default"].useState(null), ethPrice = _k[0], setEthPrice = _k[1];
    //Open Notification menu dropdown
    var _l = react_1["default"].useState(false), openNotifyDropDown = _l[0], setOpenNotifyDropDown = _l[1];
    var profileDropDownOpen = Boolean(profileDropDownAnchorEl);
    var myPropsOpen = Boolean(MyPropsAnchorEl);
    var MySellingPropsOpen = Boolean(mySellingPropsAnchorEl);
    var myWishlistOpen = Boolean(myWishlistAnchorEl);
    //Open Notification menu dropdown
    var myNotifyDropDown = Boolean(openNotifyDropDown);
    // type: 0 - MyPropsAnchor
    // type: 1 - MySellingPropsAnchor
    // type: 2 - MyWishlistProps
    var handleClick = function (event, type) {
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
            default:
                break;
        }
    };
    var handleClose = function () {
        setMySellingPropsAnchorEl(null);
        setMyPropsAnchorEl(null);
        setMyWishlistAnchorEl(null);
        setProfileDropDownAnchorEl(null);
    };
    //Open Notification menu dropdown
    // const useStylesNotification = makeStyles((theme: Theme) =>
    //     createStyles({
    //         root: {
    //             position: 'relative',
    //         },
    //         dropdown: {
    //             position: 'absolute',
    //             top: 28,
    //             right: 0,
    //             left: 0,
    //             zIndex: 1,
    //             border: '1px solid',
    //             padding: theme.spacing(1),
    //             backgroundColor: theme.palette.background.paper,
    //         },
    //     }),
    // );
    // function LeadingClickAway() {
    //     const classesNotifyDropDown = useStylesNotification();
    //     const [openNotifyDropDown, setOpenNotifyDropDown] = React.useState(false);
    //     const handleNotifyDropDownClick = () => {
    //         setOpenNotifyDropDown((prev) => !prev);
    //     };
    //     const handleNotifyDropDownClickAway = () => {
    //         setOpenNotifyDropDown(false);
    //     };
    // }
    //Open Notification menu dropdown
    var handleNotifyDropDownClick = function () {
        setOpenNotifyDropDown(function (prev) { return !prev; });
    };
    var handleNotifyDropDownClickAway = function () {
        setOpenNotifyDropDown(false);
    };
    //Check number of notification
    var NotifyShowNumCheck = "You're all caught up!";
    if (MapGL_1.NotificationCount == 0) {
        NotifyShowNumCheck = "You're all caught up!";
    }
    else {
        NotifyShowNumCheck = "";
    }
    //Check number of notification
    var getEthDollarPrice = function () {
        axios_1["default"].get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true").then(function (res) {
            // console.log(typeof res.data.ethereum.usd_24h_change);
            setEthPrice(res.data.ethereum);
        });
        // return <span>{ethPrice.usd}</span>;
    };
    react_1.useEffect(function () {
        getEthDollarPrice();
        console.log('Header', myProperties);
    }, []);
    react_1.useEffect(function () {
        console.log('TEST');
    }, [account]);
    // useEffect(() => {
    //     if (!!account && !!library) {
    //         let isStale = false;
    //         library.getBalance(account).then((balance: any) => {
    //             if (!isStale) setBalance(parseFloat(formatEther(balance)).toFixed(2));
    //         });
    //         return () => {
    //             isStale = true;
    //             setBalance(undefined);
    //         };
    //     }
    // }, [account, library]);
    var searches = searchResults.map(function (e, i) {
        var _a;
        var bot_text = (_a = e.place_name) === null || _a === void 0 ? void 0 : _a.split(',').slice(1).join().trim();
        return {
            key: i,
            top_text: e.text,
            bottom_text: bot_text,
            coords: { latitude: e.center[1], longitude: e.center[0] }
        };
    });
    var ITEM_HEIGHT = 50;
    var myPropsDropDown = (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Button_1["default"], { className: "myPropsMenu", variant: "contained", "aria-label": "my Props", "aria-controls": "long-menu", "aria-haspopup": "true", onClick: function (e) { return handleClick(e, 0); }, disabled: !account || !Auth_1["default"].getAuth() },
            react_1["default"].createElement("div", { className: "myPropertiesButton", style: {
                    display: 'flex',
                    width: '250px',
                    maxHeight: '35px',
                    alignItems: 'center'
                } },
                react_1["default"].createElement("p", { style: {
                        fontSize: '13px',
                        fontFamily: 'GibsonSemiBold'
                    } }, "MY PROPERTIES"),
                myPropsOpen ? (react_1["default"].createElement(KeyboardArrowUp_1["default"], { style: { marginLeft: 'auto' } })) : (react_1["default"].createElement(KeyboardArrowDown_1["default"], { style: { marginLeft: 'auto' } })))),
        react_1["default"].createElement(core_1.Menu, { anchorEl: MyPropsAnchorEl, getContentAnchorEl: null, keepMounted: true, open: myPropsOpen, onClose: handleClose, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'center'
            }, PaperProps: {
                style: {
                    borderRadius: '4px',
                    maxHeight: ITEM_HEIGHT * 5,
                    width: '300px'
                }
            } }, myProperties
            ? myProperties.map(function (coords, i) {
                console.log(coords);
                return (react_1["default"].createElement(MenuItem_1["default"], { className: "scroller", key: i, onClick: function (_e) {
                        goToLocation({
                            latitude: coords.latitude,
                            longitude: coords.longitude
                        });
                        handleClose();
                    } },
                    react_1["default"].createElement(core_1.Grid, { container: true, direction: "row", justify: "space-around", alignItems: "center", style: {
                            display: 'flex',
                            width: '300px',
                            maxWidth: '300px',
                            maxHeight: '40px',
                            marginBottom: '10px',
                            //   alignItems: 'center',
                            borderBottom: '1px solid #C0C0C0',
                            whiteSpace: 'pre-line'
                        } },
                        react_1["default"].createElement("p", { style: {
                                paddingBottom: '1px',
                                width: '70%',
                                justifyContent: 'flex-start'
                            } }, coords.name ? coords.name : coords.longitude + "," + coords.latitude),
                        react_1["default"].createElement("p", { style: {
                                paddingBottom: '1px',
                                width: '30%',
                                justifyContent: 'flex-end'
                            } }, mySellingProperties.map(function (sellingProperty) { return sellingProperty.name === coords.name ? true : false; }).includes(true) ? "(Selling)" : null))));
            })
            : null)));
    console.log(mySellingProperties);
    console.log('myProperties', myProperties);
    var mySellingPropsDropDown = (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Button_1["default"], { className: "forSaleMenu", variant: "contained", "aria-label": "my Props", "aria-controls": "long-menu", "aria-haspopup": "true", onClick: function (e) { return handleClick(e, 1); }, disabled: !account || !Auth_1["default"].getAuth() },
            react_1["default"].createElement("div", { className: "forSaleButton", style: {
                    display: 'flex',
                    width: '250px',
                    maxHeight: '35px',
                    alignItems: 'center'
                } },
                react_1["default"].createElement("p", { style: {
                        fontSize: '13px',
                        fontFamily: 'GibsonSemiBold'
                    } }, "FOR SALE"),
                MySellingPropsOpen ? (react_1["default"].createElement(KeyboardArrowUp_1["default"], { style: { marginLeft: 'auto' } })) : (react_1["default"].createElement(KeyboardArrowDown_1["default"], { style: { marginLeft: 'auto' } })))),
        react_1["default"].createElement(core_1.Menu, { id: "long-menu", anchorEl: mySellingPropsAnchorEl, keepMounted: true, open: MySellingPropsOpen, onClose: handleClose, PaperProps: {
                style: {
                    borderRadius: '4px',
                    maxHeight: ITEM_HEIGHT * 5,
                    width: '250px'
                }
            }, getContentAnchorEl: null, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'center'
            } }, mySellingProperties
            ? mySellingProperties.map(function (coords, i) { return (react_1["default"].createElement(MenuItem_1["default"], { className: "scroller", key: i, onClick: function () {
                    goToLocation({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                    handleClose();
                } },
                react_1["default"].createElement("span", { style: {
                        display: 'flex',
                        width: '300px',
                        maxWidth: '300px',
                        maxHeight: '40px',
                        marginBottom: '10px',
                        alignItems: 'center',
                        borderBottom: '1px solid #C0C0C0',
                        whiteSpace: 'pre-line'
                    } },
                    react_1["default"].createElement("p", { style: { flex: '1' } }, (coords === null || coords === void 0 ? void 0 : coords.name) ? coords === null || coords === void 0 ? void 0 : coords.name : (coords === null || coords === void 0 ? void 0 : coords.latitude) + "," + (coords === null || coords === void 0 ? void 0 : coords.longitude))))); })
            : null)));
    var myWishlist = (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Button_1["default"], { className: "myWishlistMenu", variant: "contained", "aria-label": "my Props", "aria-controls": "long-menu", "aria-haspopup": "true", onClick: function (e) { return handleClick(e, 2); }, disabled: !account || !Auth_1["default"].getAuth() },
            react_1["default"].createElement("div", { className: "wishListButton", style: {
                    display: 'flex',
                    width: '250px',
                    maxHeight: '35px',
                    alignItems: 'center'
                } },
                react_1["default"].createElement("p", { style: {
                        fontSize: '13px',
                        fontFamily: 'GibsonSemiBold'
                    } }, "WISHLIST"),
                myWishlistOpen ? (react_1["default"].createElement(KeyboardArrowUp_1["default"], { style: { marginLeft: 'auto' } })) : (react_1["default"].createElement(KeyboardArrowDown_1["default"], { style: { marginLeft: 'auto' } })))),
        react_1["default"].createElement(core_1.Menu, { id: "long-menu", anchorEl: myWishlistAnchorEl, keepMounted: true, open: myWishlistOpen, onClose: handleClose, getContentAnchorEl: null, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'center'
            }, PaperProps: {
                style: {
                    borderRadius: '4px',
                    maxHeight: ITEM_HEIGHT * 5,
                    width: '250px'
                }
            } }, (wishlistResults === null || wishlistResults === void 0 ? void 0 : wishlistResults.length) >= 1
            ? wishlistResults.map(function (coords, i) { return (react_1["default"].createElement(MenuItem_1["default"], { className: "scroller", key: i, onClick: function (_e) {
                    goToLocation({
                        latitude: coords.coordinates[1],
                        longitude: coords.coordinates[0]
                    });
                    handleClose();
                } },
                react_1["default"].createElement("span", { style: {
                        display: 'flex',
                        width: '300px',
                        maxWidth: '300px',
                        maxHeight: '40px',
                        marginBottom: '10px',
                        alignItems: 'center',
                        borderBottom: '1px solid #C0C0C0',
                        whiteSpace: 'pre-line'
                    } },
                    react_1["default"].createElement("p", { style: { flex: '1' } }, coords.name)))); })
            : null)));
    return (
    // <div style={{ zIndex: 1, position: 'sticky' }}>
    react_1["default"].createElement("div", { style: { zIndex: 1, position: 'sticky' } },
        react_1["default"].createElement(AppBar_1["default"], { position: "static", elevation: 4, style: { maxHeight: '60px' } },
            react_1["default"].createElement(Toolbar_1["default"], { className: "toolbar" },
                react_1["default"].createElement(core_1.Grid, { container: true, direction: "row", justify: "flex-start", alignItems: "center", spacing: 1 },
                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 1 },
                        react_1["default"].createElement("img", { src: icon_color_svg_1["default"], style: { width: '50px' } })),
                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 1 },
                        react_1["default"].createElement(lab_1.Autocomplete, { freeSolo: true, autoHighlight: true, 
                            // id="combo-box-demo"
                            options: searches, autoComplete: true, onInputChange: function (_e, val) {
                                setSearch(val);
                                setLoading(true);
                                // handleClick(e);
                                onChangeListener(val);
                                setLoading(false);
                            }, loading: loading, getOptionLabel: function (option) { return option.top_text + ", " + option.bottom_text; }, noOptionsText: "No Places", className: 'header__search', ListboxProps: {
                                style: {
                                    width: '480px',
                                    padding: '0px 0px'
                                }
                            }, renderInput: function (params) { return (react_1["default"].createElement(core_1.TextField, __assign({}, params, { size: "small", rows: 1, label: "Search", variant: "outlined", onKeyPress: function (e) {
                                    console.log(e.key);
                                    if (e.key === 'Enter') {
                                        submitHandler(search);
                                    }
                                }, className: "TextField-without-border-radius", style: {
                                    width: '500px',
                                    height: '40px',
                                    borderRadius: '200px'
                                }, fullWidth: true }))); }, renderOption: function (option) {
                                var top = option.top_text;
                                var test = option.bottom_text;
                                return (react_1["default"].createElement(core_1.Grid, { container: true },
                                    react_1["default"].createElement(core_1.Grid, { item: true, xs: true },
                                        react_1["default"].createElement("div", { className: "search-result", onClick: function (_e) {
                                                goToLocation(option.coords);
                                            }, onKeyPress: function (e) {
                                                if (e.key === 'Enter') {
                                                    goToLocation(option.coords);
                                                }
                                            } },
                                            react_1["default"].createElement("p", { style: {
                                                    fontFamily: 'GibsonSemiBold',
                                                    margin: '1px'
                                                } }, top),
                                            react_1["default"].createElement("p", { style: {
                                                    fontFamily: 'Gibson',
                                                    margin: '1px'
                                                } }, test)))));
                            } }))),
                Auth_1["default"].getAuth() ? (react_1["default"].createElement(core_1.Grid, { container: true, direction: "row", justify: "flex-end", alignItems: "center", spacing: 2 },
                    react_1["default"].createElement(core_1.Grid, { item: true },
                        react_1["default"].createElement(Button_1["default"], { className: "wallet-button", disabled: account ? false : true },
                            react_1["default"].createElement(core_1.Grid, { container: true, direction: "row", justify: "space-around", alignItems: "center" },
                                react_1["default"].createElement(core_1.Grid, { item: true }, "Wallet Connected"),
                                react_1["default"].createElement(core_1.Grid, { item: true },
                                    react_1["default"].createElement("img", { style: { width: '10px' }, src: account ? green_dot_svg_1["default"] : red_dot_svg_1["default"], alt: "" }),
                                    ' ')))),
                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 2 },
                        react_1["default"].createElement(ClickAwayListener_1["default"], { mouseEvent: "onMouseDown", touchEvent: "onTouchStart", onClickAway: handleNotifyDropDownClickAway },
                            react_1["default"].createElement("div", { style: {
                                    position: 'relative'
                                } },
                                react_1["default"].createElement(Badge_1["default"], { badgeContent: MapGL_1.NotificationCount, max: 999, color: "primary" },
                                    react_1["default"].createElement("img", { src: Notification_Icon_svg_1["default"], 
                                        // onClick={SnackbarhandleClick}
                                        onClick: handleNotifyDropDownClick, 
                                        //Style in Badge number
                                        style: {
                                            maxWidth: '30px',
                                            cursor: 'pointer',
                                            color: '#FFFFFF',
                                            fontFamily: 'GibsonSemiBold',
                                            fontSize: '12px'
                                        }, className: "notification-button" })),
                                myNotifyDropDown ? (react_1["default"].createElement("div", { style: {
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
                                        zIndex: 7
                                    } },
                                    react_1["default"].createElement("div", { style: {} },
                                        react_1["default"].createElement(List_1["default"], { style: {
                                                width: '100%'
                                            } },
                                            react_1["default"].createElement(ListItem_1["default"], { alignItems: "flex-start" },
                                                react_1["default"].createElement(ListItemText_1["default"], { primary: "", secondary: react_1["default"].createElement(react_1["default"].Fragment, null,
                                                        react_1["default"].createElement(Typography_1["default"], { component: "span", variant: "body2", color: "textPrimary", display: "inline", style: {} },
                                                            react_1["default"].createElement("div", { style: {
                                                                    position: 'fixed',
                                                                    fontFamily: 'Gibson',
                                                                    fontSize: '11pt',
                                                                    color: '#888888',
                                                                    marginTop: '80px',
                                                                    marginLeft: '20px',
                                                                    padding: '15px'
                                                                } },
                                                                react_1["default"].createElement(CheckMarkIcon_1["default"], { notificationCount: MapGL_1.NotificationCount }),
                                                                NotifyShowNumCheck),
                                                            MapGL_1.AllNotifyText.map(function (value) {
                                                                return (react_1["default"].createElement("div", { style: {
                                                                        fontFamily: 'Gibson',
                                                                        fontSize: '11pt',
                                                                        color: '888888',
                                                                        padding: '5px 15px 5px',
                                                                        borderBottom: '1px solid #E0E0E0'
                                                                    } },
                                                                    value.text,
                                                                    react_1["default"].createElement("span", { style: {
                                                                            fontFamily: 'Gibson',
                                                                            fontSize: '8pt',
                                                                            color: '888888',
                                                                            marginTop: '5px',
                                                                            marginBottom: '5px'
                                                                        } },
                                                                        ' ',
                                                                        react_1["default"].createElement("br", null),
                                                                        value.time,
                                                                        ' ')));
                                                            }))) })))))) : null))),
                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 2 },
                        react_1["default"].createElement(core_1.IconButton, { className: "accountIconButton", onClick: function (e) { return handleClick(e, 3); } },
                            react_1["default"].createElement("img", { src: account_svg_1["default"], style: { maxWidth: '30px' } })),
                        react_1["default"].createElement(core_1.Menu, { id: "long-menu", anchorEl: profileDropDownAnchorEl, keepMounted: true, getContentAnchorEl: null, open: profileDropDownOpen, onClose: handleClose, PaperProps: {
                                style: {
                                    // maxHeight: ITEM_HEIGHT * 4.5,
                                    // width: '300px',
                                    padding: '1px'
                                }
                            }, anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                            }, transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left'
                            } },
                            react_1["default"].createElement(MenuItem_1["default"], { onClick: function () {
                                    axios_1["default"].defaults.headers = {
                                        Authorization: Auth_1["default"].getToken()
                                    };
                                    axios_1["default"].post(process.env.REACT_APP_API_URL + "/user/logout")
                                        .then(function (_e) {
                                        console.log('LOGGED OUT');
                                    })["catch"](function (_e) {
                                        console.log('LOGGED OUT ERROR');
                                    });
                                    Auth_1["default"].logout();
                                    handleClose();
                                } },
                                react_1["default"].createElement("span", { className: "log-out-dropdown", style: {
                                        display: 'flex',
                                        maxHeight: '10px',
                                        alignItems: 'center',
                                        whiteSpace: 'pre-line'
                                    } },
                                    react_1["default"].createElement("p", { style: {
                                            flex: '1',
                                            color: '#5540c7',
                                            fontFamily: 'Gibson',
                                            fontSize: '11px'
                                        } }, "Log Out"))))),
                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 2 },
                        react_1["default"].createElement(core_1.Link, { href: "https://www.blockchain.superworldapp.com/ar-real-estate#comp-kdf4ww18", target: "_blank" },
                            react_1["default"].createElement(core_1.IconButton, { edge: "end", className: "FAQButton" },
                                react_1["default"].createElement("img", { style: { maxWidth: '30px' }, src: help_svg_1["default"] })))))) : (react_1["default"].createElement(core_1.Grid, { container: true, direction: "row", justify: "flex-end", alignItems: "center", spacing: 2 },
                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 2 },
                        react_1["default"].createElement(Button_1["default"], { className: "LoginButton-header", onClick: function () {
                                return dispatch({
                                    type: 'TOGGLE_SIGN_IN_MODAL',
                                    payload: !state.signInModalIsOpen
                                });
                            } }, "Login")),
                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 2 },
                        react_1["default"].createElement(core_1.Link, { href: "https://www.blockchain.superworldapp.com/ar-real-estate#comp-kdf4ww18", target: "_blank" },
                            react_1["default"].createElement(core_1.IconButton, { edge: "end", className: "FAQButton" },
                                react_1["default"].createElement("img", { style: { maxWidth: '30px' }, src: help_svg_1["default"] }))))))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "Arrow-hide-tap" },
                    react_1["default"].createElement(core_1.Link, { id: "show-tooltap", href: "#show-tooltap", className: "show-tooltap" },
                        react_1["default"].createElement("button", { style: {
                                width: '50px',
                                height: '30px',
                                border: '0',
                                marginTop: '0',
                                backgroundColor: 'white',
                                borderRadius: '0 0 20px 20px',
                                boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.14)',
                                outline: 'none',
                                position: 'relative'
                            }, className: "Btn-ArrowShowToolbar" },
                            react_1["default"].createElement(ExpandMore_1["default"], { style: {
                                    color: '#5a45c9',
                                    fontSize: '1.5rem',
                                    zIndex: 7
                                }, className: "ArrowShowToolbar" }))),
                    react_1["default"].createElement(core_1.Link, { id: "hide-tooltap", href: "#hide-tooltap", className: "hide-tooltap" },
                        react_1["default"].createElement("span", null,
                            react_1["default"].createElement("button", { style: {
                                    width: '50px',
                                    height: '95px',
                                    border: '0',
                                    backgroundColor: 'white',
                                    borderRadius: '0 0 20px 20px',
                                    boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.14)',
                                    outline: 'none',
                                    position: 'relative'
                                }, className: "Btn-ArrowHideToolbar" },
                                react_1["default"].createElement(ExpandLess_1["default"], { style: {
                                        color: '#5a45c9',
                                        fontSize: '1.5rem',
                                        zIndex: 7
                                    }, className: "ArrowHideToolbar" })))),
                    react_1["default"].createElement("div", { className: "details-tooltap" },
                        react_1["default"].createElement(Toolbar_1["default"], { className: "bottom-bar" },
                            react_1["default"].createElement(react_1["default"].Fragment, null,
                                react_1["default"].createElement(core_1.Grid, { className: "dropdowns", container: true, direction: "row", justify: "flex-start", alignItems: "center", xs: 12, spacing: 5 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 5 }, myPropsDropDown),
                                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 5 }, mySellingPropsDropDown),
                                    react_1["default"].createElement(core_1.Grid, { item: true, spacing: 5 }, myWishlist)),
                                react_1["default"].createElement(core_1.Grid, { xs: 3, container: true, direction: "row", justify: "flex-end", alignItems: "center", spacing: 5 }, ethPrice ? (react_1["default"].createElement("div", null,
                                    react_1["default"].createElement("span", { className: "ethPrice" }, "0.1 ETH = " + ((ethPrice === null || ethPrice === void 0 ? void 0 : ethPrice.usd) / 10).toFixed(2) + " USD",
                                        ' '),
                                    react_1["default"].createElement("span", { className: ethPrice.usd_24h_change > 0 ? 'green-percent' : 'red-percent' },
                                        ethPrice.usd_24h_change.toFixed(2),
                                        "%",
                                        react_1["default"].createElement("img", { className: ethPrice.usd_24h_change > 0 ? 'green-arrow' : 'red-arrow', src: ethPrice.usd_24h_change > 0 ? arrowGreenETH_svg_1["default"] : arrow_ETH_svg_1["default"], alt: "" })))) : (react_1["default"].createElement(core_1.CircularProgress, null))))))))),
        react_1["default"].createElement(SignInModal_1["default"], { initContracts: initContracts })));
};
exports["default"] = Header;
