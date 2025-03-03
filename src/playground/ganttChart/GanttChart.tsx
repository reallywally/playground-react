import React, { useState } from "react";
import { format, differenceInDays, parseISO, addMonths } from "date-fns";

const tasksData = [
  {
    id: 1,
    name: "Task 1",
    start: "2025-05-01",
    end: "2025-05-10",
    subtasks: [
      { id: 4, name: "Subtask 1", start: "2025-05-02", end: "2025-05-07" },
    ],
  },
  {
    id: 2,
    name: "Task 2",
    start: "2025-05-05",
    end: "2025-05-15",
    subtasks: [],
  },
  {
    id: 3,
    name: "Task 3",
    start: "2025-05-08",
    end: "2025-06-01",
    subtasks: [
      { id: 5, name: "Subtask 2", start: "2025-05-10", end: "2025-05-20" },
    ],
  },
];

const minDate = parseISO("2025-05-01");
const maxDate = parseISO("2025-07-01");
const totalDays = differenceInDays(maxDate, minDate);
const totalMonths = Math.ceil(totalDays / 30);
const monthsArray = Array.from({ length: totalMonths }, (_, i) =>
  addMonths(minDate, i)
);

const GanttTask = ({ task }) => {
  const taskStart = parseISO(task.start);
  const taskEnd = parseISO(task.end);
  const startOffset = (differenceInDays(taskStart, minDate) / totalDays) * 100;
  const duration = (differenceInDays(taskEnd, taskStart) / totalDays) * 100;

  return (
    <>
      <div className="flex border-b p-2 relative w-max min-w-full">
        <div className="w-48 sticky left-0 bg-white border-r z-10 font-bold">
          {task.name}
        </div>
        <div className="relative h-8 flex w-full">
          {monthsArray.map((month) => (
            <div key={month.toString()} className="w-40 border-r"></div>
          ))}
          <div
            className="bg-blue-500 h-6 rounded absolute"
            style={{ left: `${startOffset}%`, width: `${duration}%` }}
          ></div>
        </div>
      </div>
      {task.subtasks &&
        task.subtasks.map((subtask) => (
          <GanttTask key={subtask.id} task={subtask} />
        ))}
    </>
  );
};

const GanttChart: React.FC = () => {
  const [tasks] = useState(tasksData);

  return (
    <div className="w-full p-4 overflow-x-auto">
      {/* 타임라인 헤더 (월 단위) */}
      <div className="flex bg-gray-200 p-2 text-center font-bold w-max min-w-full">
        <div className="w-48 sticky left-0 bg-gray-200">Task</div>
        <div className="flex">
          {monthsArray.map((month) => (
            <div key={month.toString()} className="w-40 border-r text-sm">
              {format(month, "yyyy MMM")}
            </div>
          ))}
        </div>
      </div>

      {/* 작업 목록 및 Gantt 바 */}
      <div className="flex flex-col w-max min-w-full">
        {tasks.map((task) => (
          <GanttTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
