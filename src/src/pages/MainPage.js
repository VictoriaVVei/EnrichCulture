import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { useNavigate } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { cloudStore } from '../../firebase';

export function MainPage() {
    let location = localStorage.getItem("location") !== null ? localStorage.getItem("location") : "China"

    const [location_recon, setlocation_recon] = useState([]);
    useEffect(() => {
        getDocs(query(collection(cloudStore, "postData"), where("Post_Information.location", "==", location), orderBy("Post_Information.date", "desc"), limit(6)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setlocation_recon(data)
            })
    }, []);

    const [location_recon_dom, setlocation_dom] = useState(null);
    useEffect(() => {
        let dom = null
        if (location_recon.length > 10) {  // should be modified later
            let type = []
            location_recon.map((item) => {
                // console.log(item);
                if (type.filter((item2) => item2.toLowerCase().trim() == item.Post_Information.type.toLowerCase().trim()).length === 0) {
                    type.push(item.Post_Information.type)
                }
            })

            let type_filter = type.filter((item) => {
                return item !== "Festival"
            })

            dom = type_filter.map((content) => {
                return (
                    <li className='eachType' key={content} data-value={content} onClick={(e) => searchType(e)}>
                        {content}
                    </li>
                );
            });
        } else {
            dom = (() => {
                return (
                    <li className=''>
                        There is no culture record from your choosen country.
                        Please Log in, Revise country or just make a new post.
                    </li>
                );
            });
        }
        setlocation_dom(dom)
    }, [location_recon]);

    const [typeList, settypeList] = useState([]);
    useEffect(() => {
        getDocs(query(collection(cloudStore, "typeData"), where("typeData", "!=", null)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                settypeList(data)
            })
    }, []);

    const [typeList_dom, settypeList_dom] = useState(null);
    useEffect(() => {
        let dom = null
        if (typeList.length > 0) {
            dom = typeList[0].typeData.filter((item) => { return item !== "Festival" }).sort((a, b) => a[0].localeCompare(b[0])).slice(0, 5).map((content) => {
                return (
                    <li className='' key={content} data-value={content} onClick={(e) => searchType(e)}>
                        {content}
                    </li>
                );
            });
        }
        settypeList_dom(dom)
    }, [typeList]);

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    const [nameData, setnameData] = useState([]);
    useEffect(() => {
        getDocs(query(collection(cloudStore, "nameData"), where("Added_Culture.Cultures", "!=", null)))
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                setnameData(data)
            })
    }, []);

    const [similarity, setsimilarity] = useState([])
    const [search, setsearch] = useState("")
    const [search_id, setsearch_id] = useState("")
    const handleInputChange = (e) => {
        let { value } = e.target
        setsearch(value)

        let array = []
        nameData[0].Added_Culture.Cultures.map((item) => {
            const score = 1 - (LevenshteinDistance(item.cname.toLowerCase().trim(), value.toLowerCase().trim()) / Math.max(item.cname.length, 1));
            if (score > 0.3) {
                let object = {
                    score: score,
                    word_database: item.cname,
                    word_enter: value,
                    id: item.postID
                }
                if (object.score > 0) {
                    array.push(object)
                }
            }
            return null; // add return statement
        });
        setsimilarity(array)
    }

    // For auto complete
    const [autoCompleteDivs, setAutoCompleteDivs] = useState([]);
    useEffect(() => {
        if (search.length > 0) {
            const addDiv = document.querySelector('.addDivs');
            if (similarity.length > 0) {
                addDiv.style.display = "block";
                const autoComplete = similarity.map((content) => {
                    let postName = content.word_database;
                    let postID = content.id
                    let author = postID.split("&")[4] + " " + postID.split("&")[3]
                    return (
                        <li className='addDiv' key={postID} data-value={postID} data-values={postName} onClick={(e) => fillIn(e)}>
                            {postName + ": " + author}
                        </li>
                    );
                });
                setAutoCompleteDivs(autoComplete);
            } else {
                addDiv.style.display = "none";
                setAutoCompleteDivs([]);
            }
        }
    }, [search, similarity]);

    useEffect(() => {
        const addDiv = document.querySelector('.addDivs');
        if (similarity.length === 0) {
            addDiv.style.display = "none";
            setAutoCompleteDivs([]);
        }
    }, [similarity])

    const fillIn = (e) => {
        let values = e.target.dataset.values
        let value = e.target.dataset.value
        setsearch(values)
        setsearch_id(value)

        const option = e.target;
        const parentDiv = option.parentNode;
        parentDiv.blur();
        let options = document.querySelectorAll(".addDiv")
        options.forEach((content) => {
            content.style.color = "black"
        })
        option.style.color = "#9687b3"
    }

    const navigate = useNavigate();
    const submit = () => {
        let tips = document.getElementById("snackbar");
        tips.innerHTML = '';
        let text = "";

        let id = nameData[0].Added_Culture.Cultures.filter((item) => {
            return item.cname.toLowerCase().trim() === search.toLowerCase().trim()
        });
        if (id.length === 0) {
            text = document.createTextNode("Nothing found");
            tips.appendChild(text)
            tips.className = "show2";
            setTimeout(() => {
                tips.className = tips.className.replace("show2", "disappear2");
            }, 2000);
        } else if (id.length > 1 && search_id.length === 0) {
            text = document.createTextNode("More than one result. Select one to go");
            tips.appendChild(text)
            tips.className = "show2";
            setTimeout(() => {
                tips.className = tips.className.replace("show2", "disappear2");
            }, 2000);
        } else {
            topFunction()
            const newUrl = `/postDetail/${search_id.length > 0 ? search_id : id[0].postID}`;
            navigate(newUrl);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            submit();
        }
    };

    const searchType = (e) => {
        topFunction()
        let value = e.target.dataset.value
        localStorage.setItem("whatSearch_type", value)
        window.location.href = "/diversity"
    }

    return (
        <div id="MainPage">
            <Nav />
            <div className='mainPage'>
                <div className='welcomeBoard'><h1>Reimagine <br />Culture</h1></div>
                <div className='explore_div'>
                    <h2 style={{ marginBottom: "40px" }}>Explore Diversity: A world of culture at your fingertips</h2> {/*flex和%的配合容易出问题，grid是制作框架的首选*/}
                    <ul className='location_recon' style={{ display: "grid", gridTemplateRows: "100px 100px", gridTemplateColumns: "auto auto auto auto auto", gap: "5px", width: "100%", margin: "auto" }}>
                        <div
                            data-value={"Fresco"} //首字母一定大写
                            onClick={(e) => searchType(e)}
                            style={{
                                backgroundImage: "url(./img/explore_diversity1.jpg)",
                                gridRow: "1 /span 2",
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                cursor: "pointer"
                            }}>
                            Fresco
                        </div>
                        <div
                            data-value={"Clothing"} //首字母一定大写
                            onClick={(e) => searchType(e)}
                            style={{
                                backgroundImage: "url(./img/explore_diversity2.jpg)",
                                gridRow: "1",
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                cursor: "pointer"
                            }}>
                            Clothing
                        </div>
                        <div
                            data-value={"Chinese painting"} //首字母一定大写
                            onClick={(e) => searchType(e)}
                            style={{
                                backgroundImage: "url(./img/explore_diversity3.jpg)",
                                gridRow: "2",
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                cursor: "pointer"
                            }}>
                            Chinese painting
                        </div>
                        <div
                            data-value={"Oil painting"} //首字母一定大写
                            onClick={(e) => searchType(e)}
                            style={{
                                backgroundImage: "url(./img/explore_diversity4.jpg)",
                                gridRow: "1",
                                gridColumn: "1/ span 2",
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                cursor: "pointer"
                            }}>
                            Oil painting
                        </div>
                        <div
                            data-value={"Sculpture"} //首字母一定大写
                            onClick={(e) => searchType(e)}
                            style={{
                                backgroundImage: "url(./img/explore_diversity5.jpg)",
                                gridRow: "2",
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                cursor: "pointer"
                            }}>
                            Sculpture
                        </div>
                        <div
                            data-value={"Ceramics"} //首字母一定大写
                            onClick={(e) => searchType(e)}
                            style={{
                                backgroundImage: "url(./img/explore_diversity6.jpg)",
                                gridRow: "2",
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                cursor: "pointer"
                            }}>
                            Ceramics
                        </div>
                        <div
                            data-value={"Western oil painting"} //首字母一定大写
                            onClick={(e) => searchType(e)}
                            style={{
                                backgroundImage: "url(./img/explore_diversity7.jpg)",
                                gridRow: "1 /span 2",
                                borderRadius: "10px",
                                backgroundSize: "cover",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white",
                                fontSize: "15px",
                                cursor: "pointer"
                            }}>
                            Western oil painting
                        </div>
                    </ul>
                </div>
                <div className='search'>
                    <div id="snackbar" style={{ top: "0" }}></div>
                    <form>
                        <h2 style={{ marginBottom: "40px" }}>Search the Cultural</h2>
                        <div className='search_area'>
                            <label htmlFor="search" className='material-symbols-outlined search_button' onClick={submit} style={{ cursor: "pointer" }}>search</label>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                onChange={(e) => handleInputChange(e)}
                                value={search}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            <ol className='addDivs' style={{ backgroundColor: "rgb(255,255,255,0.6)", marginTop: "0", borderRadius: " 0 0 7px 7px" }}>
                                <p style={{ fontSize: "20px", fontWeight: "bolder" }}>What we have: (Click to choose)</p>
                                {autoCompleteDivs}
                            </ol>
                        </div>
                        <div className='search_type' style={{ marginTop: "40px" }}>
                            <p>Popular types: </p>
                            <ul className='typeList'>
                                {typeList_dom}
                                {/* <li onClick={(e) => searchType(e)} data-value="Architecture">Architecture </li>
                                <li onClick={(e) => searchType(e)} data-value="Art">Art </li>
                                <li onClick={(e) => searchType(e)} data-value="Literature">Literature </li>
                                <li onClick={(e) => searchType(e)} data-value="Music">Music</li> */}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

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