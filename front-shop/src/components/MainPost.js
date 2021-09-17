import {loginAction} from '../modules/user'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form, Container, Button, Row, Col, Table} from 'react-bootstrap'
import { CategoryDirection } from './CategoryBanner'
import BasicPagination from './BasicPagination'
import '../App.css'
import Modal from './Modal'

export default function MainPost({history, match}){
    let pageNumber = match.params.number;
    const [ modalOpen, setModalOpen ] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    }
    const [ modalContents, setModalContents ] = useState('');
    

    const [posts, setPosts] = useState([]);
    // const {username, password} = userData;

    const fetchPost = async()=>{
        let res = await axios.get(`/apis/v1/post/page/${pageNumber}`);
        displayPostList(res.data.payload)

        
    }

    const displayPostList = (payload) =>{
        if(!payload.length){
            alert("게시글이 없습니다")
            console.log("123213")
            setPosts(<div>
                게시글이 없습니다.
            </div>);
            return;
        }
        
        let post_list = payload.map(item => {
            
            const {id, hit, title, createdAt} = item;
                
                return (
                
                    <tr onClick ={()=>{
                        history.push(`/post/detail/${id}`)
                    }}>
                    <td>{id}</td>
                    <td> {title}</td>
                
                    <td>{hit}</td>
                    <td>{createdAt}</td>
                    </tr>
                    
                )
                
            });
            
            setPosts(post_list);
    }


    useEffect(()=>{
        fetchPost();

    },[pageNumber])


    return (
   
    
     
        <Container >
            <Modal open={ modalOpen } close={ closeModal }>
                {modalContents}
            </Modal>
            <CategoryDirection tag1={'자유 거래 게시판'}></CategoryDirection>
            <br/>
          
            <Container >
                <Row>
                    <Col lg={{span:"9", offset:"1"}}>
                    <Table bordered hover size="md">
            <thead>
                <tr>
                <th>No</th>
                <th>Subject</th>
              
                <th>Read</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
            {posts}
            </tbody>

            </Table>

                    </Col>
                </Row>
            <br/>
            <Row>
                <Col lg={{span:"6", offset:"5"}}
                md={{span:"6", offset:"5"}}
                sm={{span:"6", offset:"4"}}
                xs={{span:"8", offset:"3"}}>
                <BasicPagination history={history} path="/post/page"/>    
                </Col>
            </Row>
            </Container>
            


        </Container>
      
    );
    

    // return (<div style ={{
    //     display : 'flex', justifyContent : 'center', alignItems: 'center',
    //     width : '100%', height : '100vh'
    // }}>
    //     <form style ={{display : 'flex', flexDirection:'column'}}
    //         onSubmit={onClickHandler}>
    //         <label>username</label>
    //         <input name = "username" value = {username} onChange={onChangeHandler}/>
    //         <label>Password</label>
    //         <input name = "password" value = {password} onChange={onChangeHandler}/>
    //         <br/>
    //         <button type = 'submit'>
    //             Login
    //         </button>
    //     </form>
    // </div>);
}
