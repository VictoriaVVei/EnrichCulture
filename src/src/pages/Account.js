import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { RenderCard } from '../components/RenderCard';
import { cloudStore } from '../../firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';

export function Account() {
    let loginUser = localStorage.getItem("loginUser")

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const [userData, setuserData] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.userID", "==", loginUser)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setuserData(data)
            })
    }, []);

    const [img, setimg] = useState("")
    const [name, setname] = useState("")
    const [bio, setbio] = useState("")
    const [location, setlocation] = useState("")
    const [post_num, setpost_num] = useState("")
    const [followers_num, setfollowers_num] = useState("")
    const [following_num, setfollowing] = useState("")
    const [Fav, setFav] = useState("")

    useEffect(() => {
        if (userData.length > 0) {
            setimg(userData[0].Personal_Information.img.length > 0 ? userData[0].Personal_Information.img : "./img/test.png")
            setname(userData[0].Personal_Information.fname + " " + userData[0].Personal_Information.lname)
            setbio(userData[0].Personal_Information.bio.length > 0 ? userData[0].Personal_Information.bio : "")
            setlocation(userData[0].Personal_Information.location.length > 0 ? userData[0].Personal_Information.location : "")
            localStorage.setItem("location", userData[0].Personal_Information.location.length > 0 ? userData[0].Personal_Information.location : "")
            setpost_num(userData[0].PostNum)
            setfollowers_num(userData[0].Followers.length)
            setfollowing(userData[0].Following.length)
            setFav(userData[0].Fav)
        }
    }, [userData])


    const [currentLocation, setcurrentLocation] = useState("Posts")
    const switchPost = (e) => {
        setclick(click + 1)
        let { value } = e.target.dataset
        setcurrentLocation(value)
        setPage_Num(0)
    }

    useEffect(() => {
        let currentPage = document.querySelectorAll(".post_button ul li")

        if (currentLocation === "Posts") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration2");
            })
            currentPage[0].classList.add("dashed_decoration2");
        }
        if (currentLocation === "Fav") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration2");
            })
            currentPage[1].classList.add("dashed_decoration2");
        }
    })

    const logout = async () => {
        localStorage.removeItem("loginUser")
        localStorage.removeItem("location")
        await signOut(auth).then(() => {
            window.location.href = "/signin"
        })
    }

    const [Page_Num, setPage_Num] = useState(0)
    const [click, setclick] = useState(1)
    const [sep_page, setsep_page] = useState([])
    const [postData, setpostData] = useState([])
    const [postData_last, setpostData_last] = useState(null)

    const [postData2, setpostData2] = useState([])

    const last_page = () => {
        if (Page_Num - 1 >= 0) {
            setclick(click + 1)
            setPage_Num(Page_Num - 1)
        }
    }

    const next_page = () => {
        if (currentLocation === "Posts") {
            if (postData.length < 6) {
                return;
            }

            if (postData_last) {
                setclick(click + 1)
                setPage_Num(Page_Num + 1)
                setsep_page(prev => [...prev, postData_last])
            }
        } else {
            if (postData2.length < 6) {
                return;
            } else {
                setclick(click + 1)
                setPage_Num(Page_Num + 1)
            }
        }
    }

    useEffect(() => {
        if (currentLocation === "Posts") {
            if (Page_Num === 0) {
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.author", "==", loginUser), orderBy("Post_Information.date", "desc"), limit(6)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        setpostData(data)

                        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                        setpostData_last(lastVisible)
                    })
            } else {
                if (sep_page[Page_Num - 1]) {
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.author", "==", loginUser), orderBy("Post_Information.date", "desc"), startAfter(sep_page[Page_Num - 1]), limit(6)))
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
            let data_final = []
            for (let i = 6 * Page_Num; i < (Fav.length < 6 * (Page_Num + 1) ? Fav.length : 6 * (Page_Num + 1)); i++) {
                console.log(6 * (Page_Num + 1))
                console.log(Fav[i])
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.postID", "==", Fav[i])))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map((doc) => doc.data())
                        data_final.push(data[0])
                    })
            }
            setpostData2(data_final)
        }
    }, [click])

    return (
        <div id="Account">
            <Nav />
            <div className='profile_grid'>
                <div className='info'>
                    <div className='info_basic'>
                        <img
                            src={img}
                            alt='ava.img'
                        />
                        <h3>{name}</h3>
                        <p>{bio}</p>
                        <p>{location}</p>
                        <div className='edit'><NavLink to="/reviseAccount" onClick={topFunction}>Edit Your Profile</NavLink></div>
                        <div className='make'><NavLink to="/makePost" onClick={topFunction}>Make a post</NavLink></div>
                        <div className='make' onClick={logout}>Log Out</div>
                    </div>

                    <div className='info_website'>
                        <p><span style={{ fontWeight: "bolder" }}>{post_num}</span> posts</p>
                        <p><span style={{ fontWeight: "bolder" }}>{followers_num}</span> followers</p>
                        <p><span style={{ fontWeight: "bolder" }}>{following_num}</span> following</p>
                    </div>
                </div>
                <div className='post'>
                    <div className='post_button'>
                        <ul>
                            <li data-value="Posts" onClick={(e) => switchPost(e)}>Posts</li>
                            <li data-value="Fav" onClick={(e) => switchPost(e)}>Fav</li>
                        </ul>
                    </div>
                    {/* <div className='posts'>
                        <div className='post_each'>
                            <NavLink to={"/post/" + "自由女神"}>
                                <img
                                    src={"./img/sign.jpeg"}
                                    alt='post.img'
                                />
                                <p>{"自由女神"}</p>
                            </NavLink>
                        </div>
                    </div> */}
                    {currentLocation === "Posts" ?
                        <><RenderCard postData={postData} />
                        </> : <RenderCard postData={postData2} />
                    }

                    <div className='changePage' >
                        <div className='switchPage' onClick={last_page}>&lt; Last Page</div>
                        <div className='switchPage' style={{ animation: "none" }}>{Page_Num + 1}</div>
                        <div className='switchPage' onClick={next_page}>Next Page &gt;</div>
                    </div>
                </div>
            </div>
        </div >
    );
}