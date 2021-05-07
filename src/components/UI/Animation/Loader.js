import React from "react";
import cogwheel from "./1295308.svg";
import styles from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.animation}>
            <section className={styles.cogwheels}>
                <div className={styles.cogwheel1}>
                    <img src={cogwheel} alt="cogwheel" />
                </div>
                <div className={styles.cogwheel2}>
                    <img src={cogwheel} alt="cogwheel" />
                </div>
                <div className={styles.cogwheel3}>
                    <img src={cogwheel} alt="cogwheel" />
                </div>
                <div className={styles.cogwheel4}>
                    <img src={cogwheel} alt="cogwheel" />
                </div>
                <div className={styles.cogwheel5}>
                    <img src={cogwheel} alt="cogwheel" />
                </div>
            </section>
        </div>
    );
};

export default Loader;
