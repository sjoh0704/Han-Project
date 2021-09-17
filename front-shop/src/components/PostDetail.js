import {loginAction} from '../modules/user'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Container, Button, Row, Col, Table, ListGroup} from 'react-bootstrap'
import { CategoryDirection } from './CategoryBanner'
import BasicPagination from './BasicPagination'
import '../App.css'
import Modal from './Modal'

export default function PostDetail({history, match}){
    let pageNumber = match.params.number;
    const [ modalOpen, setModalOpen ] = useState(false);
    
    const closeModal = () => {
        setModalOpen(false);
    }
    const [ modalContents, setModalContents ] = useState('');
    
    const [user, setUser] = useState(undefined);
    const [post, setPost] = useState(undefined);
    // const {username, password} = userData;

    const fetchPost = async()=>{
        await axios.get(`/apis/v1/post/${pageNumber}/hit`);
        let res = await axios.get(`/apis/v1/post/${pageNumber}`);
        let data = res.data.payload;
        let user = await axios.get(`/apis/v1/user/${data.user_id}`);
        setPost(displayPostData(data));
        
        
    }

    const displayPostData = (data) =>{
        if(!data){
            return(<div>
                waiting
            </div>);
        }
        const {id, user_id, title, description, hit, area, createdAt, updatedAt} = data;
        return(<div>
            <ListGroup>
            <ListGroup.Item>{title}</ListGroup.Item>
            <ListGroup.Item>{description}</ListGroup.Item>
            <ListGroup.Item>{area}</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>


        </div>)
    }


    useEffect(()=>{
        fetchPost();

    },[pageNumber])

    return (
   
    
     
        <Container >
            <Modal open={ modalOpen } close={ closeModal }>
                {modalContents}
            </Modal>
            <CategoryDirection tag1={'자유 거래 게시판'} tag2={"dddd"}></CategoryDirection>
            <br/>
            {post}
          
            <Container >
            </Container>
            


        </Container>
      
    );
}
