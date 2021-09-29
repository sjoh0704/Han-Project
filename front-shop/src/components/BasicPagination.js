import React, { useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

const BasicPagination = ({path, history }) =>{
    let items = [];

    const onClickHandler = (number) =>{
      history.push(`${path}/${number}`);
    }

    for (let number = 1; number <= 10; number++) {
      items.push(

        <Pagination.Item key={number} onClick={()=>onClickHandler(number)}>
          {number}  
        </Pagination.Item>
      );
    }

    return (
      <div>
      <Pagination size="md">{items}</Pagination>
      <br />
    </div>
    )
    
};


export default BasicPagination;
