import React, { useCallback, useState } from "react";
import { ColorPicker, Modal, Switch } from "antd";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalAddProject } from "../../features/modal/modalSlice";
import projectAPI from "../../api/projectAPI";
import { useMutation, useQueryClient } from "react-query";
import { setToastMessage, setToastType } from "../../features/toast/toastSlice";

function AddProjectModal({ isOpenProjectModal, setIsOpenProjectModal }) {
  const [color, setColor] = useState([0, 0, 0]); // red,green,blue
  const [name, setName] = useState("");
  const [isCheckFavorites, setIsCheckFavorites] = useState(false);
  const isShowModalAddProject = useSelector(
    (state) => state.modalReducer.isShowModalAddProject
  );

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const submitProject = async () => {
    console.log(color, name);
    setColor([0, 0, 0]);
    setName("");
    const res = await projectAPI.addProject({
      project: name,
      color: `rgb(${color.join(",")})`,
    });
    dispatch(toggleModalAddProject(false));
    return res;
  };

  const addProjectMutation = useMutation({
    mutationFn: submitProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      dispatch(setToastType("success"));
      dispatch(setToastMessage("Add Project Success"));
      setTimeout(() => {
        dispatch(setToastType(""));
        dispatch(setToastMessage(""));
      }, 1000);
    },
  });

  const handleChangeColor = useCallback((color) => {
    const { r, g, b } = color.metaColor;
    setColor([Math.floor(r), Math.floor(g), Math.floor(b)]);
  }, []);
  console.log(`rgb(${color.join(",")})`);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <Modal
        title="Add Project"
        closable={false}
        open={isShowModalAddProject}
        onOk={() => addProjectMutation.mutate()}
        onCancel={() => dispatch(toggleModalAddProject(false))}
        okButtonProps={{ disabled: name.length === 0 }}
      >
        <div className="input-field">
          <ColorPicker
            onChange={handleChangeColor}
            className="color-picker"
            defaultValue={"rgb(219, 76, 63)"}
          />
          <div className="name">
            <p>Name</p>
            <input
              type="text"
              maxLength={50}
              onChange={(e) => handleChangeName(e)}
              value={name}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddProjectModal;
