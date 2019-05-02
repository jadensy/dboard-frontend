import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Icon } from '@material-ui/core';
import Signup from './Signup';

const styles = theme => ({
    appBar: {
        backgroundColor: `${theme.palette.primary.main}`,
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
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <Icon>show_chart</Icon>Dashboard
                    </Typography>
                    <Button color="inherit" onClick={this.toggleDialog}>Login</Button>
                    <Signup />
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Navbar);