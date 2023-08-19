import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { RenderCard } from '../components/RenderCard';
import { collection, query, where, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import { cloudStore } from '../../firebase';
import { Footer } from '../components/Footer';

export function Festival() {

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const [Month, setMonth] = useState("")
    const handleInputChange = (e) => {
        let { value } = e.target
        setMonth(value)
    }

    const [location, setlocation] = useState("")
    const handleInputChange2 = (e) => {
        let { value } = e.target
        setlocation(value)
    }

    const [totalPage_num, settotalPage_num] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "numData"), where("numData_Festival", "!=", null)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                settotalPage_num(Math.ceil(data[0].numData_Festival / 9))
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

    const [isLoading, setIsLoading] = useState(true);
    const next_page = () => {
        if (!isLoading) {
            return;
        }

        if (postData.length < 9) {
            return;
        }

        if (Page_Num + 1 === totalPage_num) {
            return;
        }

        if (postData_last) {
            setPage_Num(Page_Num + 1)
            setclick(click + 1)
            setsep_page(prev => [...prev, postData_last])
        }
    }

    useEffect(() => {
        if (Month.length > 0 && location.length === 0) {
            if (Page_Num === 0) {
                setIsLoading(false);
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.month", "==", Month), where("Post_Information.isFestival", "==", true), orderBy("Post_Information.month", "desc"), orderBy("Post_Information.day", "desc"), limit(9)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        setpostData(data)

                        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                        setpostData_last(lastVisible)
                        setIsLoading(true);
                    })
            } else {
                if (sep_page[Page_Num - 1]) {
                    setIsLoading(false);
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.month", "==", Month), where("Post_Information.isFestival", "==", true), orderBy("Post_Information.month", "desc"), orderBy("Post_Information.day", "desc"), startAfter(sep_page[Page_Num - 1]), limit(9)))
                        .then((querySnapshot) => {
                            const data = querySnapshot.docs.map((doc) => doc.data())
                            setpostData(data)

                            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                            if (lastVisible) {
                                setpostData_last(lastVisible)
                            } else {
                                // setPage_Num(Page_Num - 1)
                            }
                            setIsLoading(true);
                        })
                }
            }
        } else if (location.length > 0 && Month.length === 0) {
            if (Page_Num === 0) {
                setIsLoading(false);
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.location", "==", location), where("Post_Information.isFestival", "==", true), limit(9)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        setpostData(data)

                        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                        setpostData_last(lastVisible)
                        setIsLoading(true);
                    })
            } else {
                if (sep_page[Page_Num - 1]) {
                    setIsLoading(false);
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.location", "==", location), where("Post_Information.isFestival", "==", true), startAfter(sep_page[Page_Num - 1]), limit(9)))
                        .then((querySnapshot) => {
                            const data = querySnapshot.docs.map((doc) => doc.data())
                            setpostData(data)

                            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                            if (lastVisible) {
                                setpostData_last(lastVisible)
                            } else {
                                // setPage_Num(Page_Num - 1)
                            }
                            setIsLoading(true);
                        })
                }
            }
        } else if (Month.length > 0 && location.length > 0) {
            if (Page_Num === 0) {
                setIsLoading(false);
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.month", "==", Month), where("Post_Information.location", "==", location), where("Post_Information.isFestival", "==", true), limit(9)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        setpostData(data)

                        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                        setpostData_last(lastVisible)
                        setIsLoading(true);
                    })
            } else {
                if (sep_page[Page_Num - 1]) {
                    setIsLoading(false);
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.month", "==", Month), where("Post_Information.location", "==", location), where("Post_Information.isFestival", "==", true), startAfter(sep_page[Page_Num - 1]), limit(9)))
                        .then((querySnapshot) => {
                            const data = querySnapshot.docs.map((doc) => doc.data())
                            setpostData(data)

                            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                            if (lastVisible) {
                                setpostData_last(lastVisible)
                            } else {
                                // setPage_Num(Page_Num - 1)
                            }
                            setIsLoading(true);
                        })
                }
            }
        } else {
            if (Page_Num === 0) {
                setIsLoading(false);
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.cname", "!=", null), where("Post_Information.isFestival", "==", true), orderBy("Post_Information.cname", "desc"), orderBy("Post_Information.date", "desc"), limit(9)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        setpostData(data)

                        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                        setpostData_last(lastVisible)
                        setIsLoading(true);
                    })
            } else {
                if (sep_page[Page_Num - 1]) {
                    setIsLoading(false);
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.cname", "!=", null), where("Post_Information.isFestival", "==", true), orderBy("Post_Information.cname", "desc"), orderBy("Post_Information.date", "desc"), startAfter(sep_page[Page_Num - 1]), limit(9)))
                        .then((querySnapshot) => {
                            const data = querySnapshot.docs.map((doc) => doc.data())
                            setpostData(data)

                            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                            if (lastVisible) {
                                setpostData_last(lastVisible)
                            } else {
                                // setPage_Num(Page_Num - 1)
                            }
                            setIsLoading(true);
                        })
                }
            }
        }
    }, [Month, location, click])

    return (
        <div id="Festival">
            <Nav />
            <div className='festival'>
                <div className='welcomeBoard'><h1>Festival</h1></div>
                <div className='festival_grid'>
                    <div className='festival_filter'>
                        <div className='festival_filter_month'>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value=""
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === ""} />
                                <span className="checkmark"></span>
                                Default
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="12"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "12"} />
                                <span className="checkmark"></span>
                                December
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="11"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "11"} />
                                <span className="checkmark"></span>
                                November
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="10"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "10"} />
                                <span className="checkmark"></span>
                                October
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="09"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "09"} />
                                <span className="checkmark"></span>
                                September
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="08"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "08"} />
                                <span className="checkmark"></span>
                                August
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="07"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "07"} />
                                <span className="checkmark"></span>
                                July
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="06"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "06"} />
                                <span className="checkmark"></span>
                                June
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="05"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "05"} />
                                <span className="checkmark"></span>
                                May
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="04"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "04"} />
                                <span className="checkmark"></span>
                                April
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="03"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "03"} />
                                <span className="checkmark"></span>
                                March
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="02"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "02"} />
                                <span className="checkmark"></span>
                                February
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation"
                                    value="01"
                                    onChange={(e) => handleInputChange(e)}
                                    checked={Month === "01"} />
                                <span className="checkmark"></span>
                                January
                            </label>
                        </div>

                        <div className='festival_filter_location'>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation2"
                                    value=""
                                    onChange={(e) => handleInputChange2(e)}
                                    checked={location === ""} />
                                <span className="checkmark"></span>
                                Default
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation2"
                                    value="China"
                                    onChange={(e) => handleInputChange2(e)}
                                    checked={location === "China"} />
                                <span className="checkmark"></span>
                                China
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation2"
                                    value="England"
                                    onChange={(e) => handleInputChange2(e)}
                                    checked={location === "England"} />
                                <span className="checkmark"></span>
                                England
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation2"
                                    value="Japan"
                                    onChange={(e) => handleInputChange2(e)}
                                    checked={location === "Japan"} />
                                <span className="checkmark"></span>
                                Japan
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation2"
                                    value="Korea"
                                    onChange={(e) => handleInputChange2(e)}
                                    checked={location === "Korea"} />
                                <span className="checkmark"></span>
                                Korea
                            </label>
                            <label className="festival_filter_option" >
                                <input
                                    type="radio"
                                    name="operation2"
                                    value="US"
                                    onChange={(e) => handleInputChange2(e)}
                                    checked={location === "US"} />
                                <span className="checkmark"></span>
                                US
                            </label>
                        </div>
                    </div>
                    <div className='festival_post'>
                        <h2 style={{marginLeft: '22.5%'}}>Discover Your Festival Passion – Dive Deep to Explore!</h2>
                        <RenderCard postData={postData} />
                    </div>
                    <div className='changePage' >
                        <div className='switchPage' onClick={last_page}>&lt; Last Page</div>
                        <div className='switchPage' style={{ animation: "none" }}>{Page_Num + 1}/ {totalPage_num > 0 ? totalPage_num: 0}</div>
                        <div className='switchPage' onClick={next_page}>Next Page &gt;</div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}