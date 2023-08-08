import React from 'react'; //import React Component
import { Nav } from '../components/Nav';

export function Qa() {

    return (
        <div id="Qa">
            <Nav />
            <div className='Qa'>
                <div className='welcomeBoard'></div>
                <div style={{margin:"40px auto", width:"80%", maxWidth:"800px"}}>
                    <p style={{fontSize:"larger", fontWeight:"bolder"}}>Q: Why I load so slowly</p>
                    <p>A: This website applied a lot of js feature and firebase reading, which is dependent on computer's
                        CPU and wifi connection.
                    </p>
                </div>
            </div>
        </div>
    );
}