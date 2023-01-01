import StyleSelectPage from "./StyleSelectPage.module.css";

export let SelectPage = (props) => {
    let { totalUsers, pageSize, currentPage, clickPage } = props;
    let totalPages = Math.ceil(totalUsers / pageSize);
    let pagesForRender = [];

    for (let numPage = 1; numPage <= totalPages; numPage++) {
        pagesForRender.push(numPage);
    }

    return <div className={StyleSelectPage.numPage}>{
        pagesForRender.map((numPage, i) => {
            let isCurrentPage = currentPage === numPage && StyleSelectPage.selected;
            
            return <span className={isCurrentPage} key={i} onClick={() => clickPage(numPage)}>{
                numPage
            }</span>
        
        })
    }</div>
};
