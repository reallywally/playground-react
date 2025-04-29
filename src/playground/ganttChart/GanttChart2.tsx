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

interface DateCell {
  date: Date;
  day: number;
  month: number;
  year: number;
}

const GanttChart: React.FC = () => {
  // 간트 차트 스크롤 영역 참조
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 드래그앤드롭 상태 관리
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

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
    {
      id: 3,
      title: "개발",
      startDate: "2025-03-25",
      endDate: "2025-04-30",
      assignee: "홍길동",
      expanded: false,
      subTasks: [],
    },
    {
      id: 4,
      title: "디자인",
      startDate: "2025-03-19",
      endDate: "2025-03-23",
      assignee: "김영수",
      expanded: false,
      subTasks: [],
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

  // 날짜 배열 생성
  const generateDateCells = (): DateCell[] => {
    // 프로젝트의 시작일과 종료일을 계산
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

    // 시작일에서 최소 3일 전부터 시작
    minDate.setDate(minDate.getDate() - 3);
    // 종료일에서 최소 3일 후까지 표시
    maxDate.setDate(maxDate.getDate() + 3);

    // 날짜 셀 배열 생성
    const cells: DateCell[] = [];
    const currentDate = new Date(minDate);

    while (currentDate <= maxDate) {
      cells.push({
        date: new Date(currentDate),
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return cells;
  };

  const dateCells = generateDateCells();

  // 월 단위 헤더 생성
  const generateMonthHeaders = (): JSX.Element[] => {
    const monthHeaders: JSX.Element[] = [];
    let currentYear = -1;
    let currentMonth = -1;
    let startIdx = 0;

    dateCells.forEach((cell, idx) => {
      if (cell.month !== currentMonth || cell.year !== currentYear) {
        // 새로운 월이 시작될 때 이전 월 헤더 추가
        if (currentMonth !== -1) {
          const colSpan = idx - startIdx;
          monthHeaders.push(
            <div
              key={`month-${currentYear}-${currentMonth}`}
              className="text-center font-semibold bg-gray-100 border-r border-b py-1"
              style={{ gridColumnStart: startIdx + 1, gridColumnEnd: idx + 1 }}
            >
              {`${currentYear}년 ${currentMonth + 1}월`}
            </div>
          );
        }

        // 새 월 시작점 업데이트
        startIdx = idx;
        currentMonth = cell.month;
        currentYear = cell.year;
      }
    });

    // 마지막 월 헤더 추가
    if (currentMonth !== -1) {
      monthHeaders.push(
        <div
          key={`month-${currentYear}-${currentMonth}`}
          className="text-center font-semibold bg-gray-100 border-r border-b py-1"
          style={{
            gridColumnStart: startIdx + 1,
            gridColumnEnd: dateCells.length + 1,
          }}
        >
          {`${currentYear}년 ${currentMonth + 1}월`}
        </div>
      );
    }

    return monthHeaders;
  };

  // 간트 차트 바 위치 계산
  const calculateBarPosition = (
    startDate: string,
    endDate: string
  ): { startDay: number; duration: number } => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 시작 인덱스 찾기
    const startDayIdx = dateCells.findIndex(
      (cell) =>
        cell.date.getFullYear() === start.getFullYear() &&
        cell.date.getMonth() === start.getMonth() &&
        cell.date.getDate() === start.getDate()
    );

    // 종료 인덱스 찾기
    const endDayIdx = dateCells.findIndex(
      (cell) =>
        cell.date.getFullYear() === end.getFullYear() &&
        cell.date.getMonth() === end.getMonth() &&
        cell.date.getDate() === end.getDate()
    );

    // 찾지 못한 경우 기본값
    const startDay = startDayIdx !== -1 ? startDayIdx : 0;
    const endDay = endDayIdx !== -1 ? endDayIdx : dateCells.length - 1;

    return {
      startDay,
      duration: endDay - startDay + 1,
    };
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

  // 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 스크롤 속도 조정

    // 모든 스크롤 영역에 같은 스크롤 위치 적용
    document.querySelectorAll(".scroll-sync").forEach((el) => {
      if (el instanceof HTMLElement) {
        el.scrollLeft = scrollLeft - walk;
      }
    });
  };

  // 요소의 동일한 스크롤 위치 유지
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const scrollTarget = e.target as HTMLElement;
      const scrollLeft = scrollTarget.scrollLeft;

      // 모든 스크롤 영역에 같은 스크롤 위치 적용
      document.querySelectorAll(".scroll-sync").forEach((el) => {
        if (el !== scrollTarget && el instanceof HTMLElement) {
          el.scrollLeft = scrollLeft;
        }
      });
    };

    const scrollElements = document.querySelectorAll(".scroll-sync");
    scrollElements.forEach((el) => {
      el.addEventListener("scroll", handleScroll);
    });

    return () => {
      scrollElements.forEach((el) => {
        el.removeEventListener("scroll", handleScroll);
      });
    };
  }, []);

  // 드래그 이벤트가 끝났을 때 document에서 이벤트 리스너 제거
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;

      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;

      document.querySelectorAll(".scroll-sync").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.scrollLeft = scrollLeft - walk;
        }
      });
    };

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("mousemove", handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);

  // 커서 스타일 관리
  const getCursorStyle = () => {
    return isDragging ? "grabbing" : "grab";
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
        {/* 헤더 영역 */}
        <div className="flex">
          {/* 고정 헤더 */}
          <div className="flex-none" style={{ width: "550px" }}>
            <div className="grid grid-cols-4">
              <div className="font-bold p-2 border-b border-r">업무</div>
              <div className="font-bold p-2 border-b border-r">시작일</div>
              <div className="font-bold p-2 border-b border-r">종료일</div>
              <div className="font-bold p-2 border-b border-r">담당자</div>
            </div>
          </div>

          {/* 스크롤 가능한 날짜 헤더 */}
          <div
            ref={scrollContainerRef}
            className="flex-grow overflow-x-auto scroll-sync"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: getCursorStyle(),
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {/* 스크롤바 숨김 스타일 */}
            <style jsx>{`
              .scroll-sync::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* 월 헤더 */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${dateCells.length}, 40px)`,
                minWidth: `${dateCells.length * 40}px`,
              }}
            >
              {generateMonthHeaders()}
            </div>

            {/* 일 헤더 */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${dateCells.length}, 40px)`,
                minWidth: `${dateCells.length * 40}px`,
              }}
            >
              {dateCells.map((cell, idx) => (
                <div
                  key={`day-${idx}`}
                  className="text-center text-sm p-1 border-r border-b"
                >
                  {cell.day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 업무 목록 */}
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <div className="flex border-b hover:bg-gray-50">
              {/* 고정 영역 */}
              <div
                className="flex-none grid grid-cols-4"
                style={{ width: "550px" }}
              >
                <div className="p-2 border-r flex items-center">
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="mr-2 w-6 h-6 flex items-center justify-center"
                  >
                    {task.expanded ? "−" : "+"}
                  </button>
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) =>
                      updateTask(task.id, "title", e.target.value)
                    }
                    className="border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none flex-grow"
                  />
                </div>
                <div className="p-2 border-r">
                  <input
                    type="date"
                    value={task.startDate}
                    onChange={(e) =>
                      updateTask(task.id, "startDate", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div className="p-2 border-r">
                  <input
                    type="date"
                    value={task.endDate}
                    onChange={(e) =>
                      updateTask(task.id, "endDate", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div className="p-2 border-r">
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
              </div>

              {/* 스크롤 영역 - 간트 바 */}
              <div
                className="flex-grow overflow-x-auto scroll-sync"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  cursor: getCursorStyle(),
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="relative"
                  style={{
                    height: "42px",
                    minWidth: `${dateCells.length * 40}px`,
                  }}
                >
                  <div
                    className="grid absolute inset-0"
                    style={{
                      gridTemplateColumns: `repeat(${dateCells.length}, 40px)`,
                    }}
                  >
                    {dateCells.map((_, idx) => (
                      <div
                        key={`grid-${idx}`}
                        className="border-r h-full"
                      ></div>
                    ))}
                  </div>

                  {(() => {
                    const { startDay, duration } = calculateBarPosition(
                      task.startDate,
                      task.endDate
                    );
                    return (
                      <div
                        className="absolute h-8 mt-1 rounded bg-blue-500 text-white text-sm flex items-center justify-center px-2 overflow-hidden"
                        style={{
                          left: `${startDay * 40}px`,
                          width: `${duration * 40 - 4}px`,
                          zIndex: 1,
                        }}
                      >
                        {task.title}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* 하위 업무 */}
            {task.expanded &&
              task.subTasks.map((subTask) => (
                <div key={subTask.id} className="flex border-b bg-gray-50">
                  {/* 고정 영역 */}
                  <div
                    className="flex-none grid grid-cols-4"
                    style={{ width: "550px" }}
                  >
                    <div className="p-2 border-r pl-8">
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
                    <div className="p-2 border-r">
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
                    <div className="p-2 border-r">
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
                    <div className="p-2 border-r">
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
                  </div>

                  {/* 스크롤 영역 - 간트 바 */}
                  <div
                    className="flex-grow overflow-x-auto scroll-sync"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      cursor: getCursorStyle(),
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                  >
                    <div
                      className="relative"
                      style={{
                        height: "42px",
                        minWidth: `${dateCells.length * 40}px`,
                      }}
                    >
                      <div
                        className="grid absolute inset-0"
                        style={{
                          gridTemplateColumns: `repeat(${dateCells.length}, 40px)`,
                        }}
                      >
                        {dateCells.map((_, idx) => (
                          <div
                            key={`grid-sub-${idx}`}
                            className="border-r h-full"
                          ></div>
                        ))}
                      </div>

                      {(() => {
                        const { startDay, duration } = calculateBarPosition(
                          subTask.startDate,
                          subTask.endDate
                        );
                        return (
                          <div
                            className="absolute h-8 mt-1 rounded bg-green-500 text-white text-sm flex items-center justify-center px-2 overflow-hidden"
                            style={{
                              left: `${startDay * 40}px`,
                              width: `${duration * 40 - 4}px`,
                              zIndex: 1,
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

            {/* 하위 업무 추가 버튼 */}
            {task.expanded && (
              <div className="flex border-b bg-gray-100">
                <div className="flex-none" style={{ width: "550px" }}>
                  <div className="p-2 pl-8 border-r">
                    <button
                      onClick={() => addNewSubTask(task.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      + 하위 업무 추가
                    </button>
                  </div>
                </div>
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
