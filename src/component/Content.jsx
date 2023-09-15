import React, { useEffect, useState } from "react";

const Content = () => {
    const [listStudent, setListStudent] = useState([]);
    const [pages, setPages] = useState([]);
    const [curPage, setCurPage] = useState(1);
    const [totalPage, setTotalpage] = useState();
    const [action, setAction] = useState('next');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getStudents() {
            let res = await fetch(`https://js-post-api.herokuapp.com/api/students?_page=${curPage}`)
            let json = await res.json();
            setListStudent(json.data)
            setTotalpage(Math.ceil(Number(json.pagination._totalRows) / Number(json.pagination._limit)));
            let arrpage = []
            for (let i = 1; i <= totalPage; i++) {
                arrpage.push(i)
            }
            setPages(arrpage)
            setLoading(false);


        }
        getStudents()
    }, [curPage])
    const handleClickPagination = (page) => {
        setCurPage(page);
    }
    const handlePrev = () => {
        if (curPage > 1) {
            setCurPage(curPage - 1)
            setAction('prev')
        }
    }
    const handleNext = () => {
        if (curPage < totalPage) {
            setCurPage(curPage + 1)
            setAction('next')
        }
    }
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={curPage <= 1 ? "page-item disabled" : "page-item"}><a className="page-link" role="button" onClick={handlePrev}>Previous</a></li>
                    {
                        pages.map((page, index) => (
                            <li className="page-item" key={index}>
                                <a className={curPage == page ? "page-link btn btn-primary active" : "page-link btn btn-primary "} role="button" onClick={() => handleClickPagination(page)}>{page}</a>

                            </li>)
                        )
                    }
                    <li className={curPage >= totalPage ? "page-item disabled" : "page-item"}><a className="page-link" role="button" onClick={handleNext}>Next</a></li>
                </ul>
            </nav>

            <div className="row">
                {
                    loading
                        ? (<div class="spinner-grow position-absolute top-50 start-50" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>)
                        : listStudent.map((student, index) => {

                            return (<div className="card" style={{ width: "18rem" }} key={index}>
                                <img src={student.gender == "female" ? "https://cdn-icons-png.flaticon.com/512/65/65581.png" : "https://cdn-icons-png.flaticon.com/512/53/53104.png"} className="card-img-top" alt="" />

                                <div className="card-body">
                                    <h5 className="card-title">{student.name} - {student.gender}</h5>
                                    <p className="fst-italic">ID: {student.id}</p>
                                    <p className="card-text fw-bold">Mark: {student.mark}</p>
                                </div>
                            </div>)
                        })
                }
            </div>
        </div>
    )
}

export default Content;