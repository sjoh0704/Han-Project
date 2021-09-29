import { ListGroup, Container, Button, Form, Row, Col, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CategoryDirection } from "../CategoryBanner";
import { setMoney, setDate } from "../Convenient";
import Rating from "../Rating";
import Modal from "../Modal";
import io from "socket.io-client";
import auctionTimer from "./timer";
const socket = io(process.env["REACT_APP_SOCKET_URL"] || "http://auction-service.default.svc:8080", { transports: ["websocket"] });

function AuctionDetail({ match, history }) {
    const auctionId = match.params.number;
    const [timer, setTimer] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState("");
    const [buyer, setBuyer] = useState({ username: "" });
    const closeModal = () => {
        setModalOpen(false);
    };

    const { isLoggedIn, userData } = useSelector((state) => ({
        isLoggedIn: state.user.isLoggedIn,
        userData: state.user.payload,
    }));

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
    if (auctionTimer(product.createdAt) === "마감") {
        product.finish = true;
    }
    const [seller, setSeller] = useState({});

    const fetchProduct = async () => {
        let res = await axios.get("/apis/v1/store/" + auctionId);
        let _product = res.data;
        // _product.createdAt = "2021-09-28T16:52:25.492Z";
        setProduct(_product);
        setImage(_product.fileurl.length != 0 ? _product.fileurl[0].fileurls : null);

        let res_seller = await axios.get("/apis/v1/user/" + _product.seller_id);
        setSeller(res_seller.data.payload);
        if (_product.buyer_id) {
            let res_buyer = await axios.get("/apis/v1/user/" + _product.buyer_id);
            setBuyer(res_buyer.data.payload);
        }

        // check likes
    };

    // socket.on("products", (msg) => {
    //     setProduct(msg);
    // });

    useEffect(() => {
        fetchProduct();
    }, [auctionId, buyer.username, product.price]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(auctionTimer(product.createdAt));
            if (timer === "마감") {
                product.finish = true;
                setProduct(product);
                // history.replace(`/auction/detail/${auctionId}`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const onClickBid = async (e) => {
        if (isLoggedIn === false || userData == null) {
            setModalOpen(true);
            setModalContents("로그인 후 이용하세요.");
            history.replace("/login");
            return;
        } else if (userData.user_id == product.seller_id) {
            setModalOpen(true);
            setModalContents("판매자가 구매할 수 없습니다.");
            e.preventDefault();
            return;
        }
        let res = await axios.put("/apis/v1/store/plus/" + auctionId, { buyer_id: userData.user_id });
        setProduct(product.price * 1.1);
        alert("입찰되었습니다.");
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
                <CategoryDirection tag1={"경매"} tag2={product.name} />
                <Row>
                    <Col lg={{ span: 10, offset: 1 }}>
                        <div style={{ border: "1px solid #dedede", padding: 5 }}>
                            {image ? (
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
                                            </Row>
                                            <div style={{ margin: 20 }}>
                                                <span style={{ fontSize: "1.5rem" }}> 현재가: </span>
                                                <span style={{ fontSize: "2rem" }}>{setMoney(product.price)} ₩</span>
                                            </div>
                                            <p style={{ fontSize: "1.5rem", margin: 20 }}>등록 시간: {setDate(product.createdAt)}</p>
                                            <div style={{ fontSize: "1.5rem", margin: 20 }}>
                                                <span style={{ fontSize: "1.6rem" }}> 낙찰까지 남은 시간:</span>
                                                {product.finish ? (
                                                    <span style={{ fontSize: "2rem", fontWeight: "bold" }}> {"0시간 0분 0초"}</span>
                                                ) : (
                                                    <span style={{ fontSize: "2rem", fontWeight: "bold" }}> {auctionTimer(product.createdAt)}</span>
                                                )}
                                            </div>
                                            <div style={{ fontSize: "1.5rem", margin: 20 }}>
                                                <span style={{ fontSize: "1.5rem" }}>현재까지 최종 입찰자: </span>
                                                {buyer.username ? <span style={{ fontSize: "1.7rem", fontWeight: "bold" }}>{buyer.username}</span> : "없습니다."}
                                            </div>
                                            <Row style={{ fontSize: "1.5rem", padding: 20 }}></Row>
                                            <Col>
                                                <p style={{ fontSize: "3em", margin: 20 }}>{product.price ? product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : product.price} ₩</p>
                                            </Col>

                                            <Col xs="12">
                                                <div className="d-grid gap-2">
                                                    {product.finish ? (
                                                        <div>
                                                            <p style={{ fontSize: "2.5rem", margin: 15, color: "red" }}>경매가 마감되었습니다</p>
                                                        </div>
                                                    ) : (
                                                        <button className="emptyButton" onClick={onClickBid} style={{ fontSize: "1.5rem", margin: 20, height: 50 }}>
                                                            입찰하기
                                                        </button>
                                                    )}
                                                </div>
                                            </Col>
                                        </div>
                                    </Col>
                                </Row>
                            ) : (
                                <Col xs="12">
                                    <div style={{ border: "1px solid #dedede", margin: 5 }}>
                                        <Row style={{ paddingTop: 5 }}>
                                            <Col lg="10" md="10" xs="12">
                                                <Rating user={seller} area={product.area} />
                                            </Col>
                                        </Row>
                                        <hr />

                                        <Row style={{ marginTop: 20, paddingTop: 20 }}>
                                            <Col xs="9" sm="9">
                                                <p style={{ marginLeft: 20, fontSize: "2.2rem", fontWeight: "bolder" }}>{product.name}</p>
                                            </Col>
                                        </Row>
                                        <div style={{ margin: 20 }}>
                                            <span style={{ fontSize: "1.5rem" }}> 현재가: </span>
                                            <span style={{ fontSize: "2rem" }}>{setMoney(product.price)} ₩</span>
                                        </div>
                                        <p style={{ fontSize: "1.5rem", margin: 20 }}>등록 시간: {setDate(product.createdAt)}</p>
                                        <div style={{ fontSize: "1.5rem", margin: 20 }}>
                                            <span style={{ fontSize: "1.5rem" }}> 낙찰까지 남은 시간:</span>
                                            {product.finish ? (
                                                <span style={{ fontSize: "2rem", fontWeight: "bold" }}> {"0시간 0분 0초"}</span>
                                            ) : (
                                                <span style={{ fontSize: "2rem", fontWeight: "bold" }}> {auctionTimer(product.createdAt)}</span>
                                            )}
                                        </div>
                                        <Row style={{ fontSize: "1.5rem", padding: 20 }}>
                                            <Col xs="6">
                                                <p style={{ fontSize: "3em", margin: 20 }}>{product.price ? product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : product.price} ₩</p>
                                            </Col>

                                            <Col xs="6">
                                                <div className="d-grid gap-2">
                                                    {product.finish ? (
                                                        <div>
                                                            <p style={{ fontSize: "2rem", margin: 30, color: "red" }}>경매가 마감되었습니다</p>
                                                        </div>
                                                    ) : (
                                                        <button className="emptyButton" onClick={onClickBid} style={{ fontSize: "1.5rem", margin: 20, height: 50 }}>
                                                            입찰하기
                                                        </button>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            )}
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
