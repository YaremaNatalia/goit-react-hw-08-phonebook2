import styled from 'styled-components';


export const ContactUl = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 12px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  padding: 20px;
  width: 480px;
`;

export const ContactItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ContactName = styled.p`
  font-weight: bold;
`;

export const ContactNumber = styled.p`
  color: #555555;
`;

export const RemoveBtn = styled.ul`
  background-color: #cac6c6;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  &:hover,
  &:focus {
    background-color: #ff0000;
    color: #fff;
  }
`;
