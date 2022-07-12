import LocalizedStrings from "react-localization";

export const localeStrings = new LocalizedStrings({
  en: {
    success: "Success. Task in work!",
    hello: "Hello,",
    was_completed: "Job was completed",
    not_taken: "Not taken",
    in_work: "In work",
    complete_the_task: "Complete the task",
    take_the_task: "Take the task",
    was_completed_gj: "Task was completed. Good Job!",
    language: "Language:",
  },
  "he-IL": {
    success: "Success. Task in work!",
    hello: "1 Hello,",
    was_completed: "Job was completed",
    not_taken: "Not taken",
    in_work: "In work",
    complete_the_task: "Complete the task",
    take_the_task: "Take the task",
    was_completed_gj: "Task was completed. Good Job!",
    language: ":Language",
  },
});

localeStrings.setLanguage("he-IL");
