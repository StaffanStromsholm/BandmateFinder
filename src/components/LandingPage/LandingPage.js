import React from 'react'
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import bgVideo from '../../videos/bg-video.mp4';
import plectrumEnter from '../../images/plectrumEnter.svg';

export default function LandingPage() {
    return (
        <div id="LandingPage" className={styles.LandingPage}>
            <video autoPlay muted loop id={styles.myVideo}>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className={styles.overlay}>
                {/* <Link className={styles.enter} to="/login">Login</Link> */}
                <Link to="/login"><img src={plectrumEnter} /></Link>
                <Link className={styles.signup} to="signup">Not a user yet? Sign up here.</Link>
                
            </div>
        </div>
    )
}
