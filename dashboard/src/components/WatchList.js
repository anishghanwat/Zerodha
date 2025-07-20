import React, { useState, useContext } from "react";

import { Tooltip, Grow } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";

const WatchList = () => {
  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          return (
            <WatchListItem stock={stock} key={index} />
          )
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  }

  const handleMouseLeave = (e) => {
    setHover(false);
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item" >
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <ArrowDropDownIcon className="down" />) : (
            <ArrowDropUpIcon className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {hover && (
        <WatchListActions uid={stock.name} />
      )}
    </li>
  )
}

const WatchListActions = ({ uid }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);
  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" arrow placement="top" TransitionComponent={Grow} >
          <button className="buy" onClick={() => openBuyWindow(uid)}>Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" arrow placement="top" TransitionComponent={Grow} >
          <button className="sell" onClick={() => openSellWindow(uid)}>Sell</button>
        </Tooltip>
        <Tooltip title="Analytics (A)" arrow placement="top" TransitionComponent={Grow} >
          <button className="chart"><BarChartIcon className="icon" /></button>
        </Tooltip>
        <Tooltip title="More" arrow placement="top" TransitionComponent={Grow} >
          <button className="action"><MoreHorizIcon className="icon" /></button>
        </Tooltip>
      </span>
    </span>
  )
}