import React from 'react';
import { Link } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
// import '../utils/bulma_global.scss';
import '../utils/bulmaGlobal.scss';
import { stack as Menu } from 'react-burger-menu';
import MainLogo from './svg';

// Creating sidebar styles
const GlobalStyleSidebar = createGlobalStyle`
  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0,0,0,0.9) !important;
  }
  /* Individual item */
  .bm-item {
    display: inline-block;
    text-decoration: uppercase;
    margin-bottom: 10px;
    color: black;
    transition: color 0.2s;
    text-transform: uppercase;
    &:hover {
    color: ${props => props.theme.colors.link} !important;
  }
  }
  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
    &:hover {
    color: ${props => props.theme.colors.link} !important;
  }
  }
   /* Color/shape of close button cross */
  .bm-cross {
    background: black;
   }
  /* Wrapper for item list */
  .bm-item-list {
    color: black;
    display:flex;
    flex-direction:column;
  }
`;

const Logo = styled(MainLogo)`
  justify-self: left;
  align-self: center;
  display: ${props => (props.hidden ? 'none' : 'block')};
  width: ${props => (props.headerscrolled === 'true' ? '75px;' : '140px')};
  ${props =>
    props.headerscrolled === 'true'
      ? 'transition: 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);'
      : ''}
`;

const StyledHeader = styled.div`
  background-color: ${props =>
    props.headerscrolled === 'true' ? 'black;' : 'transparent !important;'};
  align-items: center;
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  text-transform: uppercase;
  color: white;
  padding: 0 1rem 0 1.5rem;
`;

const StyledHeaderDropdown = styled(StyledHeader)`
  background-color: white !important;
  color: black;

  ${''}
  padding: 8px;
  top: 22px !important;
`;

const StyledHeaderLink = styled(Link)`
  color: white;
`;

// Styling sublinks of dropdowns
const StyledLink = styled(Link)`
  text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  text-transform: uppercase;
  color: black;
  text-shadow: none;
  font-size: 0.875rem;
  &:hover {
    color: ${props => props.theme.colors.link} !important;
  }
`;
const StyledSidebar = styled(Menu)`
  background-color: white;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
`;

const StyledSidebarSublink = styled(Link)`
  font-size: 0.9em;
  margin-left: 15px;
`;

const StyledSidebarLogo = styled(MainLogo)`
  align-self: center;
  padding-bottom: 10px;
`;

const StyledBurger = styled.div`
  color: white;
  ${''}
  transition: 0.3s;
  align-self: center;
  align-items: center;
  ${props => (props.hidden ? 'display:none;' : 'display:flex;')}
  &:hover {
    background-color: transparent;
  }
  ${''}
  @media screen and (min-width: 1088px) {
    display: none;
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      hasScrolled: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    // If the hamburger menu is open, disable scrolling on the site
    if (prevState.menuOpen !== this.state.menuOpen) {
      if (this.state.menuOpen) {
        // overflow:hidden disables the scrolling on a desktop browser
        // position: fixed is additionally needed for mobile devices
        document.body.setAttribute('style', 'overflow: hidden;');
      } else {
        document.body.setAttribute('style', 'overflow: visible;');
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let lastKnownScrollPosition = 0;
    let ticking = false;
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastKnownScrollPosition > 50) {
          this.setState({ hasScrolled: true });
        } else {
          this.setState({ hasScrolled: false });
        }
        ticking = false;
      });
    }
    ticking = true;
  };

  // handleScroll = () => {
  //   const scrollTop = window.pageYOffset;
  //   // PreventSetState boolean prevents trying to set navbars state when its not yet mounted
  //   if (scrollTop > 50) {
  //     this.setState({ hasScrolled: true });
  //   } else {
  //     this.setState({ hasScrolled: false });
  //   }
  // };

  handleSidebarState(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  toggleMenu() {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    return (
      <div id="layout_base">
        <GlobalStyleSidebar whiteColor />
        <StyledSidebar
          customBurgerIcon={false}
          right
          pageWrapId="wrap"
          outerContainerId="root_div"
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleSidebarState(state)}
        >
          <StyledSidebarLogo height="120" width="120" />
          <Link className="menu-item" to="/">
            Home
          </Link>
          <Link className="menu-item" to="/galleries">
            Galleries
          </Link>
          <Link className="menu-item" to="/">
            Event Catering
          </Link>
          <StyledSidebarSublink to="/cateringCorporate">
            Corporate
          </StyledSidebarSublink>
          <StyledSidebarSublink to="/parties">
            Parties / Small Events
          </StyledSidebarSublink>
          <Link className="menu-item" to="/orderOnline">
            Order Online
          </Link>
          <Link className="menu-item" to="/faq">
            F.A.Q
          </Link>
          <Link className="menu-item" to="/contact">
            Contact Us
          </Link>
        </StyledSidebar>
        <div id="wrap">
          <div className="hero-head">
            <StyledHeader
              id="page-wrap"
              className="navbar is-transparent is-fixed-top"
              headerscrolled={this.state.hasScrolled.toString()}
            >
              <div className="navbar-brand">
                <Link className="navbar-item homeLogo" to="/">
                  {this.state.menuOpen ? (
                    <Logo
                      hidden
                      headerscrolled={this.state.hasScrolled.toString()}
                    />
                  ) : (
                    <Logo headerscrolled={this.state.hasScrolled.toString()} />
                  )}
                </Link>
                {this.state.menuOpen ? (
                  <StyledBurger
                    className="navbar-burger burger"
                    hidden
                    data-target="navbar"
                    onClick={() => this.toggleMenu()}
                  >
                    <i className="fas fa-bars" />
                  </StyledBurger>
                ) : (
                  <StyledBurger
                    className="navbar-burger burger"
                    data-target="navbar"
                    onClick={() => this.toggleMenu()}
                  >
                    <i className="fas fa-bars" />
                  </StyledBurger>
                )}
              </div>

              <div id="navbar" className="navbar-menu">
                <StyledHeader className="navbar-end">
                  <StyledHeaderLink className="navbar-item" to="/">
                    Home
                  </StyledHeaderLink>
                  <StyledHeaderLink className="navbar-item" to="/galleries">
                    Galleries
                  </StyledHeaderLink>
                  <StyledHeader className="navbar-item has-dropdown is-hoverable">
                    <StyledHeader className="navbar-link">
                      Event Catering
                    </StyledHeader>
                    <StyledHeaderDropdown className="navbar-dropdown is-boxed">
                      <StyledLink
                        className="navbar-item"
                        to="/cateringCorporate"
                      >
                        Corporate Events
                      </StyledLink>
                      <StyledLink className="navbar-item" to="/cateringParties">
                        Parties / Small Events
                      </StyledLink>
                    </StyledHeaderDropdown>
                  </StyledHeader>
                  <StyledHeaderLink className="navbar-item" to="/orderOnline">
                    Order Online
                  </StyledHeaderLink>
                  <StyledHeaderLink className="navbar-item" to="/faq">
                    F.A.Q
                  </StyledHeaderLink>
                  <StyledHeaderLink className="navbar-item" to="/contact">
                    Contact Us
                  </StyledHeaderLink>
                </StyledHeader>
              </div>
            </StyledHeader>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
