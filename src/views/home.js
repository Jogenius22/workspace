import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import { Helmet } from "react-helmet";

import "./home.css";
import "../components/form.css";
import Bot from "../assets/bot.svg";
import User from "../assets/user.svg";

const configuration = new Configuration({
  apiKey: pro.env.REACT_APP_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [inputValues, setInputValues] = useState([]);
  const [responses, setResponses] = useState([]);
  const [context, setContext] = useState(""); // initialize context to an empty string

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chapGPT = async (prompt, context) => {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are AI that generate storylines for a text-based adventure game. You facilitate player interactions with the game, Create a realistic and engaging universe based on this details (Explorer's Rift is an exciting adventure game set in the vast Water World. The game revolves around the explorers and factions who are on a mission to search for treasures and KappaX eggs hidden in the Water World. The main characters of the game are explorers, and there are six factions in total: Samu, Wingle, Ani, Searcho, Gamezoo, and Wingle. The Water World is a vast universe that players can explore using their Nesters. The only known island in the Water World is Openshore, which serves as the home of the explorers and factions. There are nine underwater castles called Tribedens that players can explore. Each Tribeden is controlled by a mermaid queen named Delfina. There are different mermaid species in the game such as Delfina Queen, Nubela Tribeden Guardians, Brynn Queen's spies, Shimmer City Hunters, and Nixie citizens of the Tribedens. Players use their Nesters to navigate through the Water World and encounter unique monsters and islands along the way. Each faction has its own unique ship design that reflects their individual traits, strengths, and expertise. Although each explorer has their own Nester, each faction has a standard that they follow. The ultimate goal of Explorer's Rift is to find KappaX eggs and hidden treasures in the Water World. KappaX eggs come in four different rarities: ultra-rare Ghost, rare Aquator, uncommon Dragon, and common Chimera. Players can also collect MERMAID tokens, WATER tokens, and Parrot Coins as they explore. Overall Explorer's Rift offers an exciting adventure experience with unique characters to meet and challenges to overcome. ) So Act like you are an Old-School Text-Based Adventure game, where you generate a story in 3-4 sentences and end it with 'What do you do?' and the player will respond with what they want to do. Interpret player responses and generate appropriate follow-up prompts and storylines, Note: your response should always end with 'What do you do?' So the game can keep on going",
          },
          { role: "user", content: context + prompt },
        ],
        max_tokens: 256,
      });
      setResponses([
        ...responses,
        response["data"]["choices"][0]["message"]["content"],
      ]);
      setContext([...responses.slice(-5)]);
    };

    setInputValues([...inputValues, inputValue]);
    chapGPT(inputValue, context);
    setInputValue("");
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Landify</title>
        <meta property="og:title" content="Landify" />
      </Helmet>
      <div data-role="Header" className="home-header-container">
        <header className="home-header">
          <div className="home-logo">
            <img
              alt="image"
              src="/assets/Logo.png"
              className="home-image"
            />
          </div>
        </header>
      </div>
      <main className="home-main">
        <div className="home-container1">
          <h2 className="home-text Headline2">Genius AI</h2>
          <p className="home-text1">
            Lorem ipsum is common placeholder text used to demonstrate the
            graphic elements of a document or visual presentation.
          </p>
        </div>
        <div className="home-container2">
          <div id="chat_container">
            <div className="cente">
              <div className="conte"></div>
              {inputValues.map((inputValue, index) => (
                <div key={index} className="cent">
                  <div className="cont">
                    <img src={User} alt="send" className="ico" />
                    <p className="home-text2">{inputValue}</p>
                  </div>
                  {responses[index] && (
                    <div className="cont responsebg">
                      <img src={Bot} alt="send" className="ico" />
                      <p className="api-response home-text2">
                        {responses[index]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="inputPromptWrapper">
              <input
                name="inputPrompt"
                id=""
                className="inputPromptTextarea textarea"
                type="text"
                //   rows="1"
                placeholder="Enter your Name or Type Start to Begin"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                aria-label="form submit"
                type="submit"
                className="buttoncolor"
              >
                <svg
                  fill="#FFFFFF"
                  width="15"
                  height="20"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#FFFFFF"
                  strokeWidth="0"
                >
                  <title>submit form</title>
                  <path
                    d="m30.669 1.665-.014-.019a.73.73 0 0 0-.16-.21h-.001c-.013-.011-.032-.005-.046-.015-.02-.016-.028-.041-.05-.055a.713.713 0 0 0-.374-.106l-.05.002h.002a.628.628 0 0 0-.095.024l.005-.001a.76.76 0 0 0-.264.067l.005-.002-27.999 16a.753.753 0 0 0 .053 1.331l.005.002 9.564 4.414v6.904a.75.75 0 0 0 1.164.625l-.003.002 6.259-4.106 9.015 4.161c.092.043.2.068.314.068H28a.75.75 0 0 0 .747-.695v-.002l2-27.999c.001-.014-.008-.025-.008-.039l.001-.032a.739.739 0 0 0-.073-.322l.002.004zm-4.174 3.202-14.716 16.82-8.143-3.758zM12.75 28.611v-4.823l4.315 1.992zm14.58.254-8.32-3.841c-.024-.015-.038-.042-.064-.054l-5.722-2.656 15.87-18.139z"
                    stroke="none"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="home-footer">
        <footer className="home-container3">
          <div className="home-divider"></div>
          <div className="home-container4">
            <span className="home-text2 Body2">
              © 2023 Genius AI. All rights reserved
            </span>
          </div>
        </footer>
      </footer>
    </div>
  );
}

export default Home;
