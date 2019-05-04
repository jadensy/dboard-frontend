import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = theme => ({
    splash: {
        width: '100vw',
        height: '93vh',
        backgroundImage: `url(${'https://images.unsplash.com/photo-1549215461-3022dea322d7'})`,
        backgroundSize: 'cover',
    },
    card: {
        width: 200,
        padding: '3px 10px 3px 15px',
        float: 'right',
        marginTop: 15,
        marginRight: 15,
        opacity: 0.75,

    },
    cardText: {
        color: `${theme.palette.secondary.dark}`,
        fontSize: 14,
    }
});

class Splash extends React.Component {

    state = {
        loggedIn: false,
    }

    componentDidMount() {
        if (localStorage.getItem('JWT')) {
            this.setState({
                loggedIn: true
            })
            this.props.history.push("/dashboard")
        }

    }

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.splash}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h6">Hello!</Typography>
                        <Typography variant="subtitle" className={classes.cardText}>Please sign up or log in <br />to access the dashboard.</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Splash);