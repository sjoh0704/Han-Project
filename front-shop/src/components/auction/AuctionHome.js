import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { Col, Container, Navbar, Row, Spinner } from "react-bootstrap";
import Loading from "../Loading";
import { MakeAuctionCard } from "../MakeCard";

export default function AuctionHome({history}) {
    const [products, Setproducts] = useState([{
        seller_id: 5,
        name: "제목입니다.1",
        price: 10000,
        description: "내용입니다. ",
        createdAt: "1234",
        updatedAt: "1234",
        fileurl:"https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
        id: "dafgfa213f"
    },{
        seller_id: 12,
        name: "제목입니다.2",
        price: 10000,
        description: "내용입니다. ",
        createdAt: "1234",
        updatedAt: "1234",
        fileurl:"https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
        id: "dafgfa2132134f"
    },]);

 
    const fetchProducts = async () => {
        // let res = await axios.get("/store");
        // let _product = res.data.payload;
        // product_list = _product.map((data) => {
        //     return {
        //         ...data,
        //         id: data.pk,
        //     };
        // });
        // Setproducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
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

            <div>
                <br />
                <Container>
                    <div style={{ marginTop: 30 }} />

                    <h3 style={{ marginTop: 40 }}>오늘의 경매</h3>

                    <hr />
                    {/* <Loading products={products} /> */}
                    <MakeAuctionCard products={products}></MakeAuctionCard>
                </Container>
            </div>
        </div>
    );
}
