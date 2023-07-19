import React, { useEffect, useState } from 'react'; //import React Component
import { NavLink } from 'react-router-dom';

export function RenderCard(props) {

    let newEachCard = null
    if (props.postData.length > 0) {
        newEachCard = props.postData.map((content) => {
            let pic = content.Post_Information.pic
            let name = content.Post_Information.cname
            let postID = content.Post_Information.postID
            return (
                <div className='post_each' key={postID}>
                    <NavLink to={`/postDetail/${postID}`} >
                        <img
                            src={pic}
                            alt='post.img'
                        />
                        <p>{name}</p>
                    </NavLink>
                </div >
            )
        })
    }

    return (
        <div className="posts">
            {newEachCard}
        </div>
    );
}