import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ColorPicker, Modal, Switch } from "antd";
import "./styles.scss";

AddProjectModal.propTypes = {
  isOpenProjectModal: PropTypes.bool.isRequired,
};

function AddProjectModal({ isOpenProjectModal, setIsOpenProjectModal }) {
  const [color,setColor] = useState([0,0,0]) // red,green,blue
  const [name,setName] = useState('')
  const [isCheckFavorites,setIsCheckFavorites] = useState(false)

  const submitProject = () => {
    console.log(color,name)
    setColor([0,0,0])
    setName('')
    setIsOpenProjectModal(false)
  };

  const handleChangeColor = useCallback((color) => {
    const {r,g,b} = color.metaColor
    setColor([Math.floor(r),Math.floor(g),Math.floor(b)])
  },[])

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeFavorites = (checked) => {
    setIsCheckFavorites(!isCheckFavorites)
  };


  return (
    <>
      <Modal
        title="Add Project"
        closable={false}
        open={isOpenProjectModal}
        onOk={() => submitProject("hi")}
        onCancel={() => setIsOpenProjectModal(false)}
        okButtonProps={{disabled : name.length === 0}}
      
      >
        <div className="input-field">
          <ColorPicker onChange={handleChangeColor} className="color-picker" defaultValue={'rgb(219, 76, 63)'}/>
          <div className="name">
            <p>Name</p>
            <input type="text" maxLength={50} onChange={(e) => handleChangeName(e)} value={name} />
          </div>
        </div>
        <div className="switch-area">
          <Switch
            onChange={handleChangeFavorites}
            size="small"
          />
          <p>Add to Favorites</p>
        </div>
      </Modal>
    </>
  );
}

export default AddProjectModal;
