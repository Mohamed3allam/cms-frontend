import React, { useEffect, useState } from "react";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  const [shouldRender, setShouldRender] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#4b2615",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        opacity: loading ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      <div style={{ textAlign: "center", color: "#fff" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid white",
            borderTop: "4px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
