import React from "react";
import { useQuery } from "react-query";
import taskAPI from "../api/taskAPI";
import projectAPI from "../api/projectAPI";

const useProjectQuery = () => {
  const projectQuery = useQuery({
    queryKey: ["project"],
    queryFn: projectAPI.getAllProject,
  });

  if (projectQuery.isLoading)
    return {
      isLoading: true,
    };

  if (projectQuery.isError)
    return {
      isLoading: false,
      isError: true,
    };
    
  if (projectQuery.isSuccess)
    return {
      isLoading: false,
      projects: projectQuery.data,
    };
};

export default useProjectQuery;
