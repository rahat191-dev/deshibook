"use client";
import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-white mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-lg bg-green-700 text-white outline-none focus:ring-2 focus:ring-green-500 transition"
      />
    </div>
  );
};

export default InputField;
