import React from 'react';
import {Grid,Text,Button,Input} from "../elements/CarpoolWriteCSS/index";
import {AiOutlineArrowLeft} from "react-icons/ai"
import "../elements/CarpoolWriteCSS/style.css";



const CarpoolWrite = () => {
    return (
        <Grid justify="column">
            <Grid is_flex padding="10px" margin="0 0 20px 0">
                <AiOutlineArrowLeft/>
                <Text margin="0 auto">카풀 작성 페이지</Text>
            </Grid>
            <Grid margin="0 auto"align="center" width="70vw" border="1px solid #000" border-radius="30px">
                하이원
            </Grid>
            <Grid is_flex margin ="10px 15px 10px 15px">
                <Button>카풀요청</Button>
                <Button>카풀제공</Button>
            </Grid>
            {/* input if 로 하나 만들기 */}
            <Input placeholder="제목" padding="10px" width="80vw" ></Input>
        </Grid>
    );
};

export default CarpoolWrite;