import { Col, Row } from 'react-bootstrap';
import ther from '../assets/images/ther.png';
import userImage from '../assets/images/user2.png';
function Rating({user, area}){
    if(!user){
        return(<div>
        </div>);
    }

    let {username, temperature, celcius} = user;
    let tmp = <div></div>;
    let temp_type;

    if(celcius){
        temp_type = temperature + '℃';
    }
    else{
        temp_type = temperature + '°F';
    }

    if(! temperature){
        tmp = (
        <div style={{padding: 10, fontSize:'1.4rem', color:'black'}}>
            {"36.5℃"}
        </div>)
        }
        else

    if(temperature > 36.5){
        tmp = (
        <div style={{padding: 15, fontSize:'1.4rem', color:'green', fontWeight:'bold'}}>
            {temp_type}
        </div>
    )}
    else if(temperature== 36.5){
        tmp = (
        <div style={{padding: 15, fontSize:'1.4rem', fontWeight:'bold'}}>
            {temp_type}
        </div>
    )}
     
    else{
            tmp = (
            <p style={{fontSize:'1.4rem', color:'red'}}>
                {temp_type}
            </p>
        )
    }
    return (

        <Row style={{marginTop: 20, paddingTop:20}}>
                    <Col xs='2' sm='2' md='2' lg='2'>
                        <img style={{maxWidth:'100%', height:'auto'}} 
                        src={userImage}/>

                    </Col>
                   
                    <Col xs='6' sm='6' md='6' lg='5'>
                        {area? <div>
                        <Row>
                        <p style={{fontSize:'1.3rem', fontWeight:'bold'}}>{username}</p>

                        </Row>
                        <Row style={{fontSize:"1.3rem"}}>
                            {area?area:''}

                        </Row>

                        </div>: <div>
                        <Row>
                            <p style={{fontSize:'1.5rem', padding:10}}>{username}</p>

                        </Row>
                        </div>}
                   
                    </Col>

                    <Col xs='4' sm='4' md='3' lg='5'>
                        <Row>
                            <Col xs="5" sm='6' md='4' lg={{span:3, offset:4}} style={{paddingTop:0}}>
                                {tmp}
                            </Col>
                            <Col xs='5' sm='6' md='6' lg='4'>
                                <img style={{maxWidth:'100%', height:'auto'}}
                                src={ther}/>
                            </Col>
                        </Row>
                    </Col>

        </Row>

       
    )

    


}

export default Rating;