import { Col, Row } from 'react-bootstrap';
import ther from '../assets/images/ther.png';
import userImage from '../assets/images/user2.png';
function Rating({user, area}){
    if(!user){
        return;
    }
    const {username} = user;
    let temperature = 37.1
    let tmp = <div></div>;

    if(! temperature){
        tmp = (
        <div style={{padding: 10, fontSize:'1.2rem', color:'black'}}>
        36.5 ℃
        </div>)
        }
        else
        temperature = parseFloat(temperature);

    if(temperature >= 36.5){
        let temp = temperature + '℃'
        tmp = (
        <div style={{padding: 15, fontSize:'1.3rem', color:'green', fontWeight:'bold'}}>
            {temp}
        </div>
    
    )}
       
     
    else{
            let temp = temperature + '℃'
            tmp = (
            <p style={{fontSize:'1.2rem', color:'red'}}>
                {temp}
            </p>
        )
    
    }
    return (
        <Row style={{marginTop: 20, paddingTop:20}}>
                    <Col xs='3' sm='3' lg='2'>
                    <img style={{maxWidth:'100%', height:'auto'}} 
                    src={userImage}/>

                     </Col>
                    <Col xs='3' sm='4' lg='4'>
                        <Row>
                            {username}

                        </Row>
                        <Row style={{padding:1}}>
                            {area?area:''}

                        </Row>
                   
                    
                    </Col>
                    <Col xs='6' sm='5' lg='6'>
                    <Row>
                    <Col xs="5" sm='6' lg={{span:3, offset:4}}>
                        {tmp}
                    </Col>
                    <Col xs='5' sm='6' lg='4'>
                        <img style={{maxWidth:'100%', height:'auto'}}
                        src={ther}/>
                    </Col>
                </Row>
                </Col>

        </Row>

       
    )

    


}

export default Rating;