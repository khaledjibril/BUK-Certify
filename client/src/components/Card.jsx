export default function Card({ children, className }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
