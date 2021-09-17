import './App.css';
import './assets/css/color.css'
import './assets/css/dropdown.css'
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register'
import Home from './components/Home';
import Move from './components/Move';
import ProductRegister from './components/ProductRegister';
import { Route, Switch} from 'react-router-dom';
import ProductByCategory from './components/ProductByCategory'
import UserBanner from './components/UserBanner'
import Banner from './components/Banner'
import CategoryBanner, { PlusMiniBanner } from './components/CategoryBanner';
import ProductDetail from './components/ProductDetail'
import OrderList from './components/OrderList';
import PurchasePage from './components/PurchasePage';
import Profile from './components/Profile';
import MySales from './components/MySales'
import PurchaseList from './components/PurchaseList';
import MySalesDetail from './components/MySalesDetail';
import Likes from './components/LikeList';
import React from 'react';
import NotFound from './components/NotFound';
import MainPost from './components/MainPost';
import PostDetail from './components/PostDetail';
import PostRegister from './components/PostRegister';
// import UploadS3 from './components/UploadS3';

function App() {
  return (
    <React.Fragment>
    {/* <UploadS3></UploadS3> */}
    <UserBanner/>
    <div style={{fontFamily:'twayair'}}>
    <Banner/>

    <CategoryBanner/>
    <PlusMiniBanner/>
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/product/register" component={ProductRegister}/>
    <Route exact path="/logout" component={Logout}/>
    <Route exact path="/category/:number" component={ProductByCategory}/>
    <Route exact path="/product/:number" component={ProductDetail}/>
    <Route exact path="/orderlist" component={OrderList}/>
    <Route exact path="/purchaselist" component={PurchaseList}/>
    <Route exact path="/purchase" component={PurchasePage}/>
    <Route exact path="/profile" component={Profile}/>
    <Route exact path="/mysales" component={MySales}/>
    <Route exact path="/mysales/:number" component={MySalesDetail}/>
    <Route exact path="/likes" component={Likes}/>
    <Route exact path="/post/page/:number" component={MainPost}/>
    <Route exact path="/post/detail/:number" component={PostDetail}/>
    <Route exact path="/post/register" component={PostRegister}/>
    <Route path="*" component={NotFound}/>
    
    
    </Switch>
   
    
    <Move/>
    </div>

    </React.Fragment>
    
  );
}

export default App;
