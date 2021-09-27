import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginAction, logoutAction } from "../modules/user";
import { CategoryDirection } from "./CategoryBanner";
import Rating from "./Rating";

function Profile({ history }) {
    const dispatch = useDispatch();
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    console.log(userData);

    const [user, setUser] = useState({
        username: userData.username,
        email: userData.useremail,
        phone_number: userData.phone_number,
    });
    const { username, email, phone_number } = user;
    const user_id = userData.user_id;

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };
    const onClickEditHandler = async (e) => {
        e.preventDefault();
        let body = {
            user_id: user_id,
            username: username,
            useremail: email,
            phone_number: phone_number,
        };
        await axios
            .post(`/apis/v1/user/${user_id}`, body)
            .then((response) => {
                alert("사용자 정보 수정 완료");
                dispatch(loginAction(body));
            })
            .catch((e) => {
                alert("사용자 정보 수정 실패");
            });
    };

    const onClickDeleteHandler = async (e) => {
        e.preventDefault();
        await axios
            .delete(`/apis/v1/user/${user_id}`)
            .then((response) => {
                console.log(response);
                alert("회원 탈퇴 완료");
                dispatch(logoutAction());
                history.replace("/");
            })
            .catch((e) => {
                alert("회원 탈퇴 실패");
            });
    };

    return (
        <div>
            <Container>
                <CategoryDirection tag1={"내정보 관리"}></CategoryDirection>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                        <div style={{ fontSize: "1.2rem", border: "1px solid #dedede", paddingTop: 30, paddingBottom: 60, paddingLeft: 10, paddingRight: 10 }}>
                            <Row>
                                <Col lg={{span:10, offset:1}} xs={{span:12}}>
                                    <div style={{marginBottom:30, padding:10}}>
                                        <Rating user={user} />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={{ span: 10, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 10, offset: 1 }}>
                                    <Form>
                                        <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                            <Form.Label column sm="2" md="2" lg="2" style={{}}>
                                                아이디
                                            </Form.Label>
                                            <Col sm="10" md="10" lg="8">
                                                <Form.Control size="lg" name="username" value={username} onChange={onChangeHandler} placeholder="ID를 입력해주세요" />
                                            </Col>
                                        </Form.Group>
                                        <br />
                                        <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                            <Form.Label column sm="2" md="2" lg="2" style={{}}>
                                                이메일
                                            </Form.Label>
                                            <Col sm="10" md="10" lg="8">
                                                <Form.Control size="lg" name="email" value={email} onChange={onChangeHandler} placeholder="email을 입력해주세요" />
                                            </Col>
                                        </Form.Group>
                                        <br />
                                        <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                                            <Form.Label column md="2" sm="2" lg="2" style={{}}>
                                                전화번호
                                            </Form.Label>
                                            <Col sm="10" md="10" lg="8">
                                                <Form.Control size="lg" name="phone_number" value={phone_number} onChange={onChangeHandler} placeholder="대시(-) 없이 입력해주세요" />
                                            </Col>
                                        </Form.Group>
                                        <br />

                                        <Row>
                                            <Col lg={{ span: 4, offset: 2 }} md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }}>
                                                <div className="d-grid gap-2">
                                                    <button className="filledButton" style={{ fontSize: "1.3rem", height: "3.5rem" }} onClick={onClickEditHandler}>
                                                        수정
                                                    </button>
                                                    <span> </span>
                                                </div>
                                            </Col>
                                            <Col lg={{ span: 4, offset: 0 }} md={{ span: 4 }} sm={{ span: 4, offset: 0 }}>
                                                <div className="d-grid gap-2">
                                                    <button className="emptyButton" style={{ fontSize: "1.3rem", height: "3.5rem" }} onClick={onClickDeleteHandler}>
                                                        회원 탈퇴
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;
