import React, { useEffect } from 'react'; //import React Component
import { NavLink } from 'react-router-dom';

export function Nav() {
    let loginUser = localStorage.getItem("loginUser")

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
        if (currentLocation === "signup" || currentLocation === "signin" || currentLocation === "account") {
            currentPage.forEach((content) => {
                content.classList.remove("dashed_decoration");
            })
            currentPage[3].classList.add("dashed_decoration");
        }
    })

    return (
        <div id="Nav">
            <div className='Nav1'>
                <ul>
                    <NavLink to="/main"><li className='logoName'>Enrich<br /> Culture</li></NavLink>
                    <NavLink to="/diversity"><li>Diversity</li></NavLink>
                    <NavLink to="/festival"><li>Festival</li></NavLink>
                    {loginUser !== null ? (
                        <NavLink to="/account">
                            <li className="profile_avatar material-symbols-outlined">
                                account_circle
                            </li>
                        </NavLink>
                    ) : (
                        currentLocation === "signin" ? (
                            <NavLink to="/signup" title='Click to Sign up'>
                                <li>Sign up</li>
                            </NavLink>
                        ) : (
                            <NavLink to="/signin" title='Click to Log in'>
                                <li>Log in</li>
                            </NavLink>
                        )
                    )}
                </ul>
            </div>
        </div >
    );
}