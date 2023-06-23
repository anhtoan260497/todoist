import React, { useCallback, useState } from "react";
import { ColorPicker, Modal, Switch } from "antd";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAddProject } from "../../features/modal/modalSlice";

function AddProjectModal({ isOpenProjectModal, setIsOpenProjectModal }) {
  const [color,setColor] = useState([0,0,0]) // red,green,blue
  const [name,setName] = useState('')
  const [isCheckFavorites,setIsCheckFavorites] = useState(false)
  const isShowModalAddProject =  useSelector(state => state.modalReducer.isShowModalAddProject)

  const dispatch = useDispatch()

  const submitProject = () => {
    console.log(color,name)
    setColor([0,0,0])
    setName('')
    dispatch(toggleModalAddProject(false))
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
        open={isShowModalAddProject}
        onOk={() => submitProject("hi")}
        onCancel={() => dispatch(toggleModalAddProject(false))}
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
