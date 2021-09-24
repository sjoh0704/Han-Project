import { ListGroup, Container, Button, Form, Row, Col, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CategoryDirection } from "../CategoryBanner";
import { setMoney, setDate } from "../Convenient";
import Rating from "../Rating";
import Modal from "../Modal";
import io from "socket.io-client";
import auctionTimer from "./timer";

const socket = io.connect("http://localhost:8083");

function AuctionDetail({ match, history }) {
    const auctionId = match.params.number;
    const [timer, setTimer] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const closeModal = () => {
        setModalOpen(false);
    };

    const [amount, setAmount] = useState(1);
    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));
    // const [like, setLike] = useState({ checked: false });
    const [image, setImage] = useState({
        fileurl: null,
    });
    const [product, setProduct] = useState({
        finish: false,
        id: null,
        name: "",
        price: 0,
        area: null,
        seller_id: null,
        createdAt: null,
        updatedAt: null,
    });
    const [seller, setSeller] = useState({});

    const fetchProduct = async () => {
        let res = await axios.get("/store/" + auctionId);
        let _product = res.data;
        setProduct(_product);
        setImage(_product.fileurl ? _product.fileurl[0].fileurls : null);

        let res_seller = await axios.get("/apis/v1/user/" + _product.seller_id);
        setSeller(res_seller.data.payload);

        // check likes
    };

    useEffect(() => {
        socket.emit("message", "hihihii");
        socket.on("products", (msg) => {
            setProduct(msg);
        });
        fetchProduct();
    }, [auctionId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(auctionTimer(product.createdAt));
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const onClickBid = async (e) => {
        if (isLoggedIn === false || userData == null) {
            setModalOpen(true);
            setModalContents("로그인 후 이용하세요.");
            history.replace("/login");
        } else if (userData.user_id == product.seller_id) {
            setModalOpen(true);
            setModalContents("판매자가 구매할 수 없습니다.");
            e.preventDefault();
        }
        let res = await axios.put("/store/plus/" + auctionId, { buyer_id: userData.user_id });
    };

    const displayImage = (image) => {
        if (!image) {
            return <div></div>;
        }
        return (
            <ListGroupItem>
                <br />
                <img
                    style={{
                        width: "60vw",
                    }}
                    src={image}
                ></img>
                <br />
                <br />
            </ListGroupItem>
        );
    };

    return (
        <div>
            <Modal open={modalOpen} close={closeModal}>
                {modalContents}
            </Modal>
            <Container>
                <CategoryDirection tag1={"경매"} tag2={product.name} />
                <Row>
                    <Col lg={{ span: 10, offset: 1 }}>
                        {" "}
                        <div style={{ border: "1px solid #dedede", padding: 5 }}>
                            <Row>
                                <Col xs="12" sm="12" md="6" lg="7">
                                    <div style={{ padding: 15 }}>
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                            }}
                                            src={image}
                                        ></img>
                                    </div>
                                </Col>
                                <Col xs="12" sm="12" md="6" lg="5">
                                    <div style={{ border: "1px solid #dedede", margin: 5 }}>
                                        <Row style={{ paddingTop: 5 }}>
                                            <Rating user={seller} area={product.area} />
                                        </Row>
                                        <hr />

                                        <Row style={{ marginTop: 20, paddingTop: 20 }}>
                                            <Col xs="9" sm="9">
                                                <p style={{ marginLeft: 20, fontSize: "2.2rem", fontWeight: "bolder" }}>{product.name}</p>
                                            </Col>
                                            {/* <Col xs="3" sm="3">
                                                <img style={{ width: "2rem" }} src={like.checked ? HeartImg : EmptyHeartImg} onClick={onClickCart}></img>
                                            </Col> */}
                                        </Row>

                                        <p style={{ fontSize: "2rem", margin: 20 }}>{setMoney(product.price)} ₩</p>
                                        <p style={{ fontSize: "1.5rem", margin: 20 }}>등록 시간: {product.createdAt}</p>
                                        <p style={{ fontSize: "1.5rem", margin: 20 }}>낙찰까지 남은 시간: {auctionTimer(product.createdAt)}</p>
                                        <Row style={{ fontSize: "1.5rem", padding: 20 }}></Row>
                                        <Col>
                                            <p style={{ fontSize: "3em", margin: 20 }}>
                                                {product.price ? (product.price * amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : product.price * amount} ₩
                                            </p>
                                        </Col>

                                        <Col xs="12">
                                            <div className="d-grid gap-2">
                                                <button className="emptyButton" onClick={onClickBid} style={{ fontSize: "1.3rem", margin: 20, height: 50 }}>
                                                    입찰
                                                </button>
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row style={{ marginTop: 40 }}>
                            <Col>
                                <ListGroup>
                                    <ListGroupItem>
                                        <p style={{ margin: 10, fontSize: "2rem" }}>경매 상세 </p>
                                    </ListGroupItem>

                                    {displayImage(image)}

                                    <ListGroupItem>
                                        <p style={{ margin: 20, fontSize: "2rem" }}>{product.description}</p>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AuctionDetail;
