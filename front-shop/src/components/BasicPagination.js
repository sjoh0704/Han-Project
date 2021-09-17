import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const BasicPagination = ({path, history }) =>{
    let items = [];

    const onClickHandler = (number) =>{
      history.push(`${path}/${number}`);
    }

    for (let number = 1; number <= 5; number++) {
      items.push(

        <Pagination.Item key={number} onClick={()=>onClickHandler(number)}>
          {number}  
        </Pagination.Item>
      );
    }

    return (
      <div>
      <Pagination>{items}</Pagination>
      <br />
    </div>
    )
    
};


export default BasicPagination;
