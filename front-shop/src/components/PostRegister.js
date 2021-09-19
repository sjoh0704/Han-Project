import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import { CategoryDirection } from "./CategoryBanner";
import AreaButton from "./AreaButton";
import Modal from "./Modal";
import { S3Config, UploadS3 } from "./UploadS3";

function PostRegister({ history }) {
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
    const maxNumber = 4;

    const [content, setContent] = useState({
        title: "",
        description: "",
    });
    const { title, description } = content;

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
        if (!(title && description)) {
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
            user_id: userData.user_id,
            title: title,
            area: area,
            description: description,
            images: selectedFiles.map(
                (image) => `https://${S3Config.bucketName}.s3.${S3Config.region}.amazonaws.com/${image.name}`
                // ...image_list  // 용량이 크면 안넘어가
            ),
        };

        console.log("바디", body);
        axios
            .post("/apis/v1/post", body)
            .then((response) => {
                alert("hihi");
                // history.replace('/')
            })
            .catch((e) => {
                setModalOpen(true);
                setModalContents("상품 등록에 실패하였습니다. 관리자에게 문의하세요.");
            });
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

            <Container>
                <CategoryDirection tag1={"자유거래 게시판"} tag2={"게시글 등록하기"}></CategoryDirection>
                <br />
                <div style={{ fontSize: "1.3rem" }}>
                    <Row>
                        <Col lg={{ span: 11, offset: 2 }} sm={{ span: 12, offset: 0 }} xs={{ span: 12 }}>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1" as={Row}>
                                    <Form.Label column sm="2" lg="1" xs="4">
                                        제목
                                    </Form.Label>
                                    <Col sm="10" lg="8" xs="8">
                                        <Form.Control name="title" value={title} onChange={onChangeHandler} placeholder="상품명을 적어주세요" />
                                    </Col>
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

                                        <p>{`이미지는 최대 ${maxNumber}개까지만 첨부할 수 있습니다`}</p>
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
                                        UploadS3(selectedFiles);
                                    }}
                                >
                                    게시글 등록
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default PostRegister;
