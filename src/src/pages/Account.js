import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { RenderCard } from '../components/RenderCard';
import { cloudStore } from '../../firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter, getDoc, onSnapshot, doc } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebase';

export function Account() {
    let loginUser = localStorage.getItem("loginUser")
    const [click, setclick] = useState(1)

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
    }, [click]);

    const [img, setimg] = useState("")
    const [name, setname] = useState("")
    const [bio, setbio] = useState("")
    const [location, setlocation] = useState("")
    const [post_num, setpost_num] = useState("")
    const [followers_num, setfollowers_num] = useState("")
    const [following_num, setfollowing_num] = useState("")
    const [followers, setfollowers] = useState("")
    const [following, setfollowing] = useState("")
    const [Fav, setFav] = useState("")

    useEffect(() => {
        if (userData.length > 0) {
            setimg(userData[0].Personal_Information.img.length > 0 ? userData[0].Personal_Information.img : "https://firebasestorage.googleapis.com/v0/b/enrichculture-4cc43.appspot.com/o/Default%2Ftest.png?alt=media&token=5ef4adc4-ab00-4715-b5ff-8aaa0b4dbdef")
            setname(userData[0].Personal_Information.fname + " " + userData[0].Personal_Information.lname)
            setbio(userData[0].Personal_Information.bio.length > 0 ? userData[0].Personal_Information.bio : "")
            setlocation(userData[0].Personal_Information.location.length > 0 ? userData[0].Personal_Information.location : "")
            localStorage.setItem("location", userData[0].Personal_Information.location.length > 0 ? userData[0].Personal_Information.location : "")
            setpost_num(userData[0].PostNum)
            setfollowers_num(userData[0].Followers.length)
            setfollowing_num(userData[0].Following.length)
            setFav(userData[0].Fav)
            setfollowers(userData[0].Followers)
            setfollowing(userData[0].Following)
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
        if (loginUser !== null) {
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

    const [isLoading, setIsLoading] = useState(true);
    const next_page = () => {
        if (currentLocation === "Posts") {
            if (!isLoading) {
                return;
            }

            if (postData.length < 6) {
                return;
            }

            console.log(Page_Num + 1)
            console.log(Math.ceil(post_num / 6))

            if (Page_Num + 1 === Math.ceil(post_num / 6)) {
                return;
            }

            if (postData_last) {
                setPage_Num(Page_Num + 1)
                setclick(click + 1)
                setsep_page(prev => [...prev, postData_last])
            }
        } else {
            if (postData2.length < 6) {
                return;
            } else if (Page_Num + 1 === Math.ceil(Fav.length / 6)) {
                return;
            } else {
                setPage_Num(Page_Num + 1)
                setclick(click + 1)
            }
        }
    }

    useEffect(() => {
        if (currentLocation === "Posts") {
            if (Page_Num === 0) {
                setIsLoading(false);
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.author", "==", loginUser), orderBy("Post_Information.date", "desc"), limit(6)))
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
                    getDocs(query(collection(cloudStore, "postData"), where("Post_Information.author", "==", loginUser), orderBy("Post_Information.date", "desc"), startAfter(sep_page[Page_Num - 1]), limit(6)))
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
            let promises = [];
            for (let i = 6 * Page_Num; i < (Fav.length < 6 * (Page_Num + 1) ? Fav.length : 6 * (Page_Num + 1)); i++) {
                // console.log(Fav[i])
                // console.log(Fav.length )
                promises.push(getDocs(query(collection(cloudStore, "postData"), where("Post_Information.postID", "==", Fav[i]))));
            }

            Promise.all(promises)
                .then((snapshots) => {
                    let data_final = snapshots.map(snapshot => snapshot.docs.map(doc => doc.data())[0]);
                    setpostData2(data_final);
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        }
    }, [click])

    const [messages, setmessages] = useState([])
    useEffect(() => {
        if (loginUser !== null) {
            const unSub = onSnapshot(doc(cloudStore, "userChatData", loginUser), (doc) => {
                if (doc.exists()) {
                    setmessages(doc.data())
                }
            });

            return () => {
                unSub()
            }
        }

    }, [])

    const [ifOpen, setifOpen] = useState(false)
    const [whatHover, setwhatHover] = useState("")
    const openList = (e) => {
        let { value } = e.target.dataset

        if (ifOpen) {
            if (value !== whatHover) {
                setifOpen(true)
                setwhatHover(value)
            } else {
                setifOpen(false)
                setwhatHover("")
            }
        } else {
            setifOpen(true)
            setwhatHover(value)
        }
    }

    const [follow, setfollow] = useState("")
    useEffect(() => {
        let div = document.querySelector(".follow_name")
        if (div) {
            if (ifOpen) {
                if (whatHover === "following") {
                    setfollow(following)
                } else if (whatHover === "followers") {
                    setfollow(followers)
                } else if (whatHover === "message") {
                    let array_id = []

                    Object.keys(messages).forEach((key) => {
                        array_id.push(messages[key].userInfo.id);
                    });
                    setfollow(array_id)
                }

                div.style.visibility = "visible"
                div.style.opacity = "1"
            } else {
                div.style.visibility = "hidden"
                div.style.opacity = "0"
            }
        }
    }, [whatHover, ifOpen])

    const follow_ref = useRef()
    const [follow_array, setfollow_array] = useState([])
    useEffect(() => {
        let promises = [];
        for (let i = 0; i < follow.length; i++) {
            promises.push(getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.userID", "==", follow[i]))));
        }

        Promise.all(promises)
            .then((snapshots) => {
                let data_final = snapshots.map(snapshot => snapshot.docs.map(doc => doc.data())[0]);
                setfollow_array(data_final)
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [follow.length])


    let follow_array_ref = null

    if (follow_array.length > 0) {
        var uniqueArray = [...new Set(follow_array)];
        follow_array_ref = uniqueArray.map((item) => {
            return (
                <li key={item.Personal_Information.userID} className="follow_name_content">
                    <NavLink to={`/otherUserAccount/${item.Personal_Information.userID}`}>{item.Personal_Information.fname + " " + item.Personal_Information.lname}</NavLink>
                </li>
            )
        })
        follow_ref.current = follow_array_ref
    }

    const [isDragging, setIsDragging] = useState(false)
    const [mousedownPositionX, setX] = useState(0)
    const [mousedownPositionY, setY] = useState(0)
    const [boxPositionX, setBoxPositionX] = useState(0);
    const [boxPositionY, setBoxPositionY] = useState(0);

    const mouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true)
        setX(e.nativeEvent.clientX);
        setY(e.nativeEvent.clientY);

        let div2 = document.querySelector(".follow_name")
        setBoxPositionX(parseInt(window.getComputedStyle(div2).getPropertyValue("left").split("px")[0]))
        setBoxPositionY(parseInt(window.getComputedStyle(div2).getPropertyValue("top").split("px")[0]))
    }

    const mouseMove = (e) => {
        e.preventDefault();
        if (isDragging === true) {
            let div2 = document.querySelector(".follow_name")
            let distanceX = e.clientX - mousedownPositionX;
            let distanceY = e.clientY - mousedownPositionY;
            div2.style.left = (boxPositionX + distanceX) + "px";
            div2.style.top = (boxPositionY + distanceY) + "px";
        }
    }
    const mouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        return () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [isDragging])

    return (
        <div id="Account">
            <Nav />
            {loginUser !== null ?
                <>
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
                                <div className='make' onClick={(e) => openList(e)} data-value="message" title='Click to close and open'>Message</div>
                                <div className='make' onClick={logout}>Log Out</div>
                            </div>

                            <div className='info_website'>
                                <div className="follow_data">
                                    <p><span style={{ fontWeight: "bolder" }}>{post_num}</span> posts</p>
                                    <p className='fo_hover' onClick={(e) => openList(e)} data-value="followers" title='Click to close and open'><span data-value="followers" style={{ fontWeight: "bolder" }}>{followers_num}</span> followers</p>
                                    <p className='fo_hover' onClick={(e) => openList(e)} data-value="following" title='Click to close and open'><span data-value="following" style={{ fontWeight: "bolder" }}>{following_num}</span> following</p>
                                </div>

                                <div className='follow_name'>
                                    <div className='moving' onMouseDown={(e) => { mouseDown(e) }}>{whatHover === "followers" ? "Followers" : whatHover === "following" ? "Following" : "Message"}</div>
                                    <div className='follow_name_container'>
                                        <ol>{follow_ref.current}</ol>
                                    </div>
                                </div>
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
                                {currentLocation === "Posts" ?
                                    <>
                                        <div className='switchPage' style={{ animation: "none" }}>{Page_Num + 1}/ {post_num > 0 ? Math.ceil(post_num / 6) : 0}</div>
                                    </> :
                                    <div className='switchPage' style={{ animation: "none" }}>{Page_Num + 1}/ {Fav.length > 0 ? Math.ceil(Fav.length / 6) : 0}</div>
                                }
                                <div className='switchPage' onClick={next_page}>Next Page &gt;</div>
                            </div>
                        </div>
                    </div >
                </> :
                <div className='profile_grid' style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "80px" }}>
                    <div style={{ fontSize: "40px" }}>You should log in first</div>
                </div>
            }
        </div >
    );
}