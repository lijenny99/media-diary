import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, BookOutlined, PlaySquareOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';

const Navigation = (props) => {
    const location = useLocation();

    return (
        <div>
            <Menu mode="horizontal" className="Menu" selectedKeys={[location.pathname]}>
                <Menu.Item key="/" icon={<HomeOutlined />}>
                    <NavLink to="/">Home</NavLink></Menu.Item>
                {props.isAuthenticated ? [
                    <Menu.Item key="/book" icon={<BookOutlined />}>
                        <NavLink to="/books">Books</NavLink></Menu.Item>,
                    <Menu.Item key="/movie" icon={<PlaySquareOutlined />}>
                        <NavLink to="/movies">Movies</NavLink></Menu.Item>,
                    <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                        <NavLink to="/logout">Logout</NavLink></Menu.Item>
                ] : [
                        <Menu.Item key="/login" icon={<LoginOutlined />}>
                            <NavLink to="/login">Login</NavLink></Menu.Item>
                    ]}
            </Menu>
        </div>
    )
}

export default Navigation;