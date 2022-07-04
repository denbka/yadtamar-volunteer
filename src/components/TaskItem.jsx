import { DateTime } from "luxon";
import { localeStrings } from "../locales";

export const TaskItem = ({ item, list, index, onClick }) => {
  return (
    <div
      onClick={() => !item.was_completed && onClick(item, item.was_completed)}
      className={item.was_completed ? "task task-completed" : "task"}
      data-id={index}
    >
      <div className="task__title" data-id={index}>
        {item.task_name}
      </div>
      <div className="task__time" data-id={index}>
        {DateTime.fromSeconds(Number(item.date)).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </div>
      <span className="task__status">
        {item.helper_id && !item.was_completed
          ? localeStrings.in_work
          : item.was_completed
          ? localeStrings.was_completed
          : ""}
      </span>
    </div>
  );
};
