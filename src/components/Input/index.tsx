import React, { forwardRef, InputHTMLAttributes } from "react";
import { IonInput } from "@ionic/react";

interface InputProps extends InputHTMLAttributes<HTMLIonInputElement> {
  type?:
    | "number"
    | "time"
    | "text"
    | "date"
    | "email"
    | "password"
    | "search"
    | "tel"
    | "url"
    | "week"
    | "month"
    | "datetime-local"
    | undefined;
}

const Input: React.ForwardRefRenderFunction<HTMLIonInputElement, InputProps> = (
  { type },
  ref
) => {
  return <IonInput type={type} ref={ref} />;
};

export default forwardRef(Input);
