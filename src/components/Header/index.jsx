import React, { useState } from "react";
import "./styles.scss";
import {
  CloseOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import clsx from 'clsx'
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../../features/menu/menuSlice";
import { toggleModalAddTask } from "../../features/modal/modalSlice";


function Header() {

  const [isExpandSearch, setIsExpandSearch] = useState(false)
  const isActiveMenu = useSelector(state => state.menuReducer.isActiveMenu)
  const dispatch = useDispatch()

  const handleClickMenuIcon = () => {
    dispatch(setActiveMenu(!isActiveMenu))
  }

  return (
    <div className="header-container">
      <div className="left-header-container">
        <MenuFoldOutlined className="header-icon" onClick={() => handleClickMenuIcon()} />
        <HomeOutlined className="header-icon" />
        <div className="search-area">
          <SearchOutlined className="search-icon" />
          {!isExpandSearch && <DoubleRightOutlined onClick={() => setIsExpandSearch(true)} className="search-expand-icon" />}
          {isExpandSearch && <CloseOutlined onClick={() => setIsExpandSearch(false)} className="search-expand-icon" />}
          <input className={clsx('search-input', isExpandSearch && 'expand-search-input')} type="text" placeholder="Search" />
        </div>
      </div>

      <div className="right-header-container">
        <PlusOutlined className="header-icon" onClick={() => dispatch(toggleModalAddTask(true))} />
        <div className="profile-avatar">
            b
        </div>
      </div>
    </div>
  );
}

export default Header;
