import React, { Component } from 'react';
import NavBar from './navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './content/home';
import Calc from './content/calc';
import Login from './content/login';
import Register from './content/register';
import NotFound from './content/notfound';
import $ from 'jquery';

class App extends Component {
    state = {
        is_login: false,
        username: "",
    };

    componentDidMount() {
        $.ajax({
            url: "https://app114.acapp.acwing.com.cn/calc/get_status/",
            type: "get",
            success: resp => {
                console.log(resp);
                if(resp.result === "login") {
                    this.setState({
                        is_login: true,
                        username: resp.username,
                    })
                } else {
                    this.setState({
                        is_login: false,
                    })
                }
            }
        })
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar is_login={this.state.is_login} username={this.state.username} />
                <div className='container'>
                    <Routes>
                        <Route path='/calc' element={<Home />} />
                        <Route path='/calc/home' element={<Home />} />
                        <Route path='/calc/calc' element={this.state.is_login ? <Calc /> : <Navigate replace to="/calc/login" />} />
                        <Route path='/calc/login' element={this.state.is_login ? <Navigate replace to="/calc/home" /> : <Login />} />
                        <Route path='/calc/register' element={this.state.is_login ? <Navigate replace to="/calc/home" /> : <Register />} />
                        <Route path='/calc/404' element={<NotFound />} />
                        <Route path="/calc/*" element={ <Navigate replace to="/calc/404" /> } />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}
 
export default App;