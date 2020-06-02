import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, BookOutlined, PlaySquareOutlined, LoginOutlined } from '@ant-design/icons';

const Navigation = (props) => {

    return (
        <div>
            <Menu mode="horizontal" className="Menu">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link></Menu.Item>
                {props.isAuthenticated ? [
                    <Menu.Item key="book" icon={<BookOutlined />}>
                        <Link to="/books">Books</Link></Menu.Item>,
                    <Menu.Item key="movie" icon={<PlaySquareOutlined />}>
                        <Link to="/movies">Movies</Link></Menu.Item>
                ] : null}
                <Menu.Item key="login" icon={<LoginOutlined />}>
                    <Link to="/login">Login</Link></Menu.Item>
            </Menu>
        </div>
    )
}

export default Navigation;