import React from 'react'
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import bgVideo from '../../videos/bg-video.mp4';
import rockHand from '../Avatar/rockHand.svg';

export default function LandingPage() {
    return (
        <div id="LandingPage" className={styles.LandingPage}>
            <video autoPlay muted loop id={styles.myVideo}>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className={styles.overlay}>
                <Link className={styles.loginBtn} to="/login">
                    <div className={styles.enterDiv}>
                        <span className={styles.enter}>Login</span>
                        <img className={styles.landingRockHand} src={rockHand} />
                    </div>
                    <Link className={styles.signup} to="signup">Not a user yet? Sign up here.</Link>
                </Link>
            </div>
        </div>
    )
}
