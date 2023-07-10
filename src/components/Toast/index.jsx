import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Toast = () => {
  const toastType = useSelector((state) => state.toastReducer.toastType);
  const toastMessage = useSelector((state) => state.toastReducer.toastMessage);

  useEffect(() => {
    if (toastType === "error") errorNotification();
    if (toastType === "success") successNotification();
    if (toastType === "warning") warningNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastType]);

  const [api, contextHolder] = notification.useNotification();

  const errorNotification = () => {
    api.open({
      message: "Error",
      description: toastMessage,
      icon: (
        <CloseCircleOutlined
          style={{
            color: "rgb(248,30,34)",
          }}
        />
      ),
    });
  };

  const successNotification = () => {
    api.open({
      message: "Message",
      description: toastMessage,
      icon: (
        <CheckCircleOutlined
          style={{
            color: "rgb(11,130,53)",
          }}
        />
      ),
    });
  };

  const warningNotification = () => {
    api.open({
      message: "Warning",
      description: toastMessage,
      icon: (
        <WarningOutlined
          style={{
            color: "rgb(238,153,2)",
          }}
        />
      ),
    });
  };

  return <>{contextHolder}</>;
};
export default Toast;
