import React from "react";
import styles from "./StatCard.module.css";

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  trend,       // number e.g., 8
  sparkline,   // array of numbers
  color="#4f46e5",  // main card theme color
  icon, 
}) {

  // Determine trend color
  const trendColor = trend >= 0 ? "#16a34a" : "#dc2626";
  const trendSign = trend >= 0 ? "+" : "";

  return (
    <div className={styles.card} style={{ borderTopColor: color }}>
      <div className={styles.top}>
        {icon && <div className={styles.icon} style={{ color }}>{icon}</div>}
        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.value}>{value}</div>

      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}

      {typeof trend === "number" && (
        <div className={styles.trend} style={{ color: trendColor }}>
          {trendSign}{trend}%
        </div>
      )}

      {sparkline && sparkline.length > 0 && (
        <div className={styles.sparkline}>
          {sparkline.map((v, i) => {
            const max = Math.max(...sparkline);
            const height = (v / max) * 100;

            // Multi-color effect: first half blue, second half purple
            const barColor = i < sparkline.length / 2 ? color : "#6366f1";

            return (
              <div
                key={i}
                className={styles.sparkBar}
                style={{ height: `${height}%`, background: barColor }}
              />
            );
          })}
        </div>
      )}

      <div className={styles.decorativeBlob} style={{ background: `${color}33` }} />
    </div>
  );
}
