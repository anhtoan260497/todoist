import React from "react";
import { useQuery } from "react-query";
import taskAPI from "../api/taskAPI";
import { useParams } from "react-router-dom";

const useTaskQuery = () => {

  const taskQuery = useQuery({
    queryKey: ["task"],
    queryFn: taskAPI.getAllTask,
    refetchOnWindowFocus: false
    
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
