import React from 'react'
import { Link } from 'react-router-dom';
import './styles.css';
import bgVideo from '../../videos/bg-video.mp4';


export default function LandingPage() {
    return (
        <div id="LandingPage" className="LandingPage">
            <video autoPlay muted loop id="myVideo">
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div class="overlay">
                <Link to="/login">Enter</Link>
            </div>
        </div>
    )
}
