"use client";
import React from "react";

interface AuthButtonProps {
  text: string;
  onClick?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 mt-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold transition"
    >
      {text}
    </button>
  );
};

export default AuthButton;
