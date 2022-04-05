import React from "react";
import styled from "styled-components";

interface IFormProps {
  children?: React.ReactNode;
  formRef?: React.MutableRefObject<HTMLFormElement>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface IItemProps {
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  name: string;
}

const Form = ({ children, formRef, onSubmit }: IFormProps) => {
  return (
    <FormStyle>
      <form ref={formRef} onSubmit={onSubmit}>
        {children}
      </form>
    </FormStyle>
  );
};

const Item = ({ children, ...rest }: IItemProps) => {
  return <div className="item">{React.cloneElement(children, rest)}</div>;
};

Form.Item = Item;

const FormStyle = styled.div`
  .item:not(:first-child) {
    margin-top: 1rem;
  }
`;

export default Form;
