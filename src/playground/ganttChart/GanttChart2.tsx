import React, { useState, useRef, useEffect } from "react";

// 타입 정의
interface SubTask {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  assignee: string;
  parentId?: number;
}

interface Task {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  assignee: string;
  expanded: boolean;
  subTasks: SubTask[];
}

const GanttChart: React.FC = () => {
  // 간트 차트 스크롤 영역 참조
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 샘플 데이터
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "프로젝트 기획",
      startDate: "2025-03-20",
      endDate: "2025-04-01",
      assignee: "김철수",
      expanded: true,
      subTasks: [
        {
          id: 11,
          title: "요구사항 분석",
          startDate: "2025-03-20",
          endDate: "2025-03-25",
          assignee: "김철수",
        },
        {
          id: 12,
          title: "기술 스택 선정",
          startDate: "2025-03-25",
          endDate: "2025-04-01",
          assignee: "박영희",
        },
      ],
    },
    {
      id: 2,
      title: "디자인",
      startDate: "2025-04-01",
      endDate: "2025-04-15",
      assignee: "이지연",
      expanded: false,
      subTasks: [
        {
          id: 21,
          title: "UI 디자인",
          startDate: "2025-04-01",
          endDate: "2025-04-10",
          assignee: "이지연",
        },
        {
          id: 22,
          title: "사용자 테스트",
          startDate: "2025-04-10",
          endDate: "2025-04-15",
          assignee: "이지연",
        },
      ],
    },
  ]);

  // 새 업무 템플릿
  const newTaskTemplate = (): Task => ({
    id: Date.now(),
    title: "새 업무",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    assignee: "",
    expanded: false,
    subTasks: [],
  });

  // 새 하위 업무 템플릿
  const newSubTaskTemplate = (parentId: number): SubTask => ({
    id: Date.now(),
    title: "새 하위 업무",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    assignee: "",
    parentId,
  });

  // 날짜 범위 계산
  const calculateDateRange = (): { minDate: Date; maxDate: Date } => {
    let minDate = new Date();
    let maxDate = new Date();

    tasks.forEach((task) => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);

      if (taskStartDate < minDate) minDate = taskStartDate;
      if (taskEndDate > maxDate) maxDate = taskEndDate;

      task.subTasks.forEach((subTask) => {
        const subTaskStartDate = new Date(subTask.startDate);
        const subTaskEndDate = new Date(subTask.endDate);

        if (subTaskStartDate < minDate) minDate = subTaskStartDate;
        if (subTaskEndDate > maxDate) maxDate = subTaskEndDate;
      });
    });

    // 시작일에서 1일 빼고, 종료일에 1일 더해서 여유 공간 확보
    minDate.setDate(minDate.getDate() - 1);
    maxDate.setDate(maxDate.getDate() + 1);

    return { minDate, maxDate };
  };

  const dateRange = calculateDateRange();
  const totalDays = Math.ceil(
    (dateRange.maxDate.getTime() - dateRange.minDate.getTime()) /
      (24 * 60 * 60 * 1000)
  );

  // 일 단위 헤더 생성
  const generateDateHeaders = (): JSX.Element[] => {
    const headers: JSX.Element[] = [];
    const currentDate = new Date(dateRange.minDate);

    for (let i = 0; i < totalDays; i++) {
      headers.push(
        <div key={`date-${i}`} className="text-center text-xs p-1 border-r w-8">
          {currentDate.getDate()}
        </div>
      );
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return headers;
  };

  // 월 단위 헤더 생성 - 수정된 버전
  const generateMonthHeaders = (): JSX.Element[] => {
    const months: JSX.Element[] = [];
    const currentDate = new Date(dateRange.minDate);

    let monthStart = 0;
    let daysInCurrentMonth = 0;
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    for (let i = 0; i < totalDays; i++) {
      const day = new Date(currentDate);
      day.setDate(day.getDate() + i);

      // 월이 바뀌거나 마지막 날인 경우
      if (day.getMonth() !== currentMonth || i === totalDays - 1) {
        // 현재 월에 대한 헤더 추가
        months.push(
          <div
            key={`month-${currentYear}-${currentMonth}`}
            className="text-center font-semibold border-r bg-gray-100"
            style={{
              gridColumnStart: monthStart + 1,
              gridColumnEnd: monthStart + daysInCurrentMonth + 1,
            }}
          >
            {new Date(currentYear, currentMonth).toLocaleString("ko-KR", {
              month: "short",
              year: "numeric",
            })}
          </div>
        );

        // 다음 월을 위한 초기화
        monthStart += daysInCurrentMonth;
        daysInCurrentMonth = 1;
        currentMonth = day.getMonth();
        currentYear = day.getFullYear();
      } else {
        daysInCurrentMonth++;
      }
    }

    return months;
  };

  // 간트 차트 바 위치 계산
  const calculateBarPosition = (
    startDate: string,
    endDate: string
  ): { startOffset: number; duration: number } => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startOffset = Math.round(
      (start.getTime() - dateRange.minDate.getTime()) / (24 * 60 * 60 * 1000)
    );
    const duration = Math.max(
      1,
      Math.round((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1
    );

    return { startOffset, duration };
  };

  // 업무 확장/축소 토글
  const toggleExpand = (taskId: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, expanded: !task.expanded } : task
      )
    );
  };

  // 새 업무 추가
  const addNewTask = (): void => {
    setTasks([...tasks, newTaskTemplate()]);
  };

  // 새 하위 업무 추가
  const addNewSubTask = (parentId: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === parentId
          ? {
              ...task,
              subTasks: [...task.subTasks, newSubTaskTemplate(parentId)],
            }
          : task
      )
    );
  };

  // 업무 업데이트
  const updateTask = (
    taskId: number,
    field: keyof Task | keyof SubTask,
    value: string,
    isSubTask: boolean = false,
    parentId: number | null = null
  ): void => {
    if (isSubTask && parentId !== null) {
      setTasks(
        tasks.map((task) =>
          task.id === parentId
            ? {
                ...task,
                subTasks: task.subTasks.map((subTask) =>
                  subTask.id === taskId
                    ? { ...subTask, [field]: value }
                    : subTask
                ),
              }
            : task
        )
      );
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, [field]: value as any } : task
        )
      );
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">프로젝트 간트 차트</h2>

      <div className="mb-4">
        <button
          onClick={addNewTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          새 업무 추가
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex border-b">
          {/* 고정 영역 */}
          <div className="flex" style={{ minWidth: "260px" }}>
            <div className="font-bold p-2 w-64">업무</div>
          </div>
          <div className="flex" style={{ minWidth: "96px" }}>
            <div className="font-bold p-2 w-32">시작일</div>
          </div>
          <div className="flex" style={{ minWidth: "96px" }}>
            <div className="font-bold p-2 w-32">종료일</div>
          </div>
          <div className="flex" style={{ minWidth: "96px" }}>
            <div className="font-bold p-2 w-32">담당자</div>
          </div>

          {/* 스크롤 영역 */}
          <div className="flex-grow overflow-x-auto" ref={scrollContainerRef}>
            <div className="grid grid-flow-col auto-cols-min">
              {generateMonthHeaders()}
            </div>
            <div className="grid grid-flow-col auto-cols-min">
              {generateDateHeaders()}
            </div>
          </div>
        </div>

        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <div className="flex border-b hover:bg-gray-50">
              {/* 고정 영역 */}
              <div className="flex items-center p-2 w-64">
                <button
                  onClick={() => toggleExpand(task.id)}
                  className="mr-2 w-6 h-6 flex items-center justify-center"
                >
                  {task.expanded ? "−" : "+"}
                </button>
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => updateTask(task.id, "title", e.target.value)}
                  className="border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none flex-grow"
                />
              </div>
              <div className="p-2 w-32">
                <input
                  type="date"
                  value={task.startDate}
                  onChange={(e) =>
                    updateTask(task.id, "startDate", e.target.value)
                  }
                  className="border rounded p-1 w-full"
                />
              </div>
              <div className="p-2 w-32">
                <input
                  type="date"
                  value={task.endDate}
                  onChange={(e) =>
                    updateTask(task.id, "endDate", e.target.value)
                  }
                  className="border rounded p-1 w-full"
                />
              </div>
              <div className="p-2 w-32">
                <input
                  type="text"
                  value={task.assignee}
                  onChange={(e) =>
                    updateTask(task.id, "assignee", e.target.value)
                  }
                  placeholder="담당자"
                  className="border rounded p-1 w-full"
                />
              </div>

              {/* 스크롤 영역 */}
              <div className="flex-grow overflow-hidden">
                <div className="relative h-10 grid grid-flow-col auto-cols-min">
                  {generateDateHeaders().map((_, index) => (
                    <div
                      key={`bg-${index}`}
                      className="w-8 h-full border-r"
                    ></div>
                  ))}
                  {(() => {
                    const { startOffset, duration } = calculateBarPosition(
                      task.startDate,
                      task.endDate
                    );
                    return (
                      <div
                        className="absolute h-6 mt-2 rounded bg-blue-500 text-white text-xs flex items-center justify-center px-1 overflow-hidden"
                        style={{
                          left: `${startOffset * 32}px`,
                          width: `${duration * 32 - 4}px`,
                        }}
                      >
                        {task.title}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {task.expanded &&
              task.subTasks.map((subTask) => (
                <div key={subTask.id} className="flex border-b bg-gray-50">
                  {/* 고정 영역 */}
                  <div className="p-2 pl-10 w-64">
                    <input
                      type="text"
                      value={subTask.title}
                      onChange={(e) =>
                        updateTask(
                          subTask.id,
                          "title",
                          e.target.value,
                          true,
                          task.id
                        )
                      }
                      className="border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none w-full"
                    />
                  </div>
                  <div className="p-2 w-32">
                    <input
                      type="date"
                      value={subTask.startDate}
                      onChange={(e) =>
                        updateTask(
                          subTask.id,
                          "startDate",
                          e.target.value,
                          true,
                          task.id
                        )
                      }
                      className="border rounded p-1 w-full"
                    />
                  </div>
                  <div className="p-2 w-32">
                    <input
                      type="date"
                      value={subTask.endDate}
                      onChange={(e) =>
                        updateTask(
                          subTask.id,
                          "endDate",
                          e.target.value,
                          true,
                          task.id
                        )
                      }
                      className="border rounded p-1 w-full"
                    />
                  </div>
                  <div className="p-2 w-32">
                    <input
                      type="text"
                      value={subTask.assignee}
                      onChange={(e) =>
                        updateTask(
                          subTask.id,
                          "assignee",
                          e.target.value,
                          true,
                          task.id
                        )
                      }
                      placeholder="담당자"
                      className="border rounded p-1 w-full"
                    />
                  </div>

                  {/* 스크롤 영역 */}
                  <div className="flex-grow overflow-hidden">
                    <div className="relative h-10 grid grid-flow-col auto-cols-min">
                      {generateDateHeaders().map((_, index) => (
                        <div
                          key={`bg-sub-${index}`}
                          className="w-8 h-full border-r"
                        ></div>
                      ))}
                      {(() => {
                        const { startOffset, duration } = calculateBarPosition(
                          subTask.startDate,
                          subTask.endDate
                        );
                        return (
                          <div
                            className="absolute h-6 mt-2 rounded bg-green-500 text-white text-xs flex items-center justify-center px-1 overflow-hidden"
                            style={{
                              left: `${startOffset * 32}px`,
                              width: `${duration * 32 - 4}px`,
                            }}
                          >
                            {subTask.title}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}

            {task.expanded && (
              <div className="flex border-b bg-gray-100">
                <div className="p-2 pl-10 w-64">
                  <button
                    onClick={() => addNewSubTask(task.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    + 하위 업무 추가
                  </button>
                </div>
                <div className="w-96"></div>
                <div className="flex-grow"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
