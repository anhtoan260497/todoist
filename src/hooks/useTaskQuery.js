import React from "react";
import { useQuery } from "react-query";
import taskAPI from "../api/taskAPI";

const useTaskQuery = () => {
  const taskQuery = useQuery({
    queryKey: ["task"],
    queryFn: taskAPI.getAllTask,
  });

  if (taskQuery.isLoading)
    return {
      isLoading: true,
    };

  if (taskQuery.isError)
    return {
      isLoading: false,
      isError: true,
    };
    
  if (taskQuery.isSuccess)
    return {
      isLoading: false,
      tasks: taskQuery.data,
    };
};

export default useTaskQuery;
