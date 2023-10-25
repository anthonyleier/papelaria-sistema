import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #00585e;
    padding-top: 20px;
    padding-bottom: 50px;
    padding-left: 100px;
    padding-right: 100px;
`;

export const Table = styled.table`
    border-collapse: collapse;
    width: 95%;
    border: 1px solid #e0e0e0;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Th = styled.th`
    color: #333;
    font-weight: bold;
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #333;
`;

export const Td = styled.td`
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
`;

export const Tfoot = styled.tfoot`
    font-weight: bold;
`;

export const DateInput = styled.input`
    width: 150px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
`;

export const Filtro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;
