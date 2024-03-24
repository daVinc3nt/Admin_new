// EditField.tsx
import React, { useState, useEffect, useRef } from "react";

interface EditFieldProps {
  data: string | number;
  setData: (value: string | number) => void;
  type: string;
  inputlen: string
}

const EditField: React.FC<EditFieldProps> = ({ data, setData, type, inputlen }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData(e.target.value);
  };

  const handleEditComplete = () => {
    setData(editedData);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const inputWidth = type === 'number' ? 'w-[70px]' : `w-[${inputlen}px] pr-5`;
  console.log(`w-[${inputlen}px] pr-5`)
  return (
    <div>
      {!isEditing ? (
        <span className={`${
            typeof data === 'string' && data.length === 0
              ? 'pr-[200px] border-b-2 border-red-500'
              : 'pr-10'}`} onClick={() => setIsEditing(true)}>{data}</span>
      ) : (
        <div>
          <input
            ref={inputRef}
            className={`bg-transparent outline-none border-b-2 border-[#545e7b] text-black dark:text-white ${inputWidth}`}
            type={type}
            value={editedData}
            onChange={handleInputChange}
            onBlur={handleEditComplete}
          />
        </div>
      )}
    </div>
  );
};

export default EditField;
