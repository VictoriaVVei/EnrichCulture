import React, { useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { storage, cloudStore } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs, updateDoc, increment } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function MakePost() {
    const [cname, setcname] = useState("")
    const [year, setyear] = useState("Every Year")
    const [month, setmonth] = useState("01")
    const [checkday, setcheckday] = useState(false)
    const [day, setday] = useState("")
    const [location, setlocation] = useState("China")
    const [type, settype] = useState("Festival")
    const [type2, settype2] = useState("")
    const [intro, setintro] = useState("")
    const imageRef = useRef("")
    const other = useRef("")
    const metadata = {
        contentType: "image/png"
    };

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
                            let showPic = document.querySelector(".showPic")
                            const img = document.createElement("img");
                            img.classList.add("resize");
                            img.src = downloadURL;
                            img.id = image.files[0].name;
                            showPic.after(img);
                            setTimeout(() => {
                                tips.className = tips.className.replace("show", "disappear");
                            }, 2000);
                        });
                    }
                );
            }
        }
        if (id === "cname") {
            setcname(value)
        }
        if (id === "year") {
            setyear(value)
        }
        if (id === "month") {
            setmonth(value)
        }
        if (id === "day") {
            setday(value)
        }
        if (id === "location") {
            setlocation(value)
        }
        if (id === "type") {
            value = value.toLowerCase();
            value = value.charAt(0).toUpperCase() + value.slice(1);
            settype(value)
            settype2("")
        }
        if (id === "intro") {
            setintro(value)
        }
        if (id === "otherCate") {
            settype2(value)
        }
    }

    const check_year = () => {
        if (!checkday) {
            setcheckday(true)
        } else {
            setcheckday(false)
            setyear("Every Year")
        }
    }

    const submit = async () => {
        const image = document.querySelector(".uploadImg");
        let tips = document.getElementById("snackbar");
        tips.innerHTML = '';
        let text = "";

        let check_type = ""
        if (type.trim().length > 0) {
            check_type = type
        } else {
            check_type = type2
        }

        if (image.value.length !== 0 && cname.trim().length > 0 && year.trim().length > 0 && month.trim().length > 0
            && day.trim().length > 0 && location.trim().length > 0 && check_type.trim().length > 0 && intro.trim().length > 0) {
            if (year !== "Every Year" && !isValidDate(parseInt(year), parseInt(month), parseInt(day))) {
                text = document.createTextNode("Invaild day");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else {
                let loginUser = localStorage.getItem("loginUser")
                let postID = getRandomInt(1000, 9999) + ":&:" + cname + ":&:" + loginUser;
                const storageRef = ref(storage, "Post Image/" + postID);

                uploadBytesResumable(storageRef, image.files[0], metadata).then(() => { //Store img
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        const docData = {
                            "Post_Information": {
                                cname: cname,
                                year: year,
                                month: month,
                                day: day,
                                location: location,
                                type: check_type,
                                intro: intro,
                                postID: postID,
                                date: new Date(),
                                pic: downloadURL,
                                author: loginUser
                            }
                        }

                        const typeData = await getDocs(query(collection(cloudStore, "typeData"), where("typeData", "!=", null))); //Check email exsit
                        const typeData_array = typeData.docs.map(doc => doc.data()); //Change promise to array
                        if (typeData_array.length === 0) {
                            const docData_type = {
                                "typeData": [check_type]
                            }
                            setDoc(doc(cloudStore, "typeData", "typeData"), docData_type)
                        } else {
                            if (typeData_array[0].typeData.filter((item) => item.toLowerCase() == check_type.toLowerCase()).length === 0) {
                                typeData_array[0].typeData.push(check_type)
                                const docData_type = {
                                    "typeData": typeData_array[0].typeData
                                }
                                updateDoc(doc(cloudStore, "typeData", "typeData"), docData_type)
                            }
                        }

                        const docData_postNum = {
                            "PostNum": increment(1),
                        }
                        updateDoc(doc(cloudStore, "userData", loginUser), docData_postNum)

                        setDoc(doc(cloudStore, "postData", postID), docData).then(() => {
                            text = document.createTextNode("Finished Processing");
                            tips.appendChild(text)
                            tips.className = "show";
                            setTimeout(() => {
                                tips.className = tips.className.replace("show", "disappear");
                            }, 2000);
                            window.location.href = "/account"
                        })
                    })
                });


                text = document.createTextNode("Wait for Processing. Do not Reflesh the page!");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            }
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
        <div id="MakePost">
            <Nav />
            <div className='makePost'>
                <form>
                    <div className="photo">
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
                        <div className='showPic'></div>
                    </div>
                    <label htmlFor="cname">Name: </label>
                    <input
                        type="text"
                        id="cname"
                        name="cname"
                        // placeholder="Write your Last Name"
                        onChange={(e) => handleInputChange(e)}
                        value={cname}
                    />
                    <hr
                        style={{ marginBottom: "30px" }}
                    />

                    <div className='date'>
                        <div className="accept_box">
                            <label><input id="checkBox" onClick={check_year} className="accept_button" type="checkbox" />
                                Have a Specific year?
                            </label>
                        </div>
                        {checkday === true ?
                            <>
                                <label htmlFor="year">Year: </label>
                                <input
                                    type="text"
                                    id="year"
                                    name="year"
                                    // placeholder="Write your Last Name"
                                    onChange={(e) => handleInputChange(e)}
                                    value={year}
                                    style={{ outline: "auto", border: "auto", marginRight: "20px" }}
                                />
                            </> : null
                        }
                        <label htmlFor="month">Month: </label>
                        <select id="month" onChange={(e) => handleInputChange(e)} style={{ marginRight: "20px" }}>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <label htmlFor="day">Day: </label>
                        <input
                            type="number"
                            id="day"
                            name="day"
                            // placeholder="Write your Last Name"
                            onChange={(e) => handleInputChange(e)}
                            value={day}
                            style={{ outline: "auto", border: "auto", marginRight: "20px" }}
                        />
                        <br />
                        <label htmlFor="location">Location: </label>
                        <select id="location" onChange={(e) => handleInputChange(e)} style={{ marginRight: "20px" }}>
                            <option value="China">China</option>
                            <option value="England">England</option>
                            <option value="Japan">Japan</option>
                            <option value="Korea">Korea</option>
                            <option value="US">US</option>
                        </select>
                        <label htmlFor="type">Type: </label>
                        <select id="type" onChange={(e) => handleInputChange(e)} style={{ marginBottom: "20px" }}>
                            <option value="Festival">Festival</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                    {type === "" ?
                        <>
                            <div
                                ref={other}>
                                <label htmlFor="otherCate">Enter type:</label>
                                <input
                                    type="text"
                                    id="otherCate"
                                    name="otherCate"
                                    placeholder="One type only"
                                    onChange={(e) => handleInputChange(e)}
                                    value={type2}
                                />
                            </div>
                            <hr />
                        </> : null
                    }
                    <br />
                    <label htmlFor="intro">Introduction: </label>
                    <textarea
                        type="text"
                        id="intro"
                        name="intro"
                        // placeholder="Write your Last Name"
                        onChange={(e) => handleInputChange(e)}
                        value={intro}
                    />
                    <hr />

                    <div className='decorate_signin' onClick={submit}>Submit</div>
                </form>
                <div id="snackbar"></div>
            </div>
        </div >
    );
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function isValidDate(year, month, day) {
    var d = new Date(year, month - 1, day);
    if ((d.getFullYear() === year || year === "EY") && d.getMonth() + 1 === month && d.getDate() === day) {
        return true;
    } else {
        return false;
    }
}

// similarity score calculation function
function LevenshteinDistance(s, t) {
    const m = s.length;
    const n = t.length;
    const d = [];

    for (let i = 0; i <= m; i++) {
        d[i] = [i];
    }

    for (let j = 0; j <= n; j++) {
        d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (s[i - 1] === t[j - 1]) {
                d[i][j] = d[i - 1][j - 1];
            } else {
                d[i][j] = Math.min(
                    d[i - 1][j] + 1, // deletion
                    d[i][j - 1] + 1, // insertion
                    d[i - 1][j - 1] + 1 // substitution
                );
            }
        }
    }
    return d[m][n];
}