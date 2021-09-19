import {loginAction} from '../modules/user'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Container, Button, Row, Col, Table, ListGroup} from 'react-bootstrap'
import { CategoryDirection } from './CategoryBanner'
import BasicPagination from './BasicPagination'
import '../App.css'
import Modal from './Modal'
import Rating from './Rating'

export default function PostDetail({history, match}){
    let pageNumber = match.params.number;
    const [ modalOpen, setModalOpen ] = useState(false);
    
    const closeModal = () => {
        setModalOpen(false);
    }
    const [ modalContents, setModalContents ] = useState('');
    const [user, setUser] = useState({username:"", temperature:"", celcius:""});
    const [post, setPost] = useState({title: "", description:"", area:"", hit:0, createdAt:"", Images:[]});

    // const {username, password} = userData;

    const fetchPost = async()=>{
        await axios.get(`/apis/v1/post/${pageNumber}/hit`);
        let res = await axios.get(`/apis/v1/post/${pageNumber}`);
        let user_res = await axios.get(`/apis/v1/user/${res.data.payload.user_id}`);
        setUser(user_res.data.payload);
        setPost(res.data.payload);
    }

    const fetchComments = async()=>{
        await axios.get()

    }


    useEffect(()=>{
        fetchPost();

    },[match.params.number, post])

    return (
   
    
     
        <Container >
            <Modal open={ modalOpen } close={ closeModal }>
                {modalContents}
            </Modal>
            <CategoryDirection tag1={'자유 거래 게시판'} tag2={"dddd"}></CategoryDirection>
            <br/>
            <div>
            <Row>
                <Col lg={{span:'10', offset:'1'}}>
                    <ListGroup>
                        <ListGroup.Item>{post.title}</ListGroup.Item>

                        <ListGroup.Item  style={{}}>
                        <Rating user={user} area={post.area}/>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>{post.description}</ListGroup.Item>
                        <ListGroup.Item>{post.area}</ListGroup.Item>
                        <ListGroup.Item>
                        <img style={{width: '50%',
                                height: 'auto'}} 
                            src={post.Images.length ? post.Images[0].image_url: ""}></img></ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
    
                </Col>
            </Row>
            

        </div>
   
        </Container>
      
    );
}
