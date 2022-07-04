import { getQueryParams } from "./utils";

export const getTasks = async () => {
  const { token, family_id } = getQueryParams();
  try {
    return await fetch(
      `https://tamar.project-babaev.ru/api/tasks/tasks-for-family/${family_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    ).then((res) => res.json());
  } catch (e) {
    return "no tasks for this family";
  }
};

export const getUserData = async () => {
  const { token } = getQueryParams();
  try {
    return await fetch(
      `https://tamar.project-babaev.ru/api/auth/get-user-data`,
      {
        headers: {
          Authorization: token,
        },
      }
    ).then((res) => res.json());
  } catch (e) {
    return null;
  }
};

export const getProgress = async () => {
  const { token, family_id } = getQueryParams();
  try {
    return await fetch(
      `https://tamar.project-babaev.ru/api/tasks/task-percent/${family_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    ).then((res) => res.json());
  } catch (e) {
    return null;
  }
};

export const updateTask = async (task, helper_name) => {
  const { token, user_id } = getQueryParams();
  const was_completed = !!task.helper_id;
  try {
    return await fetch(
      `https://tamar.project-babaev.ru/api/tasks/${task.task_id}`,
      {
        method: "put",
        body: JSON.stringify({
          ...task,
          helper_id: user_id,
          helper_name,
          was_completed,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then((res) => res.json());
  } catch (e) {
    console.log(e);
  }
};
