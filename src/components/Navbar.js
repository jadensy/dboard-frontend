import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Icon, Button } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Signup from './Signup';
import Login from './Login';

const styles = (theme) => ({
    appBar: {
        backgroundColor: `${theme.palette.primary.main}`,
        position: "sticky",
        top: 0,
        height: '7vh'
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        color: '#ffffff',
    }
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem('JWT')) {
            this.setState({ loggedIn: true })
        }
    }

    handleLoggedIn = () => {
        this.setState({ loggedIn: true})
        this.props.history.push("/dashboard")
    }

    handleLogout = () => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('User');
        this.setState({ loggedIn: false });
        this.props.history.push("/")
    }

    render() {

        const { classes } = this.props;

        return(
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Icon>show_chart</Icon>
                        {!this.state.loggedIn ?
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Dashboard
                            </Typography> :
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                <Link to="/dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>Dashboard</Link>
                            </Typography>
                        }

                        {!this.state.loggedIn ?
                        <>
                            <Login handleLoggedIn={this.handleLoggedIn} />
                            <Signup handleLoggedIn={this.handleLoggedIn} />
                        </> :
                        <>
                        <Button href="/clients" className={classes.button} >Clients</Button>
                        <Button href="/projects" className={classes.button} >Projects</Button>
                        <Button href="/profile" className={classes.button} >Profile</Button>
                        <Button onClick={this.handleLogout} className={classes.button} >Log Out</Button>
                        </> }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default compose(
    withRouter,
    withStyles(styles))(Navbar);
    // wrap navbar with MaterialUI styles + ReactRouter to access props from both.