import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { storage, cloudStore } from '../../firebase';
import { doc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function ReviseAccount() {
    let loginUser = localStorage.getItem("loginUser")

    const [pic, setpic] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [bio, setbio] = useState("")
    const [location, setlocation] = useState("")
    const imageRef = useRef("")
    const metadata = {
        contentType: "image/png"
    };

    const [data, setdata] = useState([])
    useEffect(() => {
        const image = document.querySelector(".uploadImg");
        if (fname.length === 0 && lname.length === 0 &&
            bio.length === 0 && location.length === 0 && image.value.length === 0) {
            if (data.length === 0) {
                getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.userID", "==", loginUser)))
                    .then((querySnapshot) => {
                        const data = querySnapshot.docs.map(doc => doc.data());
                        setdata(data);
                    })
            }
            if (data.length > 0) {
                setpic(data[0].Personal_Information.img.length > 0 ? data[0].Personal_Information.img : "./img/test.png")
                setfname(data[0].Personal_Information.fname)
                setlname(data[0].Personal_Information.lname)
                setbio(data[0].Personal_Information.bio)
                setlocation(data[0].Personal_Information.location.length > 0 ? data[0].Personal_Information.location : "China")
            }
        }
    })

    const handleInputChange = (e) => {
        let { id, value } = e.target
        const image = imageRef.current;

        if (id === "photo") {
            if (image.value.length > 0) {
                document.getElementsByTagName("label")[0].style.color = "black"
            }

            var divsToRemove = document.querySelectorAll(".resize");
            if (divsToRemove.length > 0) {
                for (var i = 0; i < divsToRemove.length; i++) {
                    divsToRemove[i].parentNode.removeChild(divsToRemove[i]);
                }
            }

            if (image.value.length !== 0) {
                let imgName = image.files[0].name.split(".")[0];
                const tempo = ref(storage, "Tempo/" + imgName);
                const uploadTask = uploadBytesResumable(tempo, image.files[0], metadata)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        let tips = document.getElementById("snackbar");
                        tips.innerHTML = '';
                        let text = "";

                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(progress)

                        text = document.createTextNode("Processing");
                        tips.appendChild(text)
                        tips.className = "show";
                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        let tips = document.getElementById("snackbar");
                        tips.innerHTML = '';
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            let showPic = document.querySelector(".showPic img")
                            showPic.src = downloadURL;
                            setTimeout(() => {
                                tips.className = tips.className.replace("show", "disappear");
                            }, 2000);
                        });
                    }
                );
            }
        }
        if (id === "fname") {
            setfname(value)
        }
        if (id === "lname") {
            setlname(value)
        }
        if (id === "bio") {
            setbio(value)
        }
        if (id === "location") {
            console.log(value)
            setlocation(value)
        }
    }

    const submit = async () => {
        const image = document.querySelector(".uploadImg");
        let tips = document.getElementById("snackbar");
        tips.innerHTML = '';
        let text = "";

        if (pic.length !== 0 && fname.trim().length > 0 && lname.trim().length > 0 && bio.trim().length > 0
            && location.trim().length > 0) {
            if (image.value.length === 0) {
                const docData = {
                    'Personal_Information.img': pic,
                    'Personal_Information.fname': fname,
                    'Personal_Information.lname': lname,
                    'Personal_Information.bio': bio,
                    'Personal_Information.location': location,
                }

                updateDoc(doc(cloudStore, "userData", loginUser), docData)
                    .then(() => {
                        text = document.createTextNode("Finished Processing");
                        tips.appendChild(text)
                        tips.className = "show";
                        setTimeout(() => {
                            tips.className = tips.className.replace("show", "disappear");
                        }, 2000);
                        window.location.href = "/account"
                    })
            } else {
                const storageRef = ref(storage, "User Image/" + loginUser);
                uploadBytesResumable(storageRef, image.files[0], metadata).then(() => { //Store img
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        const docData = {
                            'Personal_Information.img': downloadURL,
                            'Personal_Information.fname': fname,
                            'Personal_Information.lname': lname,
                            'Personal_Information.bio': bio,
                            'Personal_Information.location': location,
                        }

                        updateDoc(doc(cloudStore, "userData", loginUser), docData)
                            .then(() => {
                                text = document.createTextNode("Finished Processing");
                                tips.appendChild(text)
                                tips.className = "show";
                                setTimeout(() => {
                                    tips.className = tips.className.replace("show", "disappear");
                                }, 2000);
                                window.location.href = "/account"
                            })
                    })
                })
            }

            text = document.createTextNode("Wait for Processing. Do not Reflesh the page!");
            tips.appendChild(text)
            tips.className = "show";
            setTimeout(() => {
                tips.className = tips.className.replace("show", "disappear");
            }, 2000);

        } else {
            text = document.createTextNode("You should fill out all the empty blanks");
            tips.appendChild(text)
            tips.className = "show";
            setTimeout(() => {
                tips.className = tips.className.replace("show", "disappear");
            }, 2000);
        }
    }

    return (
        <div id="ReviseAccount">
            <Nav />
            <div className='reviseAccount'>
                <form>
                    <div className="photo">
                        <div className='showPic'>
                            <img
                                src={pic}
                                alt='ava.img'
                            />
                        </div>
                        <div className="button-wrap">
                            <label className="uploadbutton" htmlFor="photo">Photo </label>
                            <input
                                className="uploadImg"
                                type="file"
                                id="photo"
                                name='Photo'
                                accept="image/jpeg, image/png, image/jpg"
                                ref={imageRef}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>
                    </div>
                    <div className='basic'>
                        <label htmlFor="fname">First Name: </label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            // placeholder="Write your First Name"
                            onChange={(e) => handleInputChange(e)}
                            value={fname}
                        />
                        <hr />
                        <label htmlFor="lname">Last Name: </label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            // placeholder="Write your Last Name"
                            onChange={(e) => handleInputChange(e)}
                            value={lname}
                        />
                        <hr />
                        <label htmlFor="bio">Bio: </label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            // placeholder="Write your Last Name"
                            onChange={(e) => handleInputChange(e)}
                            value={bio}
                        />
                        <hr />
                    </div>
                    <div className='setting'>
                        <label htmlFor="location">Location: </label>
                        <select id="location" onChange={(e) => handleInputChange(e)} >
                            <option value="China">China</option>
                            <option value="England">England</option>
                            <option value="Japan">Japan</option>
                            <option value="Korea">Korea</option>
                            <option value="US">US</option>
                        </select>

                        <label htmlFor="privacy">Privacy: </label>
                        <select id="privacy" >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>

                        <label htmlFor="notification">Notification: </label>
                        <select id="notification" >
                            <option value="Accept">Accept All</option>
                            <option value="Pause">Pause All</option>
                        </select>
                    </div>

                    <div className='decorate_signin' onClick={submit}>Submit</div>
                </form>
                <div id="snackbar"></div>
            </div>
        </div >
    );
}