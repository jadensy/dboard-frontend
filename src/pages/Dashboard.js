import React from 'react';
import axios from 'axios';
import { Typography, Grid, Paper, Button, Icon } from '@material-ui/core';
// import LineChartNew from '../components/LineChart'

class Dashboard extends React.Component {

    state = {
        responseData: {},
        baseCurrency: '',
        indexCurrency: 0,
        currencies: [],
        currencyTotals: [],
        exchanged: 0,
    }

    componentDidMount() {
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'GET',
            url: 'https://quiet-anchorage-67868.herokuapp.com/api/v1/dashboard/',
            'headers': {
                Authorization: `Bearer ${jwt}`
            }
        }).then(response => {
            this.setState({
                responseData: response.data,
                currencies: Object.keys(response.data.currency_revenue),
                currencyTotals: Object.values(response.data.currency_revenue),
                baseCurrency: Object.keys(response.data.currency_revenue)[0],
            }
            , function () {
                axios({
                    method: 'GET',
                    url: `https://api.exchangeratesapi.io/latest?base=${this.state.baseCurrency}`,
                }).then(response => {
                    let exch = [];
                    for (let i = 0; i < this.state.currencies.length; i++) {
                        let c = eval('response.data.rates.' + this.state.currencies[i]) // eval is bad. remove this.
                        exch.push(this.state.currencyTotals[i] / c)
                    }
                    const add = (a, b) =>
                        a + b
                    const sum = exch.reduce(add)
                    this.setState({
                        exchanged: sum
                    })
                    // console.log(sum)
                }).catch(error => {
                    console.log(error)
                })
            });
        }).catch(error => {
            console.log(error)
        })
    }

    indexIncrement = (e) => {
        e.preventDefault();
        this.setState({
            indexCurrency: this.state.indexCurrency + 1,
            baseCurrency: this.state.currencies[this.state.indexCurrency + 1] }, function () {
                axios({
                    method: 'GET',
                    url: `https://api.exchangeratesapi.io/latest?base=${this.state.baseCurrency}`,
                }).then(response => {
                    let exch = [];
                    for (let i=0; i < this.state.currencies.length; i++){
                        let c = eval('response.data.rates.' + this.state.currencies[i]) // eval is bad. remove this.
                        exch.push(this.state.currencyTotals[i]/c)
                    }
                    const add = (a, b) =>
                        a + b
                    const sum = exch.reduce(add)
                    this.setState({
                        exchanged: sum
                    })
                    // console.log(sum)
                }).catch(error => {
                    console.log(error)
                })
        });
    }

    indexDecrement = (e) => {
        e.preventDefault();
        this.setState({
            indexCurrency: this.state.indexCurrency - 1,
            baseCurrency: this.state.currencies[this.state.indexCurrency - 1]
        }, function () {
            axios({
                method: 'GET',
                url: `https://api.exchangeratesapi.io/latest?base=${this.state.baseCurrency}`,
            }).then(response => {
                let exch = [];
                for (let i = 0; i < this.state.currencies.length; i++) {
                    let c = eval('response.data.rates.' + this.state.currencies[i])
                    exch.push(this.state.currencyTotals[i] / c)
                }
                const add = (a, b) =>
                    a + b
                const sum = exch.reduce(add)
                this.setState({
                    exchanged: sum
                })
                // console.log(sum)
            }).catch(error => {
                console.log(error)
            })
        });
    }

    render() {
        const { currencies } = this.state
        let cLen = currencies.length

        const enableInc = this.state.indexCurrency === cLen-1
        const enableDec = this.state.indexCurrency === 0

        return(
            <div>
            <Paper style={{ padding: 15 }}>
                    <Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Paper style={{ padding: 15, textAlign: 'right', verticalAlign: 'bottom' }}>
                                <Typography variant="h3" style={{ padding: 10 }}>{this.state.responseData.project_count}</Typography>
                                <Typography variant="h6" style={{ padding: 10 }}>PROJECTS</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{ padding: 15, textAlign: 'right' }}>
                                <Typography variant="h3" style={{ padding: 10 }}>{this.state.responseData.client_count}</Typography>
                                <Typography variant="h6" style={{ padding: 10 }}>CLIENTS</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper style={{ padding: 15, textAlign: 'right' }}>
                                <Typography variant="h3" style={{ padding: 10 }}>{this.state.responseData.countries}</Typography>
                                <Typography variant="h6" style={{ padding: 10 }}>COUNTRIES</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper style={{ padding: 15, textAlign: 'right' }}>
                                <Typography variant="h3" style={{ padding: 10 }}>
                                    {this.state.baseCurrency} {parseFloat(this.state.exchanged).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </Typography>
                                <Grid container>
                                    <Grid item xs={4} style={{textAlign: 'left'}}>
                                        <Button color="secondary" onClick={this.indexDecrement} disabled={enableDec}>
                                            <Icon>chevron_left</Icon>
                                        </Button>
                                        <Button color="secondary" onClick={this.indexIncrement} disabled={enableInc}>
                                            <Icon>chevron_right</Icon>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" style={{ padding: 10 }}>TOTAL REVENUE</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Paper style={{ padding: 15 }}><LineChartNew /></Paper>
                        </Grid> */}

                    </Grid>

            </Paper>
            </div>
        )
    }
}

export default Dashboard;

