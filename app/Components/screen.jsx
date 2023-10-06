import axios from "axios";
import { useEffect, useState, useRef } from "react";
import pokemon_ids from "../../public/data/pokemon-ids.json";
import pokemon_names from "../../public/data/pokemon-names.json";
import pokemon_offsets from "../../public/data/pokemon-offsets.json";

import placeholder from "../../public/data/1.json";
import pokemonTypeColors from "./colors";

import fetchPokemonData from "../functions/fetchpokemon-data";
import { motion } from "framer-motion";

// import menu_nav from '../../public/soundseffects/menu_nav.mp3';
// import menu_null from '../../public/soundseffects/menu_null.mp3';
// import menu_select from '../../public/soundseffects/menu_select.mp3';
// import test from '../../public/soundseffects/test.wav';

// Import Swiper styles
import "swiper/css";

import Image from "next/image";

const Screen = () => {
  const [nameWindow, setNameWindow] = useState([]);
  const [spritePack, setSpritePack] = useState(["", "", ""]);
  let tempOffset = 0;
  const [offset, setOffset] = useState(0);
  const [tempList, setTempList] = useState([
    null,
    null,
    null,
    pokemon_ids[0],
    pokemon_ids[1],
    pokemon_ids[2],
    pokemon_ids[3],
  ]);

  const [moveNameList, setMoveNameList] = useState(false);
  const [pageMovement, setPageMovement] = useState("-100%");
  const [infocardMovement, setInfocardMovement] = useState("0%");
  const [moveDirection, setMoveDirection] = useState(null);

  //   const pokemon_names_array = JSON.parse(pokemon_names);

  const [searchQuery, setSearchQuery] = useState("");

  const [pokemonData, setPokemonData] = useState(placeholder);

  const [fontSize, setFontSize] = useState("16px");
  const [generalFontSize, setGeneralFontSize] = useState(0);
  const [fontSizeMain, setFontSizeMain] = useState("16px");
  const [fontTitle, setFontTitle] = useState("16px"); // Initial font size
  const parentRef = useRef(null);

  const updateFontSize = () => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.clientHeight;
      let calculatedFontSize = `${parentHeight / 17}px`; // You can adjust the divisor as needed
      setFontSize(calculatedFontSize);
      setGeneralFontSize(parentHeight / 17);
      calculatedFontSize = `${parentHeight / 14}px`;
      setFontSizeMain(calculatedFontSize);
      calculatedFontSize = `${parentHeight / 12}px`;
      setFontTitle(calculatedFontSize);
    }
  };

  // console.log(pokemon_ids[0]);

  const assignTempList = (offset) => {
    let list = [
      offset - 3,
      offset - 2,
      offset - 1,
      offset,
      offset + 1,
      offset + 2,
      offset + 3,
    ];

    let temp = [];
    for (let i = 0; i < 7; i++) {
      if (list[i] > -1) {
        temp.push(pokemon_ids[list[i]]);
      } else {
        temp.push(null);
      }
    }
    setTempList(temp);
  };

  const assignStrings = (list) => {
    let tempWindow = [];
    let tempSprite = ["", "", ""];
    console.log(list);

    for (let i = 0; i < 7; i++) {
      if (list[i] !== null) {
        let temp =
          "#" +
          list[i].id.toString() +
          " " +
          list[i].name.toString().toUpperCase();

        if (i > 1 && i < 5) {
          tempSprite[i - 2] =
            "/base-sprites-compressed/" + list[i].id.toString() + ".png";
        }

        tempWindow.push(temp);
      } else {
        tempWindow.push("");
        if (i > 1 && i < 5) {
          tempSprite[i - 2] = "/base-sprites-compressed/null.png";
        }
      }
    }
    setNameWindow(tempWindow);
    setSpritePack(tempSprite);
  };

  const playsound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const fetchRawData = async () => {
    const data = await fetchPokemonData(pokemon_ids[offset].name);
    setPokemonData(data);
    console.log(data);
  };

  const testFunc = () => {
    console.log(pokemonData);
  };
  // console.log(tempList);

  let tempWindow = [];
  let tempSprite = ["", "", ""];

  const showSearchPage = () => {
    setPageMovement("-200%");
  };
  const showInfoPage = () => {
    fetchRawData();
    setPageMovement("0%");
    setSearchQuery("");
    console.log(offset);
    // console.log(fontTitle);
    // console.log(fontSizeMain);
  };
  const showHomePage = async () => {
    setPageMovement("-100%");
    setSearchQuery("");
    console.log(offset);
  };

  const handleInfoCardMovement = (props) => {
    setInfocardMovement(props);
  };

  const handleMove = () => {
    setMoveNameList(true);

    setTimeout(() => {
      setMoveNameList(false);
    }, 300);
  };

  const incrementList = () => {
    if (offset < 1263)
      // playsound(test);
      handleMove();
    setMoveDirection(true);
    setOffset((prevOffset) => {
      const newOffset = prevOffset + 1;
      assignTempList(newOffset); // Update tempList based on the newOffset
      assignStrings(tempList); // Update nameWindow based on the updated tempList
      return newOffset;
    });
  };

  const decrementList = () => {
    if (offset > 0) {
      // playsound(test);
      handleMove();
      setMoveDirection(false);
      setOffset((prevOffset) => {
        const newOffset = prevOffset - 1;
        assignTempList(newOffset); // Update tempList based on the newOffset
        assignStrings(tempList); // Update nameWindow based on the updated tempList
        return newOffset;
      });
    }
  };

  const queryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchPokemon = () => {
    const formattedQuery = searchQuery.toLowerCase();
    const newOffset = pokemon_offsets[formattedQuery];
    console.log(newOffset);
    setOffset((prevOffset) => {
      const tempOffset = newOffset;
      assignTempList(tempOffset); // Update tempList based on the newOffset
      assignStrings(tempList); // Update nameWindow based on the updated tempList
      return tempOffset;
    });
    showHomePage();
  };

  useEffect(() => {
    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    assignTempList(offset);
    assignStrings(tempList);

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, [offset]);

  return (
    <>
      <motion.div className="relative screen border-0 flex-1 flex-row flex overflow-hidden ">
        <motion.div className="inner-3-pages-container h-full w-full flex flex-row">
          <motion.div
            className="inner-page flex-col flex relative"
            initial={{ x: "-100%" }}
            animate={{ x: pageMovement }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="Title-Nav flex flex-row">
              <button
                className="previous-button bg-menu-block basis-1/6"
                onClick={() => testFunc()}
              ></button>
              <div
                className="Title-Name font-Chakra_Petch bg-menu-block basis-4/6 text-center flex flex-col justify-center whitespace-nowrap overflow-hidden"
                style={{ fontSize: fontTitle }}
              >
                {nameWindow[3]}
              </div>
              <button
                className="next-button bg-menu-block basis-1/6"
                onClick={showHomePage}
              ></button>
            </div>
            <div className="info-row flex flex-row ">
              <div className="basis-2/5"></div>
              <div
                className="basic-info-card basis-3/5 bg-menu-block font-Chakra_Petch"
                style={{ fontSize: `${generalFontSize * 0.85}px` }}
              >
                <p>Types:</p>
                <div className="types-grid grid grid-cols-2">
                  {pokemonData.types.map((type, index) => (
                    <p
                      key={index}
                      className="types text-center p-0"
                      style={{
                        backgroundColor:
                          pokemonTypeColors[pokemonData.types[index].type.name],
                      }}
                    >
                      {pokemonData.types[index].type.name}
                    </p>
                  ))}
                </div>
                <div>
                  Height:{" "}
                  <span className="font-bold">{pokemonData.height / 10}m</span>
                  <div></div>
                  Weight:{" "}
                  <span className="font-bold">{pokemonData.weight / 10}kg</span>
                </div>
                <div>
                  Abilities: {pokemonData.abilities[0].ability.name},{" "}
                  {pokemonData.abilities[1]
                    ? pokemonData.abilities[1].ability.name
                    : ""}
                </div>
              </div>
            </div>
            <div
              className="main-info-row flex flex-col  font-Chakra_Petch"
              style={{ fontSize: `${generalFontSize}px` }}
            >
              <div className="info-options basis-1/5 flex flex-row">
                <motion.button
                  className="bg-menu-block basis-1/3"
                  onClick={() => handleInfoCardMovement("0%")}
                >
                  Info
                </motion.button>
                <motion.button
                  className="bg-menu-block basis-1/3"
                  onClick={() => handleInfoCardMovement("-33.33333334%")}
                >
                  Stats
                </motion.button>
                <motion.button
                  className="bg-menu-block basis-1/3"
                  onClick={() => handleInfoCardMovement("-66.6666667%")}
                >
                  Evolution
                </motion.button>
              </div>
              <div className="info-description basis-4/5 bg-menu-block overflow-hidden">
                <motion.div
                  animate={{ x: infocardMovement }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="info-container flex flex-row"
                >
                  <div
                    className="info-card description basis-1/3"
                    style={{ fontSize: `${generalFontSize * 0.85}px` }}
                  >
                    {pokemonData.text_entry
                      ? pokemonData.text_entry[0] + " "
                      : ""}
                    {pokemonData.text_entry
                      ? pokemonData.text_entry[1]
                        ? pokemonData.text_entry[1]
                        : ""
                      : ""}
                  </div>
                  <div
                    className="info-card stats basis-1/3 grid grid-cols-3"
                    style={{ fontSize: `${generalFontSize * 0.9}px` }}
                  >
                    {pokemonData.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="stat bg-BG-green text-center flex flex-col justify-center"
                      >
                        {stat.stat.name.toUpperCase()}: {stat.base_stat}
                      </div>
                    ))}
                    {/* <div className="stat bg-BG-green text-center flex flex-col justify-center">
                      HP:
                    </div>
                    <div className="stat bg-BG-green text-center flex flex-col justify-center">
                      Attack:
                    </div>
                    <div className="stat bg-BG-green text-center flex flex-col justify-center">
                      Defence:
                    </div>
                    <div className="stat bg-BG-green text-center flex flex-col justify-center">
                      SP-ATK:
                    </div>
                    <div className="stat bg-BG-green text-center flex flex-col justify-center">
                      SP-DEF:
                    </div>
                    <div className="stat bg-BG-green text-center flex flex-col justify-center">
                      SPEED:
                    </div> */}
                  </div>
                  <div
                    className="info-card evolutions overflow-scroll basis-1/3 "
                    style={{ fontSize: `${generalFontSize * 0.8}px` }}
                  >
                    <div className="s1 grid grid-cols-3 grid-rows-3">
                      <div className="evolution text-center flex flex-col justify-center">
                        <div className="evolution-image basis-4/6 flex flex-col justify-center items-center border-2 bg-secondary-blue">
                          <Image
                            className="evolution-image-sprite"
                            src={spritePack[1]}
                            width={100}
                            height={100}
                            alt="pichu"
                          />
                        </div>
                        <p className="evolution-name basis-1/5">#pichu</p>
                      </div>
                      <div className="evolution text-center flex flex-col justify-center">
                        <div className="evolution-image basis-4/6 flex flex-col justify-center items-center border-2 bg-secondary-blue">
                          <Image
                            className="evolution-image-sprite"
                            src={spritePack[1]}
                            width={100}
                            height={100}
                            alt="pichu"
                          />
                        </div>
                        <p className="evolution-name basis-1/5">#pichu</p>
                      </div>
                      <div className="evolution text-center flex flex-col justify-center">
                        <div className="evolution-image basis-4/6 flex flex-col justify-center items-center border-2 bg-secondary-blue">
                          <Image
                            className="evolution-image-sprite"
                            src={spritePack[1]}
                            width={100}
                            height={100}
                            alt="pichu"
                          />
                        </div>
                        <p className="evolution-name basis-1/5">#pichu</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="inner-page flex-row flex"
            initial={{ x: "-100%" }}
            animate={{ x: pageMovement }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div
              className={`Pokemon-display-card-container relative overflow-visible border-0 flex flex-col `}
            >
              <div
                className="Pokemon-display-card-box justify-center"
                id="myAnimation"
              >
                <motion.div
                  animate={{
                    y: moveNameList
                      ? moveDirection
                        ? [0, -100, -270, 0]
                        : [0, +100, +270, 0]
                      : [0, 0, 0],
                  }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center opacity-40 mx-2 my-2"
                  alt="pokemon image"
                >
                  <Image
                    className="pokemon-image "
                    src={spritePack[0]}
                    alt="pokemon image"
                    width={300}
                    height={300}
                  />
                </motion.div>
                <motion.div
                  animate={{
                    scale: pageMovement === "0%" ? 0.83 : 1,
                    x: pageMovement === "0%" ? "-241%" : "0%",
                    y:
                      pageMovement === "0%"
                        ? "-29.5%"
                        : moveNameList
                        ? moveDirection
                          ? [0, -100, -270, 0]
                          : [0, +100, +270, 0]
                        : [0, 0, 0],
                  }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center hover:cursor-pointer "
                  alt="pokemon image"
                  onClick={pageMovement === "0%" ? null : showInfoPage}
                >
                  <Image
                    className="pokemon-image "
                    src={spritePack[1]}
                    alt="pokemon image"
                    width={300}
                    height={300}
                  />
                </motion.div>
                <motion.div
                  animate={{
                    y: moveNameList
                      ? moveDirection
                        ? [0, -100, -270, 0]
                        : [0, +100, +270, 0]
                      : [0, 0, 0],
                  }}
                  transition={{ type: "tween", duration: 0.2 }}
                  className="Pokemon-display-card bg-secondary-blue flex flex-col items-center justify-center opacity-40 mx-2 my-2"
                  alt="pokemon image"
                >
                  <Image
                    className="pokemon-image "
                    src={spritePack[2]}
                    alt="pokemon image"
                    width={300}
                    height={300}
                  />
                </motion.div>
              </div>
            </div>
            <div
              className={`name-card-container flex flex-col  justify-center `}
            >
              <div className="end-card flex flex-row ">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="basis-3/4 bg-menu-block"
                  onClick={decrementList}
                >
                  <Image
                    className="arrow-up "
                    src="/icons/arrowup.svg"
                    alt="up"
                    width={300}
                    height={300}
                  />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="basis-1/4 bg-menu-block flex items-center justify-center"
                  onClick={showSearchPage}
                >
                  <Image
                    className="flex items-center "
                    src="/icons/magnifying-glass-solid.svg"
                    alt="search"
                    width={15}
                    height={15}
                  />
                </motion.button>
              </div>
              <motion.div
                animate={{
                  y: moveNameList
                    ? moveDirection
                      ? [0, -30, 0]
                      : [0, +30, 0]
                    : [0, 0, 0],
                }}
                transition={{ type: "tween", duration: 0.2 }}
                className="name-card-3-set flex flex-col"
                ref={parentRef}
              >
                <div
                  className="name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap"
                  style={{ fontSize: fontSize }}
                >
                  {nameWindow[0]}
                </div>
                <div
                  className="name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap"
                  style={{ fontSize: fontSize }}
                >
                  {nameWindow[1]}
                </div>
                <div
                  className="name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap"
                  style={{ fontSize: fontSize }}
                >
                  {nameWindow[2]}
                </div>

                <motion.div
                  animate={{
                    border: moveNameList ? "0.2rem " : "",
                    marginLeft: moveNameList ? "0" : "",
                    scaleY: moveNameList ? "0.90" : "",
                  }}
                  transition={{ type: "tween", duration: 0.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="name-card-main bg-menu-block font-Chakra_Petch whitespace-nowrap hover:cursor-pointer "
                  style={{ fontSize: fontSizeMain }}
                  onClick={showInfoPage}
                >
                  {nameWindow[3]}
                </motion.div>

                <div
                  className="name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap"
                  style={{ fontSize: fontSize }}
                >
                  {nameWindow[4]}
                </div>
                <div
                  className="name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap"
                  style={{ fontSize: fontSize }}
                >
                  {nameWindow[5]}
                </div>
                <div
                  className="name-card-sub bg-menu-block font-Chakra_Petch whitespace-nowrap"
                  style={{ fontSize: fontSize }}
                >
                  {nameWindow[6]}
                </div>
              </motion.div>
              <div className="end-card flex flex-row ">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="basis-3/4 bg-menu-block"
                  onClick={incrementList}
                >
                  <Image
                    className="arrow-up rotate-180"
                    src="/icons/arrowup.svg"
                    alt="down"
                    width={300}
                    height={300}
                  />
                </motion.button>
                <button className="basis-1/4 bg-menu-block"></button>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="inner-page"
            initial={{ x: "-100%" }}
            animate={{ x: pageMovement }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="search-bar-container flex-1 h-full flex flex-row items-center z-10 relative ">
              <button
                className="back-button-search absolute bg-menu-block"
                onClick={showHomePage}
              >
                <Image
                  src="/icons/chevron-left-solid.svg"
                  alt="back"
                  width={15}
                  height={15}
                />
              </button>
              <input
                type="text"
                placeholder="Search....."
                className="search-bar basis-4/5 bg-menu-block font-Chakra_Petch text-center"
                style={{ fontSize: fontSize }}
                value={searchQuery}
                onChange={queryChange}
              ></input>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="search-button basis-1/5 bg-menu-block hover:cursor-pointer"
                onClick={searchPokemon}
              >
                <Image
                  src="/icons/magnifying-glass-solid.svg"
                  alt="search"
                  width={50}
                  height={50}
                />
              </motion.div>
              <motion.div
                className="searchSuggestions absolute bg-menu-block font-Chakra_Petch items-center text-center flex flex-col"
                style={{ fontSize: fontSize }}
              >
                {pokemon_names
                  .filter((id) => {
                    if (searchQuery === "") {
                      return null;
                    } else if (
                      id.toLowerCase().includes(searchQuery.toLowerCase())
                    ) {
                      return id;
                    }
                  })
                  .map((id) => (
                    <div
                      key={id}
                      className="searchSuggestion hover:cursor-pointer"
                      onClick={() => setSearchQuery(id.toUpperCase())}
                    >
                      {id.toUpperCase()}
                    </div>
                  ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Screen;
