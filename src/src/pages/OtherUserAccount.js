import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { RenderCard } from '../components/RenderCard';
import { cloudStore } from '../../firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useParams } from 'react-router';

export function OtherUserAccount() {
    let loginUser = localStorage.getItem("loginUser")

    const params = useParams();
    const rawNameString = params.user;
    let nameString = (rawNameString).replace('%20', " ").replace('@', "%40");
    let userID = nameString.split("/")[nameString.split("/").length - 1];

    const [click2, setclick2] = useState(1)
    const [ifFollow, setifFollow] = useState(false)

    const [userData, setuserData] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.userID", "==", userID)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setuserData(data)
            })
    }, [click2]);

    const [img, setimg] = useState("")
    const [name, setname] = useState("")
    const [bio, setbio] = useState("")
    const [location, setlocation] = useState("")
    const [post_num, setpost_num] = useState("")
    const [followers_num, setfollowers_num] = useState("")
    const [following_num, setfollowing] = useState("")
    const [email, setemail] = useState("")
    const [ifPrivate, setifPrivate] = useState("")

    useEffect(() => {
        if (userData.length > 0) {
            setimg(userData[0].Personal_Information.img.length > 0 ? userData[0].Personal_Information.img : "https://firebasestorage.googleapis.com/v0/b/enrichculture-4cc43.appspot.com/o/Default%2Ftest.png?alt=media&token=5ef4adc4-ab00-4715-b5ff-8aaa0b4dbdef")
            setname(userData[0].Personal_Information.fname + " " + userData[0].Personal_Information.lname)
            setbio(userData[0].Personal_Information.bio.length > 0 ? userData[0].Personal_Information.bio : "")
            setlocation(userData[0].Personal_Information.location.length > 0 ? userData[0].Personal_Information.location : "")
            localStorage.setItem("location", userData[0].Personal_Information.location.length > 0 ? userData[0].Personal_Information.location : "")
            setpost_num(userData[0].PostNum)
            setfollowers_num(userData[0].Followers.length)
            setfollowing(userData[0].Following.length)
            setemail(userData[0].Personal_Information.email)
            setifPrivate(userData[0].Personal_Information.ifPrivate)
        }
    }, [userData, click2])

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
        if (postData.length < 6) {
            return;
        }

        if (postData_last) {
            setclick(click + 1)
            setPage_Num(Page_Num + 1)
            setsep_page(prev => [...prev, postData_last])
        }
    }

    useEffect(() => {
        if (Page_Num === 0) {
            getDocs(query(collection(cloudStore, "postData"), where("Post_Information.author", "==", userID), orderBy("Post_Information.date", "desc"), limit(6)))
                .then((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => doc.data())
                    setpostData(data)

                    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
                    setpostData_last(lastVisible)
                })
        } else {
            if (sep_page[Page_Num - 1]) {
                getDocs(query(collection(cloudStore, "postData"), where("Post_Information.author", "==", userID), orderBy("Post_Information.date", "desc"), startAfter(sep_page[Page_Num - 1]), limit(6)))
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
    }, [click])

    useEffect(() => {
        if (userData.length > 0) {
            if (userData[0].Followers.includes(loginUser)) {
                console.log(1)
                setifFollow(true)
            } else {
                console.log(2)
                setifFollow(false)
            }
        }
    })

    const follow = () => {
        setclick2(click2 + 1)
        console.log(ifFollow)
        if (!ifFollow) {
            // console.log(1)
            const docData_follower = {
                "Followers": arrayUnion(loginUser)
            }
            updateDoc(doc(cloudStore, "userData", userID), docData_follower)

            const docData_following = {
                "Following": arrayUnion(userID)
            }
            updateDoc(doc(cloudStore, "userData", loginUser), docData_following)
        } else {
            // console.log(2)
            const docData_follower = {
                "Followers": arrayRemove(loginUser)
            }
            updateDoc(doc(cloudStore, "userData", userID), docData_follower)

            const docData_following = {
                "Following": arrayRemove(userID)
            }
            updateDoc(doc(cloudStore, "userData", loginUser), docData_following)
        }
    }

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
                        <div className={`edit ${!ifFollow ? 'otherEdit' : 'otherEdit2'}`} onClick={follow}>{ifFollow ? 'Unfollow' : 'Follow'}</div>
                        <div className='make'>Contact</div>
                        <div className='make' title={email} style={{ cursor: "auto" }}>E-mail</div>
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
                            <li data-value="Posts" >Posts</li>
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
                    {loginUser && loginUser.length > 0 ?
                        <>
                            {ifPrivate === "Public" ?
                                <>
                                    {postData.length !== 0 ?
                                        <><RenderCard postData={postData} />
                                        </> : <div className='noPostAlert'>This user has no post</div>
                                    }
                                </> :
                                <div className='noPostAlert'>
                                    This is private account.
                                </div>
                            }

                        </> :
                        <div className='noPostAlert'>
                            You should log in first, before checking others' account.
                        </div>
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