import React from 'react'
import {useSelector} from 'react-redux'
import {Container, Navbar, Nav, NavDropdown, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'




export function CategoryDirection({tag1, tag2, tag3, tag4, tag5}){
    let expression = '홈'

    if(tag1) expression += ` > ${tag1}`;
    if(tag2) expression += ` > ${tag2}`;
    if(tag3) expression += ` > ${tag3}`;
    if(tag4) expression += ` > ${tag4}`;
    if(tag5) expression += ` > ${tag5}`;
    let tags = expression.split(' > ')
    let last = tags[tags.length-1]
    expression = expression.substring(0, expression.length-last.length)
    // console.log(expression)
    return(<div style={{marginTop:50, marginBottom:50, fontSize:'1.4rem'}}>
   
    <span>

        <Link to='/' style={{textDecoration:'none', color:'inherit'}}>
        {expression}
        </Link>
        
        </span>
        <span style={{fontWeight:'bolder', color: '#e85255'}}>
        {last}
        </span>
     
        </div>
    );
}



export const PlusMiniBanner = ()=>{

    return (<div style={{background:'gray', color:"black", fontSize:"1.2rem", padding:4}}>
        <Container>
            <Row>
                <Col lg={{span:1, offset:7}}
                sm={{span:2, offset:7}}
                xs={{span:5, offset:2}}>
                <Link to="/post/page/1" style={{textDecoration:'none', color:'inherit'}}>
                자유 거래
                </Link>
                </Col>
                <Col lg={{span:2, offset:0}}
                sm={{span:2, offset:0}}
                xs={{span:5, offset:0}}>
                <Link to="/auction/home" style={{textDecoration:'none', color:'inherit'}}>
                경매 상품
                </Link>
                </Col>
                
            </Row>
        </Container>
        
    </div>)
}


function CategoryBanner(){

    const{isLoggedIn} = useSelector(state=>({
        isLoggedIn: state.user.isLoggedIn
    }))

    const {kind} = useSelector(state => ({
        kind: state.category.payload
    }))
    const display_category = kind.map((k, index) => {
        
        let  path = '/category/' + (k.pk)
        return (
            <Col lg='1' md='2' sm='2' xs='3'>
            <Nav.Item>
            <Nav.Link href={path} style={{color:'white',padding:5}}>{k.kind}</Nav.Link>
            </Nav.Item>
            
            </Col>
            
        );
    }
    );

    
    

    return(

            <div style={{background:"#e85255", fontSize: "1.3rem", paddingTop:5, paddingBottom:5, color:'white'}}>

                <Nav variant="pills" defaultActiveKey="/home">
                <Container>
                    <Row>
                        <Col lg='1' sm='1' xs='1'>
                        <Nav.Item>
                        <Nav.Link href="/" style={{color:'white',padding:5}}>홈</Nav.Link>
                        </Nav.Item>
                        
                        </Col>
                    
                {display_category}

                    </Row>
                </Container>
               
                </Nav>

                

          </div>
  
      
        
   );
}


export default CategoryBanner