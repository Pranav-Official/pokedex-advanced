import axios from "axios";
import { memo, useEffect, useState, useRef } from "react";
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

const Screen = (props) => {
  const [tutorial, setTutorial] = useState(true);
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
  const TitleRef = useRef(null);
  const parentRef = useRef(null);
  const [TitleWidth, setTitleWidth] = useState(0);

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
    // console.log(list);

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

  const fetchRawData = async (num) => {
    const data = await fetchPokemonData(pokemon_ids[num].name);
    setPokemonData(data);

    // console.log(data.evolutions);
  };

  const testFunc = () => {
    console.log(pokemonData);
  };
  // console.log(tempList);

  const updateTitlefontSize = () => {
    if (TitleRef.current) {
      const width = TitleRef.current.getBoundingClientRect().width;
      setTitleWidth(width);
      // console.log("width", width);
      const text = nameWindow[3];
      // console.log(text);
      if (text.length > 14) {
        let size = `${(width * 1.58) / text.length}px`;
        setFontTitle(size);
      }
    }
  };

  let tempWindow = [];
  let tempSprite = ["", "", ""];

  const showSearchPage = () => {
    setPageMovement("-200%");
  };
  const showInfoPage = () => {
    updateTitlefontSize();
    fetchRawData(offset);
    setPageMovement("0%");
    setSearchQuery("");
    // console.log(offset);
    handleInfoCardMovement("0%");
    // console.log(fontTitle);
    // console.log(fontSizeMain);
  };
  const showHomePage = async () => {
    setPageMovement("-100%");
    setSearchQuery("");
    // console.log(offset);
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
      if (pageMovement === "0%") {
        fetchRawData(newOffset);
      }
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
        if (pageMovement === "0%") {
          fetchRawData(newOffset);
        }
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
    if (newOffset !== undefined) {
      console.log(newOffset);
      setOffset((prevOffset) => {
        const tempOffset = newOffset;
        assignTempList(tempOffset); // Update tempList based on the newOffset
        assignStrings(tempList); // Update nameWindow based on the updated tempList
        return tempOffset;
      });
      showHomePage();
    }
  };

  const evolutionInfo = (tempset) => {
    setOffset((prevOffset) => {
      const newOffset = tempset;
      assignTempList(newOffset); // Update tempList based on the newOffset
      assignStrings(tempList); // Update nameWindow based on the updated tempList
      if (pageMovement === "0%") {
        fetchRawData(newOffset);
      }
      return newOffset;
    });
    showInfoPage();
  };

  const handlePhysicalButtons = () => {
    console.log(props.buttonPress);
    if (pageMovement === "-100%") {
      if (props.buttonPress === "up") {
        decrementList();
      } else if (props.buttonPress === "down") {
        incrementList();
      } else if (props.buttonPress === "select") {
        showInfoPage();
      }
    }
    if (pageMovement === "0%") {
      if (props.buttonPress === "left") {
        decrementList();
      } else if (props.buttonPress === "right") {
        incrementList();
      } else if (props.buttonPress === "back") {
        showHomePage();
      }
    }
    if (pageMovement === "-200%") {
      if (props.buttonPress === "select") {
        searchPokemon();
      } else if (props.buttonPress === "back") {
        showHomePage();
      }
    }
  };

  useEffect(() => {
    handlePhysicalButtons();
  }, [props]);

  useEffect(() => {
    assignTempList(offset);
    assignStrings(tempList);
  }, [offset, props]);

  useEffect(() => {
    updateFontSize();

    window.addEventListener("resize", updateFontSize);

    // console.log(props.props[0]);

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  });

  return (
    <>
      <motion.div className="relative screen border-0 flex-1 flex-row flex overflow-hidden ">
        <motion.div
          animate={{ display: tutorial ? "block" : "none" }}
          className="tutorial absolute bg-pkemon-yellow z-20 flex flex-row font-Chakra_Petch "
        >
          <p
            style={{ fontSize: `${generalFontSize * 1.4}px` }}
            className="tutorial-title text-center "
          >
            TUTORIAL
          </p>
          <div className="tutorial-block flex flex-col ">
            <div className="tutorial-block-1 basis-1/2 flex flex-row">
              <div className="tutorial-icon-container basis-1/3 items-center flex justify-center">
                <Image
                  className="tutorial-icon"
                  src="/icons/dpad.svg"
                  width={100}
                  height={100}
                />
              </div>
              <div className="tutorial-text-container basis-2/3 items-center flex justify-center text-center">
                <p style={{ fontSize: `${generalFontSize * 0.85}px` }}>
                  Use the D-pad on the left of the device to navigate, Up, Down,
                  Left, Right. You can also use the provided buttons on the
                  screen
                </p>
              </div>
            </div>
            <div className="tutorial-block-2 basis-1/2 flex flex-row">
              <div className="tutorial-text-container-1 basis-2/3 items-center flex justify-center text-center">
                <p style={{ fontSize: `${generalFontSize * 0.85}px` }}>
                  Use the A button and B button on the left of the device to
                  select an option, or navigate back respectivily.
                </p>
              </div>
              <div className="tutorial-icon-container basis-1/3 items-center flex justify-center">
                <Image
                  className="tutorial-icon"
                  src="/icons/a-b.svg"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="tutorial-close  ">
            <motion.button
              onClick={() => {
                setTutorial(false);
              }}
            >
              OKAY!
            </motion.button>
          </div>
        </motion.div>
        <motion.div className="inner-3-pages-container h-full w-full flex flex-row">
          <motion.div
            className="inner-page flex-col flex relative"
            initial={{ x: "-100%" }}
            animate={{ x: pageMovement }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            <div className="Title-Nav flex flex-row">
              <button
                className="previous-button bg-menu-block basis-1/6 flex flex-row justify-center items-center"
                onClick={() => decrementList()}
              >
                <Image
                  src="/icons/angle-left-solid.svg"
                  width={20}
                  height={20}
                />
              </button>
              <motion.div
                ref={TitleRef}
                className="Title-Name font-Chakra_Petch bg-menu-block basis-4/6 text-center flex flex-col justify-center whitespace-nowrap overflow-hidden"
                style={{ fontSize: fontTitle }}
              >
                {pageMovement === "0%" ? nameWindow[3] : ""}
              </motion.div>
              <button
                className="next-button bg-menu-block basis-1/6 flex flex-row justify-center items-center"
                onClick={() => incrementList()}
              >
                <Image
                  src="/icons/angle-right-solid.svg"
                  width={20}
                  height={20}
                />
              </button>
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
                  animate={{
                    border:
                      infocardMovement === "0%" ? "solid 0.1rem #ff4c29" : "0",
                  }}
                  className="bg-menu-block basis-1/3"
                  onClick={() => handleInfoCardMovement("0%")}
                >
                  Info
                </motion.button>
                <motion.button
                  animate={{
                    border:
                      infocardMovement === "-33.33333334%"
                        ? "solid 0.1rem #ff4c29"
                        : "0",
                  }}
                  className="bg-menu-block basis-1/3"
                  onClick={() => handleInfoCardMovement("-33.33333334%")}
                >
                  Stats
                </motion.button>
                <motion.button
                  animate={{
                    border:
                      infocardMovement === "-66.6666667%"
                        ? "solid 0.1rem #ff4c29"
                        : "0",
                  }}
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
                  </div>
                  <div
                    className={` info-card evolutions  basis-1/3 ${
                      pokemonData.evolutions === undefined
                        ? ""
                        : pokemonData.evolutions.length < 4
                        ? "overflow-hidden"
                        : "overflow-scroll"
                    }`}
                    style={{ fontSize: `${generalFontSize * 0.8}px` }}
                  >
                    <div className="s1 grid grid-cols-3 grid-rows-3">
                      {pokemonData.evolutions === undefined
                        ? ""
                        : pokemonData.evolutions.map((evolution, index) => (
                            <div
                              key={index}
                              className="evolution text-center flex flex-col justify-center"
                            >
                              <motion.div
                                animate={{
                                  scale:
                                    pokemon_offsets[evolution] === offset
                                      ? 1.1
                                      : 1,
                                }}
                                onClick={() =>
                                  evolutionInfo(pokemon_offsets[evolution])
                                }
                                className="evolution-image basis-4/6 flex flex-col justify-center items-center border-2 bg-secondary-blue hover:cursor-pointer"
                              >
                                <Image
                                  className="evolution-image-sprite"
                                  src={
                                    "/base-sprites-compressed/" +
                                    pokemon_ids[
                                      pokemon_offsets[evolution]
                                    ].id.toString() +
                                    ".png"
                                  }
                                  width={100}
                                  height={100}
                                  alt={evolution}
                                />
                              </motion.div>
                              <motion.p
                                animate={{
                                  y:
                                    pokemon_offsets[evolution] === offset
                                      ? "8%"
                                      : "0",
                                }}
                                className="evolution-name basis-1/5"
                              >
                                {evolution.toUpperCase()}
                              </motion.p>
                            </div>
                          ))}
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
                  className="name-card-main bg-menu-block font-Chakra_Petch truncate ... hover:cursor-pointer "
                  style={{ fontSize: fontSizeMain }}
                  onClick={showInfoPage}
                >
                  {nameWindow[3] === undefined
                    ? ""
                    : nameWindow[3].slice(0, 20)}
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
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="basis-1/4 bg-menu-block flex items-center justify-center"
                  onClick={() => {
                    setTutorial(true);
                  }}
                >
                  <Image
                    className="flex items-center "
                    src="/icons/circle-info-solid.svg"
                    alt="search"
                    width={15}
                    height={15}
                  />
                </motion.button>
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

export default memo(Screen);
