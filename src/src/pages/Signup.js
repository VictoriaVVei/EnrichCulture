import React, { useState } from 'react'; //import React Component
import { auth, cloudStore } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Nav } from '../components/Nav';

export function Signup() {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleInputChange = (e) => {
        let { id, value } = e.target

        if (id === "fname") {
            setfname(value)
        }
        if (id === "lname") {
            setlname(value)
        }
        if (id === "email") {
            setemail(value)
        }
        if (id === "password") {
            setpassword(value)
        }
    }

    const signin = () => {
        window.location.href = "/signin"
    }

    const noDepoly = () => {
        let tips = document.getElementById("snackbar");
        tips.innerHTML = '';
        let text = "";
        text = document.createTextNode("Do not support currently");
        tips.appendChild(text)
        tips.className = "show";
        setTimeout(() => {
            tips.className = tips.className.replace("show", "disappear");
        }, 2000);
    }

    const signup = async (e) => {
        let tips = document.getElementById("snackbar");
        tips.innerHTML = '';
        let text = "";

        if (fname.trim().length !== 0 && lname.trim().length !== 0 && email.trim().length !== 0 && password.trim().length !== 0) {
            const checkEmail = await getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.email", "==", email))); //Check email exsit
            const checkEmail_array = checkEmail.docs.map(doc => doc.data()); //Change promise to array

            if (fname.match("%20") || fname.match("&") || lname.match("%20") || lname.match("&")) {
                text = document.createTextNode("String '&' and '%20' are not allowed");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else if (checkEmail_array.length !== 0) {
                text = document.createTextNode("Email existed");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else if (!validateEmail(email)) {
                text = document.createTextNode("Invalid Email Address");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else if (password.length < 6) {
                text = document.createTextNode("Enter at least 6 string for Password");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else {
                let userID = getRandomInt(1000, 9999) + "&" + lname + "&" + fname + "&" + email.replace('@', "%40");
                createUserWithEmailAndPassword(auth, email, password);
                const docData = {
                    "Personal_Information": {
                        fname: fname,
                        lname: lname,
                        email: email,
                        password: password,
                        userID: userID,
                        img: "",
                        bio: "",
                        location: ""
                    },
                    "Fav": [],
                    "PostNum": 0,
                    "Followers": [],
                    "Following": [],
                }

                e.target.style.display = "none"

                setDoc(doc(cloudStore, "userData", userID), docData)
                    .then(() => {
                        setTimeout(() => {
                            window.location.href = "/signin"
                        }, 100);
                    })
                    .catch((error) => {
                        console.error("Error setting document:", error);
                    });
                text = document.createTextNode("Thanks! Waitting for Processing");
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
        <div id="Signup">
            <Nav />
            <div className='sign_grid'>
                <div className='signup'>
                    <h1 style={{ textAlign: "center" }}>Lets Start</h1>
                    <div className='decorate_signin' onClick={noDepoly}>
                        <svg t="1689651041086" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2301" width="200" height="200"><path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05" p-id="2302"></path><path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335" p-id="2303"></path><path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853" p-id="2304"></path><path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4" p-id="2305"></path></svg>
                        <span>Sign up with Google</span>
                    </div>

                    <div className='sep_auth_email'>
                        <hr /><span>or</span><hr />
                    </div>

                    <form>
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
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            // placeholder="Write your Email"
                            onChange={(e) => handleInputChange(e)}
                            value={email}
                        />
                        <hr />
                        <label htmlFor="password">Password: </label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            // placeholder="Password"
                            onChange={(e) => handleInputChange(e)}
                            value={password}
                        />
                        <hr />

                        <div className='decorate_signin' onClick={(e) => signup(e)}>Sign up</div>
                        <div>
                            <p>Already have an account? &nbsp;
                                <span
                                    onClick={signin}
                                    style={{ color: 'green', cursor: "pointer" }}
                                >Log in</span>
                            </p>
                        </div>
                    </form>
                    <div id="snackbar"></div>
                </div>
                <img
                    className='signLogo'
                    src='./img/sign.png'
                    alt="sign"
                />
            </div>
        </div>
    );
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};