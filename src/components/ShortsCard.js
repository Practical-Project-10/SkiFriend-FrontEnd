import React, {useState} from 'react';

import {history} from '../redux/ConfigStore';
import { useDispatch } from 'react-redux';
import { shortsActions } from '../redux/modules/shorts';

import ShortsVideo from "./ShortsVideo"
import Modal from './Modal';

import styled from 'styled-components';
import { Grid, Image } from '../elements';
import etc from "../assets/etc_icon.svg";
//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const ShortsCard = (props) => {
  const dispatch = useDispatch();
  
  const [showModal, setShowModal] = useState(false);

  return(
    <React.Fragment>
      <Grid position='relative'>
        <Grid width='144px' height='250px' bg='#D9E4EE' radius='7px'>
          <ShortsVideo src={props.videoPath}/>
        </Grid>

        <Ect onClick={() => setShowModal(true)}>
          <Image src={etc} width="30px" height="30px" />
        </Ect>

        {showModal ? 
          <Modal
            page='shorts'
            width="140px"
            height="146px"
            radius="7px"
            fontS="14px"
            closeModal={() => setShowModal(false)}
            edit={() => history.push(`/shortsupload/${props.shortsId}`)}
            delete={() => dispatch(shortsActions.deleteShortsDB(props.shortsId))}
          />
        : null
        }
      </Grid>
    </React.Fragment>
  );
};

const Ect = styled.div`
  width: 30px;
  height: 30px;
  line-height: ${(props) => props.line};
  text-align: center;
  position: absolute;
  top: 5px;
  right: 3px;

  &:hover {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.1);
  }
`

export default ShortsCard;