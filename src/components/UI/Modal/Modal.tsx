import React from "react";
interface Props {
  children: React.ReactNode;
  className?: string;
}
const Modal = ({ children, className }: Props): JSX.Element => {
  return <div className="">{children}</div>;
};

export default Modal;
