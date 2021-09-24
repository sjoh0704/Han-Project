import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
// import ImageUploading from "react-images-uploading";
import { CategoryDirection } from "../CategoryBanner";
import AreaButton from "../AreaButton";
import Modal from "../Modal";
import { S3Config, UploadS3 } from "../UploadS3";

function AuctionRegister({ history }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };
    const [area, setArea] = useState("지역을 선택해 주세요");
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileInput = (e) => {
        // setSelectedFile(selectedFile.concat(e.target.files[0]));
        setSelectedFiles(selectedFiles.concat(e.target.files[0]));
    };

    const [content, setContent] = useState({
        name: "",
        description: "",
        price: 0,
    });
    const { name, description, price } = content;

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setContent({
            ...content,
            [name]: value,
        });
    };

    const onChangeArea = (e) => {
        const { name, value } = e.target;
        setArea(value);
    };

    const onClickHandler = () => {
        if (!(name && description && price)) {
            setModalOpen(true);
            setModalContents("모든 항목을 입력해 주세요");
            return;
        }

        if (area == undefined || area == null || area == "지역을 선택해 주세요") {
            setModalOpen(true);
            setModalContents("거래 지역을 선택해 주세요");
            return;
        }

        const body = {
            seller_id: userData.user_id,
            name: name,
            price: parseInt(price),
            area: area,
            description: description,
            fileurl: selectedFiles.map((image) => ({ fileurls: `https://${S3Config.bucketName}.s3.${S3Config.region}.amazonaws.com/${image.name}` })),
        };

        UploadS3(selectedFiles);

        axios
            .post("/store", body)
            .then((response) => {
                // history.replace("/auction/home");
            })
            .catch((e) => {
                setModalOpen(true);
                setModalContents("경매 등록에 실패하였습니다. 관리자에게 문의하세요.");
            });
        history.replace("/auction/home");
    };

    const checkLogin = () => {
        if (!isLoggedIn || !userData) {
            alert("로그인 후 이용해 주세요!");
            history.goBack();
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <div>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>
            <div style={{ background: "#dedede" }}>
                <Container>
                    <Row>
                        <Col xs={{ span: 4, offset: 2 }} sm={{ span: 2, offset: 7 }} md={{ span: 1, offset: 9 }} lg={{ span: 1, offset: 8 }}>
                            <div
                                style={{ height: "2rem", fontSize: "1.2rem", margin: 3, color: "#44444" }}
                                onClick={() => {
                                    history.push("/auction/home");
                                }}
                            >
                                경매 홈
                            </div>
                        </Col>
                        <Col xs={{ span: 6, offset: 0 }} sm={{ span: 3, offset: 0 }} md={{ span: 2, offset: 0 }} lg={{ span: 2, offset: 0 }}>
                            <div
                                style={{ height: "2rem", fontSize: "1.2rem", margin: 3, color: "#44444" }}
                                onClick={() => {
                                    history.push("/auction/register");
                                }}
                            >
                                경매상품 등록하기
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <CategoryDirection tag1={"경매"} tag2={"상품 등록하기"}></CategoryDirection>
                <br />
                <div style={{ fontSize: "1.3rem" }}>
                    <Row>
                        <Col lg={{ span: 11, offset: 2 }} sm={{ span: 12, offset: 0 }} xs={{ span: 12 }}>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1" as={Row}>
                                    <Form.Label column sm="2" lg="1" xs="4">
                                        상품명
                                    </Form.Label>
                                    <Col sm="8" lg="8" xs="8">
                                        <Form.Control name="name" value={name} onChange={onChangeHandler} placeholder="상품명을 적어주세요" />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1" as={Row}>
                                    <Form.Label column sm="2" lg="1" xs="4">
                                        시작 금액
                                    </Form.Label>
                                    <Col sm="2" lg="2" xs="4">
                                        <Form.Control name="price" value={price} onChange={onChangeHandler} placeholder="시작 금액을 적어주세요" />
                                    </Col>
                                    <Form.Label column sm="1" lg="1" xs="2">
                                    ₩
                                    </Form.Label>
                                </Form.Group>

                                <Row>
                                    <Col sm="2" lg="1" xs="4" style={{ paddingTop: 20 }}>
                                        거래 지역
                                    </Col>
                                    <Col sm="6" lg="6" xs="6" style={{ paddingTop: 8 }}>
                                        <AreaButton onChange={onChangeArea} area={area} />
                                    </Col>
                                </Row>
                                <br />
                                <Form.Group controlId="exampleForm.ControlTextarea1" as={Row}>
                                    <Form.Label column sm="2" lg="1">
                                        내용
                                    </Form.Label>
                                    <Col sm="10" lg="8">
                                        <Form.Control as="textarea" rows={5} onChange={onChangeHandler} name="description" placeholder="상품 설명을 적어주세요" value={description} />
                                    </Col>
                                </Form.Group>
                                <br />
                                <Form.Group controlId="exampleForm.ControlTextarea1" as={Row}>
                                    <Col>
                                        <input type="file" onChange={handleFileInput} />
                                        {/* <button onClick={(e) => emptyFiles(e)}>Empty</button> */}

                                        {/* <p>{`이미지는 최대 ${maxNumber}개까지만 첨부할 수 있습니다`}</p> */}
                                        <br />
                                        <br />
                                    </Col>
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant="outline-light"
                                    style={{ background: "#e85255", fontSize: "1.3rem" }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickHandler();
                                    }}
                                >
                                    경매 등록
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default AuctionRegister;
