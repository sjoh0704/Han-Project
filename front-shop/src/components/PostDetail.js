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
    const {isLoggedIn, userData} = useSelector(state =>({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload
    }));

    let postId = match.params.number;
    const [ modalOpen, setModalOpen ] = useState(false);
    
    const closeModal = () => {
        setModalOpen(false);
    }

    const [modalContents, setModalContents] = useState('');
    const [user, setUser] = useState({username:"", temperature:"", celcius:""});
    const [post, setPost] = useState({title: "", description:"", area:"", hit:0, createdAt:"", Images:[]});
    const [comments, setComments] = useState([]);
    const [contents, setContents] = useState("");

    const fetchPost = async()=>{
        await axios.get(`/apis/v1/post/${postId}/hit`);
        let res = await axios.get(`/apis/v1/post/${postId}`);
        let user_res = await axios.get(`/apis/v1/user/${res.data.payload.user_id}`);
        setUser(user_res.data.payload);
        setPost(res.data.payload);
    }


    const onChangeHandler = (e)=>{
        const {value} = e.target;
        setContents(value);
    };

    const onClickHandler = async(e) =>{
        if(!isLoggedIn || !userData){
            e.preventDefault();
            alert("로그인 후 이용해주세요");
            return;
        }
        if(contents === ""){
            e.preventDefault();
            alert("최소 한 글자를 입력해 주세요");    
            return;
        }

        let body = {
            user_id: userData.user_id,
            content: contents
        }; 
        await axios.post(`/apis/v1/post/${postId}/comment`, body);
    };

    const fetchComments = async()=>{
        let res = await axios.get(`/apis/v1/post/${postId}/comment`);
        let tmp_comment = res.data.payload;
        
        let userComments = [];
        tmp_comment.forEach(async(e) => {
            let res_user= await axios.get(`/apis/v1/user/${e.user_id}`);
            let user = res_user.data.payload;
            userComments.push(
            <div style={{margin: 10, border:"1px solid #dedede", padding:10}}>
            <Row >
                <Col>{user.username}
                </Col>
                <Col>{e.content}
                </Col>
            </Row>
        
            </div >
           );

        });
        setComments(userComments);
        
        
        
    };


    useEffect(()=>{
        fetchPost();
        fetchComments();
    },[postId]);

    return (
   
    
     
        <Container >
            <Modal open={ modalOpen } close={ closeModal }>
                {modalContents}
            </Modal>
            <CategoryDirection tag1={'자유 거래 게시판'} tag2={post.title}></CategoryDirection>
            <br/>
            <div>
            <Row>
                <Col lg={{span:'10', offset:'1'}}>
                    <ListGroup>
                        <ListGroup.Item className='primaryColor'>{post.title}</ListGroup.Item>
                        
                        <ListGroup.Item  style={{}}>
                        <Rating user={user} area={post.area}/>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>{post.description}</ListGroup.Item>
                        <ListGroup.Item>{post.area}</ListGroup.Item>
                        <ListGroup.Item>
                        <img style={{width: '50%',
                                height: 'auto'}} 
                            src={post.Images.length ? post.Images[0].image_url: ""}></img></ListGroup.Item>
                        <ListGroup.Item>
                        {comments.length ? comments: <div>
                            댓글이 없습니다
                            </div>}
                        </ListGroup.Item>
                        <ListGroup.Item>

                            <div style={{margin: 10, border:"1px solid #dedede"}}>
                                <Form>
                                <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                    <Col lg={{ span: 4, offset: 0 }}
                                        sm={{ span: 8, offset: 0 }}>
                                    <Form.Control 
                                    size='lg'
                                    name = 'contents'
                                    value = {contents}
                                    onChange={onChangeHandler}
                                    placeholder="로그인 후 사용해 주세요" />
                                    </Col>
                                    <Col sm={{ span: 2, offset: 2 }} 
                                    lg={{ span: 1, offset: 3 }}>
                                     <button 
                                        onClick={onClickHandler}
                                        style={{height:40}}
                                        // type="submit"
                                        className='filledButton'
                                        >댓글 입력</button>
                                    
                                    </Col>
                                    
                                </Form.Group>

                                </Form>
                            </div>
                </ListGroup.Item>
                        
                        </ListGroup>
    
                </Col>
            </Row>
            

        </div>
   
        </Container>
      
    );
}
