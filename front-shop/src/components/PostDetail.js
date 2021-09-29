import { loginAction } from "../modules/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Container, Button, Row, Col, Table, ListGroup } from "react-bootstrap";
import { CategoryDirection } from "./CategoryBanner";
import BasicPagination from "./BasicPagination";
import "../App.css";
import Modal from "./Modal";
import Rating from "./Rating";
import { setDate } from "./Convenient";

export default function PostDetail({ history, match }) {
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    let postId = match.params.number;
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const [modalContents, setModalContents] = useState("");
    const [user, setUser] = useState({
        username: "",
        temperature: "",
        celcius: "",
    });
    const [post, setPost] = useState({
        title: "",
        description: "",
        area: "",
        hit: 0,
        createdAt: "",
        Images: [],
    });
    const [comments, setComments] = useState([]);
    const [contents, setContents] = useState("");

    const fetchPost = async () => {
        await axios.get(`/apis/v1/post/${postId}/hit`);
        let res = await axios.get(`/apis/v1/post/${postId}`);
        await axios
            .get(`/apis/v1/user/${res.data.payload.user_id}`)
            .then((res) => {
                setUser(res.data.payload);
            })
            .catch(() => {
                setUser({
                    ...user,
                    username: "탈퇴한 사용자"
                })
            });

        setPost(res.data.payload);
    };

    const onChangeHandler = (e) => {
        const { value } = e.target;
        setContents(value);
    };

    const onClickHandler = async (e) => {
        if (!isLoggedIn || !userData) {
            e.preventDefault();
            alert("로그인 후 이용해주세요");
            return;
        }
        if (contents === "") {
            e.preventDefault();
            alert("최소 한 글자를 입력해 주세요");
            return;
        }

        let body = {
            user_id: userData.user_id,
            content: contents,
        };
        await axios.post(`/apis/v1/post/${postId}/comment`, body);
    };

    const fetchComments = async () => {
        let res = await axios.get(`/apis/v1/post/${postId}/comment`);
        let tmp_comment = res.data.payload;

        let userComments = [];
        tmp_comment.forEach(async (e) => {
            let res_user = await axios.get(`/apis/v1/user/${e.user_id}`);
            let user = res_user.data.payload;
            userComments.push(
                <div style={{ margin: 10, border: "1px solid #dedede", padding: 10 }}>
                    <Row>
                        <Col lg={{ span: 2, offset: 0 }}>
                            <div style={{ fontSize: "1.3rem", fontWeight: "bold", margin: 3 }}>{user.username}</div>
                        </Col>
                        <Col lg={{ span: 9, offset: 0 }}>
                            <div style={{ fontSize: "1.3rem", margin: 3 }}>{e.content}</div>
                            <div style={{ fontSize: "1rem", margin: 3 }}>{setDate(e.createdAt)}</div>
                        </Col>
                    </Row>
                </div>
            );
        });
        setComments(userComments);
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [postId]);

    return (
        <div>
            <div style={{ background: "#dedede" }}>
                <Container>
                    <Row>
                        <Col xs={{ span: 5, offset: 7 }}>
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
                <CategoryDirection tag1={"자유 거래 게시판"} tag2={post.title}></CategoryDirection>
                <br />
                <div>
                    <Row>
                        <Col lg={{ span: "10", offset: "1" }}>
                            <div className="primaryBackground" style={{ fontSize: "1.8rem", padding: 5, border: "1px solid #dedede", color: "white" }}>
                                <Row>
                                    <Col sm={{ offset: 0 }}>
                                        <div style={{ margin: 3 }}>
                                            <span style={{ fontSize: "1.5rem" }}>#{post.id}</span>
                                            <span style={{ marginLeft: 15, marginRight: 5 }}>{post.title}</span>
                                            <span>[{post.hit}]</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ border: "1px solid #dedede" }}>
                                <Row>
                                    <Col lg={{ span: 6, offset: 0 }} md={{ span: 6, offset: 0 }} sm={{ span: 7, offset: 0 }} style={{ marginBottom: 10, marginLeft: 10 }}>
                                        <Rating user={user} area={post.area} />
                                    </Col>
                                    <Col lg={{ span: 3, offset: 2 }} md={{ span: 4, offset: 1 }} sm={{ span: 4, offset: 0 }}>
                                        <div style={{ margin: 10, fontSize: "1.3rem" }}>Date: {setDate(post.createdAt)}</div>
                                        <div style={{ margin: 10, fontSize: "1.3rem" }}>Hit: {post.hit}</div>
                                    </Col>
                                </Row>
                            </div>

                            <div style={{ border: "1px solid #dedede", padding: 30 }}>
                                <div>
                                    <img style={{ width: "80%", height: "auto" }} src={post.Images.length ? post.Images[0].image_url : ""}></img>
                                </div>

                                <div style={{ fontSize: "1.5rem", marginTop: 20 }}>{post.description}</div>
                            </div>
                            {comments.length ? <div style={{ padding: 10, fontSize: "1.2rem", border: "1px solid #dedede" }}>댓글이 {comments.length}개 달렸습니다.</div> : ""}
                            <div style={{ padding: 10, fontSize: "1.2rem", border: "1px solid #dedede" }}>{comments.length ? comments : <div>댓글이 없습니다</div>}</div>
                            <div style={{ border: "1px solid #dedede", padding: 10 }}>
                                <Form>
                                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                        <Col lg={{ span: 10, offset: 0 }} sm={{ span: 9, offset: 0 }} xs={{ span: 8, offset: 0 }}>
                                            <Form.Control size="lg" name="contents" value={contents} onChange={onChangeHandler} placeholder="로그인 후 사용해 주세요" />
                                        </Col>
                                        <Col lg={{ span: 2, offset: 0 }} sm={{ span: 3, offset: 0 }} xs={{ span: 4, offset: 0 }}>
                                            <div className="d-grid gap-2" style={{ fontSize: "1.3rem" }}>
                                                <button
                                                    onClick={onClickHandler}
                                                    style={{ height: "3rem" }}
                                                    // type="submit"
                                                    className="filledButton"
                                                >
                                                    댓글 입력
                                                </button>
                                            </div>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
