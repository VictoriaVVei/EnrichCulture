import React, { useEffect } from 'react'; //import React Component
import { NavLink } from 'react-router-dom';

export function Nav() {
    let loginUser = localStorage.getItem("loginUser")

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    let currentLocation = window.location.href.split("/")[window.location.href.split("/").length - 1]
    useEffect(() => {
        let currentPage = document.querySelectorAll(".Nav1 ul a li")
        // console.log(currentPage)
        if (currentLocation === "main") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[0].classList.add("dashed_decoration");
        }
        if (currentLocation === "diversity") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[1].classList.add("dashed_decoration");
        }
        if (currentLocation === "festival") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[2].classList.add("dashed_decoration");
        }
        if (currentLocation === "qa") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[3].classList.add("dashed_decoration");
        }
        if (currentLocation === "signup" || currentLocation === "signin" ||
            currentLocation === "account" || currentLocation === "reviseAccount" ||
            currentLocation === "makePost") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[4].classList.add("dashed_decoration");
        }
    })

    return (
        <div id="Nav">
            <div className='Nav1'>
                <ul>
                    <NavLink to="/main" onClick={topFunction}><li className='logoName'>Enrich<br /> Culture</li></NavLink>
                    <NavLink to="/diversity" onClick={topFunction}><li>Diversity</li></NavLink>
                    <NavLink to="/festival" onClick={topFunction}><li>Festival</li></NavLink>
                    <NavLink to="/qa" onClick={topFunction}><li>Q&A</li></NavLink>
                    {loginUser !== null ? (
                        <NavLink to="/account">
                            <li className="profile_avatar material-symbols-outlined" onClick={topFunction}>
                                account_circle
                            </li>
                        </NavLink>
                    ) : (
                        currentLocation === "signin" ? (
                            <NavLink to="/signup" title='Click to Sign up' onClick={topFunction}>
                                <li>Sign up</li>
                            </NavLink>
                        ) : (
                            <NavLink to="/signin" title='Click to Log in' onClick={topFunction}>
                                <li>Log in</li>
                            </NavLink>
                        )
                    )}
                </ul>
            </div>
        </div >
    );
}