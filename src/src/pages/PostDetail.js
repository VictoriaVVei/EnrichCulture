import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { cloudStore } from '../../firebase';

export function PostDetail() {
    let location_test = localStorage.getItem("location") !== null ? localStorage.getItem("location") : "China"

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
    let nameString = (rawNameString).replace('%20', " ");
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
    const [timeInterval, settimeInterval] = useState("")
    const timeZones = {
        'China': { zone: 'Asia/Shanghai' },
        'England': { zone: 'Europe/London' },
        'Japan': { zone: 'Asia/Tokyo' },
        'Korea': { zone: 'Asia/Seoul' },
        'US': { zone: 'America/New_York' }
    };

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

    const seeAuthor = (e) => {
        let value = e.target.dataset.value
        window.location.href = "/otheruser/" + { value }
    }

    const convertDate = (location) => {
        let timeZone = timeZones[location].zone;
        let userDate = moment(`${year}-${month}-${day}`).tz(timeZone);
        settimeInterval(timeZones[location].zone.split("/")[1])

        switch (location) {
            case 'US' || 'England':
                setmonth(userDate.format('MM'));
                setday(userDate.format('DD'));
                break;
            default:
                setmonth(userDate.format('MM'));
                setday(userDate.format('DD'));
                break;
        }

        if (year !== "Every Year") {
            setyear(userDate.format('YYYY'));
        }
    }


    useEffect(() => {
        if (year && month && day) {
            convertDate(location_test);
        }
    }, [location_test, day, month, year]);

    const formatDate = () => {
        switch (location) {
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
                    <div className='postDetail_content'>
                        <p>{formatDate()} <br />(in {timeInterval} time zone)</p>
                        <p><span title='Site'>#{location}</span>, <span title='Name'>{cname}</span> <span title='Type'>({type})</span></p>
                        <p style={{ marginBottom: "80px" }} title='Introduction'>{intro}</p>
                        <div data-value={author} onClick={(e) => seeAuthor(e)} className="seeAuthor">View Owner</div>
                    </div>
                </div>
            </div>
        </div>
    );
}