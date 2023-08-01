import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { RenderCard } from '../components/RenderCard';
import { cloudStore } from '../../firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter, updateDoc, doc, arrayUnion, arrayRemove, setDoc, serverTimestamp, getDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router';
import { v4 as uuid } from "uuid"

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

    const [userData2, setuserData2] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.userID", "==", loginUser)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setuserData2(data)
            })
    }, []);

    const [img, setimg] = useState("")
    const [name, setname] = useState("")
    const [bio, setbio] = useState("")
    const [location, setlocation] = useState("")
    const [post_num, setpost_num] = useState("")
    const [followers_num, setfollowers_num] = useState("")
    const [following_num, setfollowing] = useState("")
    const [email, setemail] = useState("")
    const [ifPrivate, setifPrivate] = useState("")

    const [img2, setimg2] = useState("")
    const [name2, setname2] = useState("")

    useEffect(() => {
        if (userData2.length > 0) {
            setimg2(userData2[0].Personal_Information.img.length > 0 ? userData2[0].Personal_Information.img : "https://firebasestorage.googleapis.com/v0/b/enrichculture-4cc43.appspot.com/o/Default%2Ftest.png?alt=media&token=5ef4adc4-ab00-4715-b5ff-8aaa0b4dbdef")
            setname2(userData2[0].Personal_Information.fname + " " + userData2[0].Personal_Information.lname)
        }
    }, [userData2])

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
                setifFollow(true)
            } else {
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

        let div2 = document.querySelector(".contact")
        setBoxPositionX(parseInt(window.getComputedStyle(div2).getPropertyValue("left").split("px")[0]))
        setBoxPositionY(parseInt(window.getComputedStyle(div2).getPropertyValue("top").split("px")[0]))
    }

    const mouseMove = (e) => {
        e.preventDefault();
        if (isDragging === true) {
            let div2 = document.querySelector(".contact")
            let distanceX = e.clientX - mousedownPositionX;
            let distanceY = e.clientY - mousedownPositionY;
            div2.style.left = (boxPositionX + distanceX) + "px";
            div2.style.top = (boxPositionY + distanceY) + "px";
        }
    }
    const mouseUp = () => {
        setIsDragging(false)
    }

    // 解决刷新太慢
    useEffect(() => {
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        return () => {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [isDragging])

    // chat
    let chatID = loginUser.length > userID.length ? loginUser.split("&")[0] + loginUser.split("&")[1] + loginUser.split("&")[2] + "&" + userID.split("&")[0] + userID.split("&")[1] + userID.split("&")[2] : userID.split("&")[0] + userID.split("&")[1] + userID.split("&")[2] + "&" + loginUser.split("&")[0] + loginUser.split("&")[1] + loginUser.split("&")[2]

    const [ifChat, setifChat] = useState(false)
    const chatBox = async () => {
        if (ifChat) {
            setifChat(false)
        } else {
            setifChat(true)
        }

        const checkChat = await getDoc(doc(cloudStore, "chatData", chatID));

        if (!checkChat.exists()) {
            await setDoc(doc(cloudStore, "chatData", chatID), { messages: [] })

            await updateDoc(doc(cloudStore, "userChatData", loginUser), {
                [chatID + ".userInfo"]: {
                    id: userID,
                    displayName: name,
                    photoURL: img
                },
                [chatID + ".date"]: serverTimestamp()
            })

            await updateDoc(doc(cloudStore, "userChatData", userID), {
                [chatID + ".userInfo"]: {
                    id: loginUser,
                    displayName: name2,
                    photoURL: img2
                },
                [chatID + ".date"]: serverTimestamp()
            })
        }
    }

    const [messages, setmessages] = useState([])
    useEffect(() => {
        const unSub = onSnapshot(doc(cloudStore, "chatData", chatID), (doc) => {
            if (doc.exists()) {
                setmessages(doc.data().messages)
            }
        });

        return () => {
            unSub()
        }
    }, [ifChat])

    let messages_ref = null
    if (messages.length > 0) {
        let messages_array = messages.map((item) => {
            return (
                <div className={`message ${item.senderID === loginUser ? "owner" : "otherUser"}`} key={item.id}>
                    {item.senderID === loginUser ?
                        <>
                            <div className='ownerChat'>
                                <div className='chatInfo' style={{ marginRight: "15px" }}>
                                    <p>{item.chat}</p>
                                </div>
                                <img
                                    alt='ava'
                                    src={item.senderID === loginUser ? img2 : img} />
                            </div>
                        </> :
                        <div className='ownerChat'>
                            <img
                                alt='ava'
                                src={item.senderID === loginUser ? img2 : img}
                                style={{ marginRight: "15px" }} />
                            <div className='chatInfo'>
                                <p>{item.chat}</p>
                            </div>
                        </div>
                    }
                </div>
            )
        })
        messages_ref = messages_array
    }

    useEffect(() => {
        let div = document.querySelector(".contact")
        if (ifChat) {
            div.style.visibility = "visible"
            div.style.opacity = "1"
        } else {
            div.style.visibility = "hidden"
            div.style.opacity = "0"
        }
    }, [ifChat])

    const [chat, setchat] = useState("")
    const handleInputChange = (e) => {
        let { value } = e.target
        setchat(value)
    }

    const submit = async () => {
        await updateDoc(doc(cloudStore, "chatData", chatID), {
            messages: arrayUnion(
                {
                    id: uuid(),
                    chat,
                    senderID: loginUser,
                    Date: Timestamp.now()
                }
            )
        })
        setchat("")
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

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
                        {
                            loginUser !== null ?
                                <><div className='make' onClick={chatBox}>Contact</div>
                                </> : null
                        }
                        <div className='make' title={email} style={{ cursor: "auto" }}>E-mail</div>
                    </div>

                    <div className='contact'>
                        <div className='moving2' onMouseDown={(e) => { mouseDown(e) }}><span className='material-symbols-outlined contact_close' onClick={chatBox}>close</span></div>
                        <div className='contact_content'>
                            <div className='contactBox'>
                                {messages_ref}
                            </div>
                            <form>
                                <label htmlFor="chat"></label>
                                <textarea
                                    type="text"
                                    id="chat"
                                    name="chat"
                                    onChange={(e) => handleInputChange(e)}
                                    value={chat}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                />
                            </form>
                        </div>
                    </div>

                    <div className='info_website'>
                        <div>
                            <p><span style={{ fontWeight: "bolder" }}>{post_num}</span> posts</p>
                            <p><span style={{ fontWeight: "bolder" }}>{followers_num}</span> followers</p>
                            <p><span style={{ fontWeight: "bolder" }}>{following_num}</span> following</p>
                        </div>
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