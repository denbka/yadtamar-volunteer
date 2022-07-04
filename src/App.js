import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { getProgress, getTasks, getUserData, updateTask } from "./api";
import { Modal } from "./components/Modal";
import { TaskItem } from "./components/TaskItem";
import { localeStrings } from "./locales";

const setProgressTask = (progress) => {
  if (!document.querySelector(".modal-progress-spinner")) return;
  document.querySelector(".modal-progress-spinner").style.background =
    "conic-gradient(#2daab2 " + progress + "%,#fff " + progress + "%)";

  document.querySelector(".modal-middle-circle").innerHTML =
    progress.toString() + "%";
};

const setProgressHeader = (progress) => {
  document.querySelector(".header-progress-spinner").style.background =
    "conic-gradient(#F3C26A " + progress + "%,#4A6CB0 " + progress + "%)";

  document.querySelector(".header-middle-circle").innerHTML =
    progress.toString() + "%";
};

function App() {
  const [progress, setProgress] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData().then((res) => setUserData(res));
  }, []);
  useEffect(() => {
    const weeks = {};
    getTasks().then((res) => {
      res.map((item) => {
        if (item.time_type === "no_time") return;
        const currentWeekLastTime = DateTime.now().toMillis();
        const isBeforeNow =
          DateTime.fromSeconds(Number(item.date) ?? 0)
            .minus({ milliseconds: currentWeekLastTime })
            .plus({ day: 1 })
            .toMillis() < 0;
        const currentItemWeek = isBeforeNow
          ? DateTime.fromSeconds(Number(item.date)).toLocaleString()
          : DateTime.fromSeconds(Number(item.date))
              .startOf("day")
              .get("weekdayLong");

        weeks[currentItemWeek] = [...(weeks[currentItemWeek] ?? []), item];
      });
      res.map((item) => {
        if (item.time_type === "no_time") {
          weeks["Todo list"] = [...(weeks["Todo list"] ?? []), item];
        }
      });
      setTasks(weeks);
    });
    getProgress().then((res) => setProgress(res));
  }, [modalContent]);

  useEffect(() => {
    if (!userData) return;
    setProgressTask(progress);
    setProgressHeader(progress);
  }, [progress, userData]);

  const handleUpdate = (data) => {
    updateTask(data, userData?.helper_name).then((item) =>
      setModalContent(
        <ModalSuccess data={item}>{localeStrings.success}</ModalSuccess>
      )
    );
  };
  const handleClick = (item, was_completed) => {
    setModalContent(
      !was_completed ? (
        <ModalTodo onUpdate={handleUpdate} data={item} />
      ) : (
        <ModalSuccess data={item} />
      )
    );
  };

  return (
    <div className="body">
      {userData && (
        <div className="header">
          <div className="title">
            {localeStrings.hello} {userData?.name}!
          </div>
          <div className="progress__container">
            <div className="progress__container header-progress">
              <div id="middle-circle" className="header-middle-circle"></div>
              <div
                id="progress-spinner"
                className="header-progress-spinner"
              ></div>
            </div>
          </div>
        </div>
      )}
      <div className="task-list">
        {Object.entries(tasks).map(([week, tasks]) => (
          <div className="date">
            <div className="date__container">
              <div className="date__title">{week}</div>
              <div className="date__icon">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path
                    d="M10.9907 20.9159C5.46772 20.9159 0.990723 16.4389 0.990723 10.9159C0.990723 5.39289 5.46772 0.915894 10.9907 0.915894C16.5137 0.915894 20.9907 5.39289 20.9907 10.9159C20.9907 16.4389 16.5137 20.9159 10.9907 20.9159ZM10.9907 18.9159C13.1125 18.9159 15.1473 18.073 16.6476 16.5727C18.1479 15.0725 18.9907 13.0376 18.9907 10.9159C18.9907 8.79416 18.1479 6.75933 16.6476 5.25904C15.1473 3.75875 13.1125 2.91589 10.9907 2.91589C8.86899 2.91589 6.83416 3.75875 5.33387 5.25904C3.83358 6.75933 2.99072 8.79416 2.99072 10.9159C2.99072 13.0376 3.83358 15.0725 5.33387 16.5727C6.83416 18.073 8.86899 18.9159 10.9907 18.9159ZM11.9907 10.9159H15.9907V12.9159H9.99072V5.91589H11.9907V10.9159Z"
                    fill="#FDB32C"
                  />
                </svg>
              </div>
            </div>
            {tasks.map((task, index) => (
              <TaskItem
                onClick={handleClick}
                item={task}
                list={tasks}
                index={index}
              />
            ))}
            <hr className="divider" />
          </div>
        ))}
      </div>
      <Modal onHidden={setModalContent} isOpen={!!modalContent}>
        {modalContent}
      </Modal>
    </div>
  );
}

const getStatus = (data) => {
  if (data.helper_id && data.was_completed) {
    return localeStrings.was_completed;
  }
  return !data?.helper_id ? localeStrings.not_taken : localeStrings.in_work;
};

const ModalTodo = ({ data, onUpdate }) => {
  return (
    <div className="modal__task">
      <div className="modal__task__status">{getStatus(data)}</div>
      <div className="modal__task__title">{data.task_name}</div>
      <div className="modal__task__date">
        {DateTime.fromSeconds(Number(data.date)).toLocaleString()}
      </div>
      <hr className="divider" />
      <div className="modal__task__description">{data.comments}</div>
      <div className="task__title" onClick={() => onUpdate(data)}>
        {data.helper_id
          ? localeStrings.complete_the_task
          : localeStrings.take_the_task}
      </div>
    </div>
  );
};
const ModalSuccess = ({ children }) => {
  return (
    <div className="modal__progress">
      <div className="modal__progress__title">
        {children ? children : localeStrings.was_completed_gj}
      </div>
      {/* <div className="progress__container">
        <div id="middle-circle" className="modal-middle-circle"></div>
        <div id="progress-spinner" className="modal-progress-spinner"></div>
      </div> */}
    </div>
  );
};

export default App;
