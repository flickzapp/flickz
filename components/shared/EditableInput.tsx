"use client";

import { useState } from "react";
import { Input } from "../ui/input";

export default function EditableInput({
  textValue,
  saveTextValue,
  textCn,
}: {
  textValue: string;
  textCn: string;
  saveTextValue: (value: string) => void;
}): JSX.Element {
  const [text, setText] = useState(textValue);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          setIsEditing(false);
          saveTextValue(text);
        }}
      />
    );
  }
  return (
    <h1 className={textCn} onClick={() => setIsEditing(true)}>
      {text}
    </h1>
  );
}
