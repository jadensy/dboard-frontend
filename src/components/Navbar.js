import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Icon, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

const styles = theme => ({
    appBar: {
        backgroundColor: `${theme.palette.primary.main}`,
        position: "sticky",
        top: 0,
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
            // dialog: false,
            loggedIn: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem('JWT')) {
            this.setState({ loggedIn: true })
        }
    }

    // toggleDialog = () => {
    //     this.setState(prevState => ({
    //         dialog: !prevState.dialog
    //     }))
    // }

    handleLoggedIn = () => {
        this.setState({ loggedIn: true})
    }

    handleLogout = () => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('User');
        this.setState({ loggedIn: false });
    }

    render() {

        const { classes } = this.props;

        return(
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Icon>show_chart</Icon>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            <Link to="/" style={{color: '#ffffff', textDecoration: 'none'}}>Dashboard</Link>
                            </Typography>
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

export default withStyles(styles)(Navbar);