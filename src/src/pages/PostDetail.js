import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { cloudStore } from '../../firebase';

export function PostDetail() {
    let location_test = localStorage.getItem("location") ? localStorage.getItem("location") : "China"
    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const goBack = () => {
        window.history.back()
        topFunction()
    }

    const params = useParams();
    const rawNameString = params.post;
    let nameString = (rawNameString).replace('%20', " ").replace('@', "%40");
    let postID = nameString.split("/")[nameString.split("/").length - 1];

    const [postData, setpostData] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "postData"), where("Post_Information.postID", "==", postID)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setpostData(data)
            })
    }, []);

    const [img, setimg] = useState("")
    const [day, setday] = useState("")
    const [month, setmonth] = useState("")
    const [year, setyear] = useState("")
    const [location, setlocation] = useState("")
    const [cname, setcname] = useState("")
    const [author, setauthor] = useState("")
    const [intro, setintro] = useState("")
    const [type, settype] = useState("")

    useEffect(() => {
        let currentPage = document.querySelectorAll(".Nav1 ul a li")
        if (type !== "Festival") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[1].classList.add("dashed_decoration");
        }
        if (type === "Festival") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[2].classList.add("dashed_decoration");
        }
    })

    useEffect(() => {
        if (postData.length > 0) {
            setimg(postData[0].Post_Information.pic)
            setday(postData[0].Post_Information.day)
            setmonth(postData[0].Post_Information.month)
            setyear(postData[0].Post_Information.year)
            setlocation(postData[0].Post_Information.location)
            setcname(postData[0].Post_Information.cname)
            setauthor(postData[0].Post_Information.author)
            setintro(postData[0].Post_Information.intro)
            settype(postData[0].Post_Information.type)
        }
    }, [postData])

    let loginUser = localStorage.getItem("loginUser")
    const navigate = useNavigate();
    const seeAuthor = (e) => {
        let value = e.target.dataset.value

        if (loginUser !== null) {
            const newUrl = `/otherUserAccount/${value}`;
            navigate(newUrl);
        } else {
            const newUrl = `/signin`;
            navigate(newUrl);
        }

    }

    const formatDate = () => {
        switch (location_test) {
            case 'US' || 'England':
                return `${month} / ${day} / ${year}`;
            default:
                return `${year} / ${month} / ${day}`;
        }
    }

    return (
        <div id="PostDetail">
            <Nav />
            <div className='back' onClick={goBack}>&lt; back</div>
            <div className='postDetail'>
                <div className='postDetail_container'>
                    <div className='postDetail_img'>
                        <img
                            alt="post img"
                            src={img}
                        />
                    </div>
                    <div className='postDetail_grid'>
                        <div className='postDetail_title'><span title='Name'>{cname}</span></div>

                        <div className='postDetail_basicInfo'>
                            <p>Date: <br />
                                {year.length === 0 && month.length === 0 && day.length === 0 ?
                                    <>- No Date Record
                                    </> : <span>- {formatDate()}</span>
                                }
                                <br />
                                - In {location_test} time Zone
                            </p>
                            <p>Location: {location}</p>
                            <p>Type: {type}</p>
                        </div>

                        <div className='postDetail_intro'>
                            <h1 style={{ fontSize: "30px" }}>Introduction</h1>
                            <p title='Introduction'>{intro}</p>
                        </div>
                    </div>

                    <div data-value={author} onClick={(e) => seeAuthor(e)} className="seeAuthor">
                        <div className='word'>View Author</div>
                        <div className='circle_container'>
                            <div className='circle' ></div>
                            <div className='circle' ></div>
                            <div className='circle' ></div>
                            <div className='circle' ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}