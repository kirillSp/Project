import React, { useState } from "react";
import PaginatorS from "./PaginatorS.module.css";

type PropsType = {
    totalUsers: number
    pageSize: number 
    currentPage: number
    clickPage: (numPage: number) => void 
    sectionSize?: number 
}

export let Paginator: React.FC<PropsType> = ({ totalUsers, pageSize, currentPage, clickPage, sectionSize = 5 }) => {
    let totalPages = Math.ceil(totalUsers / pageSize);
    let renderPages: Array<number> = [];

    for (let numPage = 1; numPage <= totalPages; numPage++) {
        renderPages.push(numPage)
    }

    let totalSection = Math.ceil(totalPages / sectionSize);
    let [currentSection, setSection] = useState(1);
    let firstPageSection = (currentSection - 1) * sectionSize + 1;
    let lastPageSection = currentSection * sectionSize;

    return <div className={PaginatorS.numPage}>
        <>{
            currentSection > 1 && <button onClick={() => { setSection(currentSection - 1) }}>prev</button>
        }</>

        <>{
            renderPages
                .filter(numPage => numPage >= firstPageSection && numPage <= lastPageSection)
                .map((numPage, i) => {
                    let cnVal = (currentPage === numPage ? PaginatorS.selected : "") + " " + PaginatorS.pages;

                    return <span className={cnVal} key={i} onClick={() => { clickPage(numPage) }}>{
                        numPage
                    }</span>

                })
        }</>

        <>{
            currentSection < totalSection && <button onClick={() => setSection(currentSection + 1)}>next</button>
        }</>
    </div>
};
