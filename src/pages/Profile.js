import React from 'react';
import axios from 'axios';


export default class Profile extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
    }

    componentDidMount(){
        const jwt = localStorage.getItem('JWT');

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/api/v1/users/me',
            'headers': {
                Authorization: `Bearer ${jwt}`
            }
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return(
            <div>
                User Profile
            </div>
        )
    }
}