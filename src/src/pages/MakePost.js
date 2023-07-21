import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { storage, cloudStore } from '../../firebase';
import { doc, setDoc, collection, query, where, getDocs, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function MakePost() {
    const [cname, setcname] = useState("")
    const [year, setyear] = useState("Every Year")
    const [month, setmonth] = useState("01")
    const [checkday, setcheckday] = useState(false)
    const [checkdate, setcheckdate] = useState(true)
    const [day, setday] = useState("")
    const [location, setlocation] = useState("China")
    const [type, settype] = useState("Festival")
    const [type2, settype2] = useState("")
    const [format, setformat] = useState("")
    const [intro, setintro] = useState("")
    const imageRef = useRef("")
    const other = useRef("")
    const metadata = {
        contentType: "image/png"
    };

    const [typeData, settypeData] = useState([])
    useEffect(() => {
        getDocs(query(collection(cloudStore, "typeData"), where("typeData", "!=", null)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                settypeData(data)
            })
    }, []);

    const [similarity, setsimilarity] = useState([])
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
            settype(value.trim())
            settype2("")
        }
        if (id === "intro") {
            setintro(value)
        }
        if (id === "otherCate") {
            let value2 = value.toLowerCase();
            setformat(value2)
            settype2(value)
            settype("")

            let array = []
            if (typeData[0]) {
                typeData[0].typeData.map((item) => {
                    const score = 1 - (LevenshteinDistance(item.toLowerCase().trim(), value.toLowerCase().trim()) / Math.max(item.length, 1));
                    if (score > 0.25) {
                        let object = {
                            score: score,
                            word_database: item,
                            word_enter: value,
                        }
                        if (object.score > 0) {
                            array.push(object)
                        }
                    }
                    return null; // add return statement
                });
            }

            setsimilarity(array)
        }
    }

    // For auto complete
    const [autoCompleteDivs, setAutoCompleteDivs] = useState([]);
    useEffect(() => {
        if (type2.length > 0) {
            const addDiv = document.querySelector('.addDivs');
            if (similarity.length > 0) {
                addDiv.style.display = "block";
                const autoComplete = similarity.slice(0, 5).map((content) => {
                    let typeName = content.word_database;
                    return (
                        <li className='addDiv' key={typeName} data-value={typeName} onClick={(e) => fillIn(e)}>
                            {typeName}
                        </li>
                    );
                });
                setAutoCompleteDivs(autoComplete);
            } else {
                addDiv.style.display = "none";
                setAutoCompleteDivs([]);
            }
        }

    }, [type2, similarity]);

    const fillIn = (e) => {
        let value = e.target.dataset.value
        settype2(value)
    }

    const check_date = () => {
        if (!checkdate) {
            setcheckdate(true)
        } else {
            setcheckdate(false)
            setyear("")
            setday("")
            setmonth("")
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

    const submit = async (e) => {
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
            && day.trim().length > 0 && location.trim().length > 0 && check_type.trim().length > 0 && intro.trim().length > 0
            || (checkdate === false && image.value.length !== 0 && cname.trim().length > 0
                && location.trim().length > 0 && check_type.trim().length > 0 && intro.trim().length > 0)) {
            if (cname.match("%20") || cname.match("&")) {
                text = document.createTextNode("String '&' and '%20' are not allowed");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else if (checkdate === true && year !== "Every Year" && !isValidDate(parseInt(year), parseInt(month), parseInt(day))) {
                text = document.createTextNode("Invaild day");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else if (check_type.includes(",") || check_type.includes("，")) {
                text = document.createTextNode("One type only");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else if (type2.toLowerCase().trim() === "festival") {
                text = document.createTextNode("You cannot write this type here");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else {
                e.target.style.display = "none"

                let loginUser = localStorage.getItem("loginUser")
                let postID = getRandomInt(1000, 9999) + "&" + cname + "&" + loginUser;
                const storageRef = ref(storage, "Post Image/" + postID);

                text = document.createTextNode("Wait for Processing. Do not Reflesh the page!");
                tips.appendChild(text)
                tips.className = "show";

                let checkFestival = false
                if (check_type == "Festival") {
                    checkFestival = true
                }

                uploadBytesResumable(storageRef, image.files[0], metadata).then(() => { //Store img
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        const docData = {
                            "Post_Information": {
                                cname: cname,
                                year: year,
                                month: month,
                                day: day,
                                location: location,
                                type: check_type.trim(),
                                intro: intro,
                                postID: postID,
                                date: new Date(),
                                pic: downloadURL,
                                author: loginUser,
                                isFestival: checkFestival,
                                format: format
                            }
                        }

                        const typeData = await getDocs(query(collection(cloudStore, "typeData"), where("typeData", "!=", null)));
                        const typeData_array = typeData.docs.map(doc => doc.data()); //Change promise to array
                        if (typeData_array.length === 0) {
                            const docData_type = {
                                "typeData": [check_type]
                            }
                            setDoc(doc(cloudStore, "typeData", "typeData"), docData_type)
                        } else {
                            if (typeData_array[0].typeData.filter((item) => item.toLowerCase().trim() == check_type.toLowerCase().trim()).length === 0) {
                                typeData_array[0].typeData.push(check_type.trim())
                                const docData_type = {
                                    "typeData": typeData_array[0].typeData
                                }
                                updateDoc(doc(cloudStore, "typeData", "typeData"), docData_type)
                            }
                        }

                        const nameData = await getDocs(query(collection(cloudStore, "nameData"), where("Added_Culture.Cultures", "!=", null)));
                        const nameData_array = nameData.docs.map(doc => doc.data()); //Change promise to array
                        if (nameData_array.length === 0) {
                            const docData_name = {
                                "Added_Culture": {
                                    "Cultures": [
                                        {
                                            cname: cname,
                                            postID: postID
                                        }
                                    ]
                                }
                            }
                            setDoc(doc(cloudStore, "nameData", "nameData"), docData_name)
                        } else {
                            const newCulture = {
                                cname: cname,
                                postID: postID
                            };
                            const docData_name = {
                                "Added_Culture.Cultures": arrayUnion(newCulture)
                            }
                            updateDoc(doc(cloudStore, "nameData", "nameData"), docData_name)
                        }

                        const docData_postNum = {
                            "PostNum": increment(1),
                        }
                        updateDoc(doc(cloudStore, "userData", loginUser), docData_postNum)

                        setDoc(doc(cloudStore, "postData", postID), docData).then(() => {
                            tips.className = tips.className.replace("show", "disappear");
                            tips.style.backgroundColor = "#54b37b"
                            tips.innerHTML = '';
                            text = document.createTextNode("Finished Processing");
                            tips.appendChild(text)
                            setTimeout(() => {
                                tips.className = "show";
                            }, 100);
                            setTimeout(() => {
                                tips.className = tips.className.replace("show", "disappear");
                            }, 2000);
                            window.location.href = "/account"
                            topFunction()
                        })
                    })
                });
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

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const goBack = () => {
        window.history.back()
        topFunction()
    }

    return (
        <div id="MakePost">
            <Nav />
            <div className='back' onClick={goBack}>&lt; back</div>
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
                    </div>
                    <div className='showPic_content'>
                        <div className='showPic'></div>
                    </div>
                    <label htmlFor="cname">Culture Name: </label>
                    <input
                        type="text"
                        id="cname"
                        name="cname"
                        // placeholder="Write your Last Name"
                        onChange={(e) => handleInputChange(e)}
                        value={cname}
                        style={{ width: "80%" }}
                    />
                    <hr
                        style={{ marginBottom: "30px" }}
                    />

                    <div className='date'>
                        {checkdate === true ?
                            <>
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
                            </> : null
                        }
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
                            <div className="accept_box">
                                <label><input id="checkBox" onClick={check_date} className="accept_button" type="checkbox" />
                                    Not sure the date?
                                </label>
                            </div>
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
                            <ol className='addDivs'>
                                <p style={{ fontSize: "20px", fontWeight: "bolder" }}>What we have: (Click to choose)</p>
                                {autoCompleteDivs}
                            </ol>
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
                    {/* <hr /> */}

                    <div className='decorate_signin' onClick={(e) => submit(e)} style={{ marginBottom: "40px" }}>Submit</div>
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
    var date = new Date(year, month - 1, day);
    if ((date.getFullYear() === year || year === "Every Year") && date.getMonth() + 1 === month && date.getDate() === day) {
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