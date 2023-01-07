import { useState } from "react";
import StyleSelectPage from "./StyleSelectPage.module.css";

export let SelectPage = ({ totalUsers, pageSize, currentPage, clickPage, sectionSize = 5 }) => {
    let totalPages = Math.ceil(totalUsers / pageSize);
    let pagesForRender = [];

    for (let numPage = 1; numPage <= totalPages; numPage++) {
        pagesForRender.push(numPage)
    }

    let totalSection = Math.ceil(totalPages / sectionSize);
    let [currentSection, setSection] = useState(1);
    let firstPageSection = (currentSection - 1) * sectionSize + 1;
    let lastPageSection = currentSection * sectionSize

    return <div className={StyleSelectPage.numPage}>
        <>{
            currentSection > 1 && <button onClick={() => setSection(currentSection - 1)}>prev</button>
        }</>

        <>{
            pagesForRender
                .filter((numPage, i) => numPage >= firstPageSection && numPage <= lastPageSection)
                .map((numPage, i) => {
                    let isCurrentPage = (currentPage === numPage ? StyleSelectPage.selected : "") + " " + StyleSelectPage.pages;

                    return <span className={isCurrentPage} key={i} onClick={() => clickPage(numPage)}>{
                        numPage
                    }</span>

                })
        }</>

        <>{
            currentSection < totalSection && <button onClick={() => setSection(currentSection + 1)}>next</button>
        }</>
    </div>
};
