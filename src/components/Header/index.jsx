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


function Header() {

  const [isExpandSearch, setIsExpandSearch] = useState(false)

  return (
    <div className="header-container">
      <div className="left-header-container">
        <MenuFoldOutlined className="header-icon" />
        <HomeOutlined className="header-icon" />
        <div className="search-area">
          <SearchOutlined className="search-icon" />
          {!isExpandSearch && <DoubleRightOutlined onClick={() => setIsExpandSearch(true)} className="search-expand-icon" />}
          {isExpandSearch && <CloseOutlined onClick={() => setIsExpandSearch(false)} className="search-expand-icon" />}
          <input className={clsx('search-input', isExpandSearch && 'expand-search-input')} type="text" placeholder="Search" />
        </div>
      </div>

      <div className="right-header-container">
        <PlusOutlined className="header-icon" />
        <div className="profile-avatar">
            b
        </div>
      </div>
    </div>
  );
}

export default Header;
