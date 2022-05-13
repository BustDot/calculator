import Base from './base';
import $ from 'jquery';
import React, { Component } from 'react';

class Register extends Component {
    state = {
        error_message: "",
        username: "",
        password: "",
        password_confirm: "",
    };

    handleClick = e => {
        e.preventDefault();

        if (this.state.username === "") {
            this.setState({error_message: "用户名不能为空"});
        } else if (this.state.password === "") {
            this.setState({error_message: "密码不能为空"});
        } else if (this.state.password_confirm === "") {
            this.setState({error_message: "确认密码不能为空"});
        } else if (this.state.password !== this.state.password_confirm) {
            this.setState({error_message: "两次输入密码不一致"});
        } else {
            $.ajax({
               url: "https://app114.acapp.acwing.com.cn/calc/register/",
               type: "get",
               data: {
                   username: this.state.username,
                   password: this.state.password,
                   password_confirm: this.state.password_confirm,
               },
               dataType: "json",
               success: resp => {
                   if (resp.result === "success") {
                       window.location.href="/calc";
                   } else {
                       this.setState({error_message: resp.result});
                   }

               }
            });
        }
    }

    render() { 
        return (
            <Base>
                <div className="row justify-content-md-center">
                    <div className="col col-sm-3">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">用户名</label>
                                <input onChange={e => {this.setState({username: e.target.value})}} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">密码</label>
                                <input type="password"  onChange={e => {this.setState({password: e.target.value})}} className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password_confirm" className="form-label">确认密码</label>
                                <input type="password"  onChange={e => {this.setState({password_confirm: e.target.value})}} className="form-control" id="password_confirm" />
                            </div>
                            <div style={{height: "2rem", color:"red"}}>
                                {this.state.error_message}
                            </div>
                            <button onClick={this.handleClick} style={{width: "100%"}} type="submit" className="btn btn-primary">登录</button>
                        </form>
                    </div>
                </div>
            </Base>
        );
    }
}
 
export default Register;