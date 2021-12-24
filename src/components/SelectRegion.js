import React, { useState, useEffect, useRef } from "react";
import "../elements/CarpoolCSS/citySelection.css";
import { CSSTransition } from "react-transition-group";

//지역선택 셀렉박스 css 는 import 경로에 쓰여져 있습니다!
const SelectRegion = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const [city, setCity] = useState([]);
  const [region, setRegion] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function Navbar(props) {return ( <nav className="navbar"> <ul className="navbar-nav">{props.children}</ul></nav>);}  
  function NavItem(props) {
    const [open, setOpen] = useState(false);
          return (
            <>
              <li className="nav-item">
                <select className="icon-button" onClick={() => setOpen(!open)}>지역선택</select>
                {open && props.children}
              </li>
            </>
          );
    }

  const calcHeight= (el)=> {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  
  const DropdownItem=(props)=> {
      return (
        <option
          className="menu-item"
          value={props.children}
          onClick={(e) => {
            props.goToMenu &&
              setActiveMenu(props.goToMenu) 
 }}>
          {props.children}
        </option>
      );
  }
    
    const city_name = ["서울","부산","대구","인천","광주","대전","울산","강원","경기","경남","경북","전남","전북","제주","충남","충북",];
    let region_name = [];
    region_name[0] = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구",
                      "서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구",];
    region_name[1] = ["강서구","금정구","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구","기장군",];
    region_name[2] = ["남구","달서구","동구","북구","서구","수성구","중구","달성군",];
    region_name[3] = ["계양구","남구","남동구","동구","부평구","서구","연수구","중구","강화군","옹진군",];
    region_name[4] = ["광산구", "남구", "동구", "북구", "서구"];
    region_name[6] = ["남구", "동구", "북구", "중구", "울주군"];
    region_name[5] = ["대덕구", "동구", "서구", "유성구", "중구"];
    region_name[7] = ["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군",
      "홍천군","화천군","횡성군",];
    region_name[8] = ["고양시 덕양구","고양시 일산구","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시 소사구","부천시 오정구","부천시 원미구",
      "성남시 분당구","성남시 수정구","성남시 중원구","수원시 권선구","수원시 장안구","수원시 팔달구","시흥시","안산시 단원구","안산시 상록구","안성시","안양시 동안구","안양시 만안구",
      "오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","하남시","화성시","가평군","양주군","양평군","여주군","연천군","포천군",];
    region_name[9] = ["거제시","김해시", "마산시","밀양시","사천시","양산시","진주시","진해시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군",
      "하동군","함안군","함양군","합천군",];
    region_name[10] = [ "경산시","경주시","구미시","김천시","문경시", "상주시","안동시","영주시","영천시","포항시 남구","포항시 북구","고령군","군위군","봉화군",
     "성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군",];
    region_name[11] = ["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군",
      "완도군","장성군","장흥군","진도군","함평군","해남군","화순군",];
    region_name[12] = ["군산시","김제시","남원시","익산시","전주시 덕진구","전주시 완산구","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군",];
    region_name[13] = ["서귀포시", "제주시", "남제주군", "북제주군"];
    region_name[14] = ["공주시","논산시","보령시","서산시","아산시","천안시","금산군","당진군","부여군","서천군","연기군","예산군","청양군","태안군","홍성군",];
    region_name[15] = ["제천시","청주시 상당구","청주시 흥덕구","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","진천군","청원군",];


          return (
            <div className="wrap-all">
              <div>{city} {region}</div>
            <Navbar>
              <NavItem>
                  <div
                    className="dropdown"
                    style={{ height: menuHeight }}
                    ref={dropdownRef}
                  >
                    <CSSTransition
                      in={activeMenu === "main"}
                      timeout={500}
                      classNames="menu-primary"
                      unmountOnExit
                      onEnter={calcHeight}
                    >
                      <div className="menu" onClick={(e)=>{setCity(e.target.value); console.log(e.target.value);}} > 
                        {city_name.map((c, idx) => {
                          return (
                            <DropdownItem value={c} key={idx + "city"} goToMenu={"city" + idx}>
                              {c}
                            </DropdownItem>
                          );
                        })}
                      </div>
                    </CSSTransition>
                    {city_name.map((c, idx) => {
                      return (
                        <CSSTransition
                          in={activeMenu === "city" + idx}
                          timeout={500}
                          classNames="menu-secondary"
                          unmountOnExit
                          onEnter={calcHeight}
                        >
                          <div
                            className="menu"
                            onClick={(e) => {
                              setRegion(e.target.value);
                              console.log(e.target.value);
                            }}
                          >
                            <DropdownItem value="" goToMenu="main">
                              뒤로가기
                            </DropdownItem>
                            {region_name[idx].map((r, idx) => {
                              return <DropdownItem value={r} key={r + "region"}>{r}</DropdownItem>;
                            })}
                          </div>
                        </CSSTransition>
                      );
                    })}
                  
                  </div>
              </NavItem>
            </Navbar>
            <div></div>
            </div>
          );
        };
  
    
export default SelectRegion;
