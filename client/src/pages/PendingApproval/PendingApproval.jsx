import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./PendingApproval.module.css";

export default function PendingApproval() {
  return (
    <div className={styles.wrapper}>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logoBox}>
              <img
                src="/images/buklogo.webp"
                alt="BUK Logo"
                className={styles.logo}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className={styles.logoFallback}>
                <span>BUK</span>
              </div>
            </div>
            <h1 className={styles.h1style}>Account Pending Approval</h1>
            <p className={styles.pstyle}>
              Your account has not been approved yet. Please check back later.
            </p>
          </div>

          <div className={styles.messageBox}>
            <div className={styles.icon}>⏳</div>
            <p className={styles.messageText}>
              We're reviewing your account. If you need help, contact our{" "}
              <a href="/help-desk" className={styles.helpLink}>
                Help Desk
              </a>
              .
            </p>
          </div>

          <div className={styles.note}>
            <p>
              While you wait, make sure all your profile information is complete
              to avoid delays.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
