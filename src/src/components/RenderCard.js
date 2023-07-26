import { cloudStore } from '../../firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'; //import React Component
import { NavLink } from 'react-router-dom';

export function RenderCard(props) {
    let loginUser = localStorage.getItem("loginUser")
    const [click, setclick] = useState(1)

    const [userData, setuserData] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.userID", "==", loginUser)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setuserData(data)
            })
    }, [click]);

    const [Fav, setFav] = useState([])
    useEffect(() => {
        if (userData.length > 0) {
            setFav(userData[0].Fav)
        }
    }, [userData, click])

    const makeFav = async (e) => {
        let { value } = e.target.dataset
        setclick(click + 1)
        if (userData.length === 0) {
            window.location.href = "/signin"
        } else {
            if (!Fav.includes(value)) {
                const docData_Fav = {
                    "Fav": arrayUnion(value)
                }
                updateDoc(doc(cloudStore, "userData", loginUser), docData_Fav)
            } else {
                const docData_Fav = {
                    "Fav": arrayRemove(value)
                }
                updateDoc(doc(cloudStore, "userData", loginUser), docData_Fav)
            }
        }
    }

    let newEachCard = null
    if (props.postData.length > 0) {
        newEachCard = props.postData.map((content) => {
            let pic = content.Post_Information.pic
            let name = content.Post_Information.cname
            let postID = content.Post_Information.postID

            let colorClass = "dislike"
            if (Fav.includes(postID)) {
                colorClass = "like"
            }

            return (
                <div className='post_each' key={postID}>
                    <NavLink to={`/postDetail/${postID}`} >
                        <img
                            src={pic}
                            alt='post.img'
                        />
                        <p>{name}</p>
                    </NavLink>
                    <span className={`material-icons favButton ${colorClass}`} data-value={postID} onClick={(e) => makeFav(e)}>favorite</span>
                </div >
            )
        })
    }

    return (
        <div className="posts">
            {
                props.postData.length !== 0 ?
                    <>{newEachCard}
                    </> :
                    <div className='noPostAlert' style={{ gridRow: "1 /span 3", gridColumn: "1 /span 3", fontSize: "40px" }}>
                        No Post Here
                    </div>
            }

        </div>
    );
}