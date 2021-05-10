import React from 'react'
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import bgVideo from '../../videos/bg-video.mp4';
import plectrumEnter from '../../images/plectrumEnter.svg';
import rockhand from '../../images/rockHand.svg'

export default function LandingPage() {
    return (
        <div id="LandingPage" className={styles.LandingPage}>
            <video autoPlay muted loop id={styles.myVideo}>
                <source src={bgVideo} type="video/mp4" />
            </video>
            <div className={styles.overlay}>
                <Link className={styles.plectrum} to="/BandmateFinder-client/login"><img src={plectrumEnter} alt="plectrum" /></Link>
                <Link className={styles.signup} to="/BandmateFinder-client/signup">Not a user yet? Sign up here.</Link>
                <div className={styles.rockhand}><img src={rockhand} alt="Rock hand"/></div>
            </div>
        </div>
    )
}
