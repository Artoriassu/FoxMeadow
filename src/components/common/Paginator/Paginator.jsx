import React, { useState } from 'react';
import view from './Paginator.module.css';


let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionPageNumber = portionNumber * props.portionSize;
    return (
        <div>
            {portionNumber > 1 && <span className={props.currentPage === pages[0] && view.selectedPage}
                onClick={(e) => { props.onPageChanged(pages[0]); setPortionNumber(1); }}>{pages[0]} </span>}
            {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={props.currentPage === p && view.selectedPage}
                        onClick={(e) => { props.onPageChanged(p); }}>{p} </span>
                })}
            {portionNumber < portionCount && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
            {portionNumber < portionCount && <span className={props.currentPage === (pages.length) && view.selectedPage}
                onClick={(e) => { props.onPageChanged(pages.length); setPortionNumber(portionCount);}}>{pages.length} </span>}
        </div>
    )
}

export default Paginator;