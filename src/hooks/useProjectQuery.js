import React from "react";
import { useQuery } from "react-query";
import taskAPI from "../api/taskAPI";
import projectAPI from "../api/projectAPI";
import { useParams } from "react-router-dom";
import { checkTaskDateType } from "../helper";

const useProjectQuery = (type) => {
  const params = useParams();

  const projectQuery = useQuery({
    queryKey: ["task","project"],
    queryFn: projectAPI.getAllProject,
    refetchOnWindowFocus : false
  });

  const filterProject = () => {
    if (type === 'leftMenu') return projectQuery.data;
    const tasks = projectQuery.data.filter((item) => item._id === params.id);
    if(tasks.length === 0) return projectQuery.data;
    const currentTasks = tasks[0].tasks;
    const projectTasks = {
      today: [],
      overdue: [],
      upcoming: [],
    }
    // eslint-disable-next-line array-callback-return
    currentTasks.map((item) => {
      const type = checkTaskDateType(item.date);
      if (type === "overdue") projectTasks.overdue.push(item);
      if (type === "today") projectTasks.today.push(item);
      if (type === "upcoming") projectTasks.upcoming.push(item);
    });

    return projectTasks;
  };

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
      projects: filterProject(),
    };
};

export default useProjectQuery;
