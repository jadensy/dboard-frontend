import React from 'react';
import axios from 'axios';


export default class Profile extends React.Component {
    componentDidMount(){
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'get',
            url: '127.0.0.1:5000/api/v1/users/me',
            'headers': {
                Authorization: `Bearer ${jwt}`
            }
        }).then(results => {
            console.log(results)
        })
    }

    render() {
        return(
            <div>
                hello?
            </div>
        )
    }
}