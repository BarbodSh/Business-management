import React from "react";

type InputType = {
  name: string;
  placeholder: string;
  id: string;
  labelName: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function Input({
  name,
  placeholder,
  id,
  labelName,
  value,
  setValue,
}: InputType) {
  return (
    <>
      <label htmlFor={id}>{labelName}</label>
      <input
        id={id}
        name={name}
        type="text"
        className="p-2 text-xl ring-1 rounded-xl w-full outline-0 focus:ring-white focus:placeholder:text-white transition-all duration-200 ease-in"
        placeholder={placeholder}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setValue(event.target.value)
        }
      />
    </>
  );
}

export default Input;
