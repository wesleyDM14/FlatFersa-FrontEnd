import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  color: #333;
  grid-area: main;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  font-size: 1.5rem;
`;