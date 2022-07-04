import { DateTime } from "luxon";
import { localeStrings } from "../locales";
import classnames from "classnames";

export const TaskItem = ({ item, list, index, onClick }) => {
  const isRtl = localeStrings.getLanguage() === "heb";
  return (
    <div
      onClick={() => !item.was_completed && onClick(item, item.was_completed)}
      className={classnames({
        task: true,
        ["task-completed"]: item.was_completed,
        rtl: isRtl,
      })}
      data-id={index}
    >
      <div className="task__title" data-id={index}>
        <div>{item.task_name}</div>
        <span className="task__status">
          {item.helper_id && !item.was_completed
            ? localeStrings.in_work
            : item.was_completed
            ? localeStrings.was_completed
            : ""}
        </span>
      </div>
      <div className="task__time" data-id={index}>
        {DateTime.fromSeconds(Number(item.date)).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
      </div>
    </div>
  );
};
