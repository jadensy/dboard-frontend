import React from 'react';
import axios from 'axios';
import { Typography, Grid, Paper } from '@material-ui/core';

class Dashboard extends React.Component {
    render() {
        return(
            <div>
            <Paper style={{ padding: 15 }}>
                <Typography variant="h6">Dashboard</Typography>
            </Paper>
            </div>
        )
    }
}

export default Dashboard;