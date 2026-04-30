export default function GlobalLoading() {
  return (
    <div style={{
      minHeight: "100vh", background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 36, height: 36,
        border: "3px solid #e5e7eb",
        borderTopColor: "#3b82f6",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
