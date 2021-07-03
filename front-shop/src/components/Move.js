import React from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'react-bootstrap'
const Move = () => {
    return (
        <div>
            <br/>
            <hr/>
            <br/>
            <Container>
            <ul>
                <li><Link to="/" style={{textDecoration:'none', color:'inherit'}}>Home</Link></li>
                <li><Link to="/login" style={{textDecoration:'none', color:'inherit'}}>Login</Link></li>
                <li><Link to="/logout"style={{textDecoration:'none', color:'inherit'}}>Logout</Link></li>
                <li><Link to="/register"style={{textDecoration:'none', color:'inherit'}}>Register</Link></li>
                <li><Link to="/product/register"style={{textDecoration:'none', color:'inherit'}}>ProductRegister</Link></li>
                <li><Link to="/category/1"style={{textDecoration:'none', color:'inherit'}}>ProductByCategory</Link></li>
                <li><Link to="/orderlist"style={{textDecoration:'none', color:'inherit'}}>OrderList</Link></li>
                
            </ul>
            </Container>
           
        </div>
    );
};

export default Move;