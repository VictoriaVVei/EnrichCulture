import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { RenderCard } from '../components/RenderCard';
import { collection, query, where, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import { cloudStore } from '../../firebase';

export function Diversity() {
    let whatSearch_type = localStorage.getItem("whatSearch_type")
    const [whatSearch, setwhatSearch] = useState("")
    useEffect(() => {
        setwhatSearch(whatSearch_type)
    }, [whatSearch])

    const close = () => {
        localStorage.setItem("whatSearch_type", "")
        setwhatSearch("")
    }

    const [totalPage_num, settotalPage_num] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "numData"), where("numData_Diversity", "!=", null)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                settotalPage_num(Math.ceil(data[0].numData_Diversity / 9))
            })
    }, []);

    const [Page_Num, setPage_Num] = useState(0)
    const [click, setclick] = useState(1)
    const [sep_page, setsep_page] = useState([])
    const [postData, setpostData] = useState([])
    const [postData_last, setpostData_last] = useState(null)

    const last_page = () => {
        if (Page_Num - 1 >= 0) {
            setclick(click + 1)
            setPage_Num(Page_Num - 1)
        }
    }

    const next_page = () => {
        if (postData.length < 9) {
            return;
        }

        if (postData.length < 9) {
            return;
        }

        if (Page_Num + 1 === totalPage_num) {
            return;
        }

        if (postData_last) {
            setclick(click + 1)
            setPage_Num(Page_Num + 1)
            setsep_page(prev => [...prev, postData_last])
        }
    }

    useEffect(() => {
        if (whatSearch && whatSearch.length > 0) {
            if (Page_Num === 0) {
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.type", "==", whatSearch.trim()), orderBy("Post_Information.type", "desc"), orderBy("Post_Information.date", "desc"), limit(9)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        setpostData(data)

                        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                        setpostData_last(lastVisible)
                    })
            } else {
                if (sep_page[Page_Num - 1]) {
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.type", "==", whatSearch.trim()), orderBy("Post_Information.type", "desc"), orderBy("Post_Information.date", "desc"), startAfter(sep_page[Page_Num - 1]), limit(9)))
                        .then((querySnapshot) => {
                            const data = querySnapshot.docs.map((doc) => doc.data())
                            setpostData(data)

                            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                            if (lastVisible) {
                                setpostData_last(lastVisible)
                            } else {
                                setPage_Num(Page_Num - 1)
                            }
                        })
                }
            }
        } else {
            if (Page_Num === 0) {
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.type", "!=", null), where("Post_Information.isFestival", "==", false), orderBy("Post_Information.type", "desc"), orderBy("Post_Information.date", "desc"), limit(9)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        setpostData(data)

                        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                        setpostData_last(lastVisible)
                    })
            } else {
                if (sep_page[Page_Num - 1]) {
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.type", "!=", null), where("Post_Information.isFestival", "==", false), orderBy("Post_Information.type", "desc"), orderBy("Post_Information.date", "desc"), startAfter(sep_page[Page_Num - 1]), limit(9)))
                        .then((querySnapshot) => {
                            const data = querySnapshot.docs.map((doc) => doc.data())
                            setpostData(data)

                            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                            if (lastVisible) {
                                setpostData_last(lastVisible)
                            } else {
                                // setPage_Num(Page_Num - 1)
                            }
                        })
                }
            }
        }
    }, [whatSearch, click])

    return (
        <div id="Diversity">
            <Nav />
            <div>
                <div className='diversity'>
                    <div className='welcomeBoard'><h1>Diversity</h1></div>
                    <div className='whatSearch_type'>
                        <p title="Search in Main Page">What type is being search:
                            <span title="Click to delete">{whatSearch}
                                {whatSearch !== null && whatSearch.length > 0 ?
                                    <><span className='material-symbols-outlined' style={{ position: 'relative', top: '6px', cursor: 'pointer' }} onClick={close}>close</span>
                                    </> : null
                                }
                            </span>
                        </p>
                    </div>
                    <RenderCard postData={postData} />
                    <div className='changePage atBottom' >
                        <div className='switchPage' onClick={last_page}>&lt; Last Page</div>
                        <div className='switchPage' style={{ animation: "none" }}>{Page_Num + 1}/ {totalPage_num > 0 ? totalPage_num: 0}</div>
                        <div className='switchPage' onClick={next_page}>Next Page &gt;</div>
                    </div>
                </div>
            </div>
        </div>
    );
}