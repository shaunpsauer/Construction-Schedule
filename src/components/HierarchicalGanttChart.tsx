import React, { useMemo } from 'react';
import { MainActivity } from '../types';

interface GanttChartProps {
  mainActivities: MainActivity[];
  startDate: string;
}

const HierarchicalGanttChart: React.FC<GanttChartProps> = ({ mainActivities, startDate }) => {
  // Calculate the maximum days needed for the chart
  const maxDays = useMemo(() => {
    const allSubActivities = mainActivities.flatMap(main => main.subActivities);
    if (allSubActivities.length === 0) return 20;
    
    return Math.max(
      ...allSubActivities.map(sub => sub.startDay + sub.duration)
    ) + 2; // Add buffer
  }, [mainActivities]);
  
  // Generate headers for the day columns
  const generateDayHeaders = () => {
    const headers = [];
    for (let i = 1; i <= maxDays; i++) {
      headers.push(
        <div 
          key={`header-${i}`} 
          className="w-12 text-center text-xs font-medium py-2 border-r border-gray-200"
        >
          Day {i}
        </div>
      );
    }
    return headers;
  };
  
  // Calculate actual calendar date from day number (considering 5-day work week)
  const getDateFromDay = (day: number): string => {
    if (!startDate) return '';
    // Parse YYYY-MM-DD format
    const [year, month, dayStr] = startDate.split('-').map(Number);
    const date = new Date(year, month - 1, dayStr);
    let workDaysAdded = 1;
    while (workDaysAdded < day) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workDaysAdded++;
      }
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Colors for activities
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-red-500', 'bg-purple-500', 'bg-indigo-500',
    'bg-pink-500', 'bg-teal-500'
  ];
  
  // Get color for a main activity (to be used for all its sub-activities)
  const getMainActivityColor = (index: number) => {
    return colors[index % colors.length];
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Day headers */}
          <div className="flex border-b bg-gray-50">
            <div className="w-64 p-2 font-medium border-r bg-gray-100 sticky left-0 z-10">
              Activity
            </div>
            {generateDayHeaders()}
          </div>

          {/* Date row */}
          {startDate && (
            <div className="flex border-b bg-gray-50">
              <div className="w-64 p-2 text-xs text-gray-500 border-r bg-gray-100 sticky left-0 z-10">
                Date
              </div>
              {Array.from({ length: maxDays }).map((_, idx) => (
                <div 
                  key={`date-${idx+1}`} 
                  className="w-12 text-center text-xs text-gray-500 py-1 border-r"
                >
                  {getDateFromDay(idx+1)}
                </div>
              ))}
            </div>
          )}
          
          {/* Activity rows */}
          {mainActivities.map((main, mainIndex) => (
            <React.Fragment key={main.id}>
              {/* Main activity header row */}
              <div className="flex border-b bg-gray-100">
                <div className="w-64 p-2 font-medium border-r sticky left-0 z-10">
                  {main.code}
                </div>
                {Array.from({ length: maxDays }).map((_, idx) => (
                  <div 
                    key={`main-cell-${main.id}-${idx+1}`} 
                    className="w-12 border-r"
                  ></div>
                ))}
              </div>
              
              {/* Sub-activity rows */}
              {main.subActivities.map((sub) => (
                <div key={sub.id} className="flex border-b hover:bg-gray-50">
                  <div className="w-64 p-2 border-r sticky left-0 bg-white z-10 pl-8">
                    {sub.name}
                  </div>
                  
                  {/* Timeline cells */}
                  {Array.from({ length: maxDays }).map((_, idx) => (
                    <div 
                      key={`sub-cell-${sub.id}-${idx+1}`} 
                      className="w-12 border-r relative"
                    >
                      {/* Activity bar */}
                      {idx+1 >= sub.startDay && idx+1 < sub.startDay + sub.duration && (
                        <div 
                          className={`absolute inset-0 flex items-center justify-center ${
                            idx+1 === sub.startDay ? 'rounded-l-md' : ''
                          } ${
                            idx+1 === sub.startDay + sub.duration - 1 ? 'rounded-r-md' : ''
                          } ${getMainActivityColor(mainIndex)} m-1`}
                        >
                          {idx+1 === sub.startDay && sub.duration > 1 && (
                            <span className="text-xs text-white font-medium">
                              {sub.duration}d
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Empty sub-activities message */}
              {main.subActivities.length === 0 && (
                <div className="flex border-b">
                  <div className="w-full p-2 text-center text-gray-500">
                    No sub-activities added
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HierarchicalGanttChart; 