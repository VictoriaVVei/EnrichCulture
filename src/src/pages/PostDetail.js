import React, { useEffect, useRef, useState } from 'react'; //import React Component
import { Nav } from '../components/Nav';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { cloudStore } from '../../firebase';

export function PostDetail() {

    const topFunction = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    return (
        <div id="PostDetail">
            <Nav />
            <div className='postDetail'>
            </div>
        </div>
    );
}