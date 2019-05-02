import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Icon } from '@material-ui/core';
import Signup from './Signup';
import Login from './Login';

const styles = theme => ({
    appBar: {
        backgroundColor: `${theme.palette.primary.main}`,
        position: "static"
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            loggedIn: false,
        }
    }

    componentDidMount() {
        if (localStorage.getItem('JWT')) {
            this.setState({ loggedIn: true })
        }
    }

    toggleDialog = () => {
        this.setState(prevState => ({
            dialog: !prevState.dialog
        }))
    }

    render() {

        const { classes } = this.props;

        return(
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            <Icon>show_chart</Icon>Dashboard
                        </Typography>
                        {!this.state.loggedIn ?
                        <>
                            <Login />
                            <Signup />
                        </>
                        : <p> Log Out</p> }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Navbar);