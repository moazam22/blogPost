import styled from "styled-components";

export const PostContainer = styled.div`
  width: calc(100%-20px);
  min-height: 150px;
  margin-bottom: 2em;
  border: 2px solid #D3D3D3;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 8px;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
`;

export const PostTitle = styled.div`
    width: 100%;
    height: 10%;
    color: black;
    font-weight: 500;
    font-size: 18px;
    padding-top: 10px;
    margin-bottom: 10px;
`;

export const PostBody = styled.div`
    width: 100%;
    min-height: 100px;
    color: black;
    font-size: 14px;
    margin-bottom: 10px;
    line-break: anywhere;
`;

export const PostLowerSection = styled.div`
    width: 100%;
    height: 24px;
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #D3D3D3;
    font-size: 14px;
    margin-bottom: 10px;
`;

export const PostLinkSection = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D3D3D3;
`;

export const TagsContainer = styled.div`
    display: flex;
    margin-top: 5px;
`;

export const TagStyle = styled.div`
    font-weight: 500;
    margin-right: 1em;
`;

export const LowerSection = styled.div`
    width: 100%; 
    margin-right:25%; 
    margin-left: 25%;
    @media (max-width: 767px) {
			margin-right: 5%;
			margin-left: 5%;
    }
`;

export const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
//   height: 90vh;
`;

