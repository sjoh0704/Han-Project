import { loginAction } from "../modules/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Container, Button, Row, Col, Table } from "react-bootstrap";
import { CategoryDirection } from "./CategoryBanner";
import BasicPagination from "./BasicPagination";
import "../App.css";
import Modal from "./Modal";
import { setDate } from "./Convenient";

export default function MainPost({ history, match }) {
    let pageNumber = match.params.number;
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };
    const [modalContents, setModalContents] = useState("");

    const [posts, setPosts] = useState([]);
    // const {username, password} = userData;

    const fetchPost = async () => {
        let res = await axios.get(`/apis/v1/post/page/${pageNumber}`);
        displayPostList(res.data.payload);
    };

    const displayPostList = (payload) => {
        if (!payload.length) {
            alert("게시글이 없습니다");

            setPosts(<div style={{ fontSize: "1.3rem", padding: 3, paddingLeft:10 }}>게시글이 없습니다.</div>);
            return;
        }

        let post_list = payload.map((item) => {
            const { id, hit, title, createdAt } = item;

            return (
                <div
                    style={{ fontSize: "1.3rem", padding: 3 }}
                    onClick={() => {
                        history.push(`/post/detail/${id}`);
                    }}
                >
                    <Row>
                        <Col lg={{ span: 1, offset: 0 }}>
                            <div>{id}</div>
                        </Col>
                        <Col lg={{ span: 8, offset: 0 }}>
                            <div align="center">{title}</div>
                        </Col>
                        <Col lg={{ span: 1 }}>
                            <div>{hit}</div>
                        </Col>
                        <Col lg={{ span: 2, offset: 0 }}>
                            <div>{setDate(createdAt)}</div>
                        </Col>
                    </Row>
                </div>
            );
        });

        setPosts(post_list);
    };

    useEffect(() => {
        fetchPost();
    }, [pageNumber]);

    return (
        <div>
            {/* <div className="primaryBackground"> */}
            <div style={{ background: "#dedede" }}>
                <Container>
                    <Row>
                        <Col lg={{ span: 3, offset: 7 }}>
                            <div
                                style={{ height: "2rem", fontSize: "1.2rem", margin: 3, color: "#44444" }}
                                onClick={() => {
                                    history.push("/post/register");
                                }}
                            >
                                게시글 등록하기
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Modal open={modalOpen} close={closeModal}>
                    {modalContents}
                </Modal>

                <CategoryDirection tag1={"자유 거래 게시판"}></CategoryDirection>
                <br />

                <Container>
                    <Row>
                        <Col lg={{ span: "9", offset: "1" }}>
                            <div style={{ border: "1px solid #dedede" }}>
                                <div style={{ background: "#444444", color: "white", fontSize: "1.3rem", padding: 4 }}>
                                    <Row>
                                        <Col lg={{ span: 1 }}>
                                            <div>No</div>
                                        </Col>
                                        <Col lg={{ span: 8 }}>
                                            <div align="center">Subject</div>
                                        </Col>
                                        <Col lg={{ span: 1 }}>
                                            <div>Read</div>
                                        </Col>
                                        <Col lg={{ span: 2 }}>
                                            <div>Date</div>
                                        </Col>
                                    </Row>
                                </div>

                                {posts}
                            </div>
                        </Col>
                    </Row>

                    <br />
                    <br />

                    <Row>
                        <Col lg={{ span: "6", offset: "4" }} md={{ span: "6", offset: "5" }} sm={{ span: "6", offset: "4" }} xs={{ span: "8", offset: "3" }}>
                            <BasicPagination history={history} path="/post/page" />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
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
