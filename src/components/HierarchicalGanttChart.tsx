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

  // Helper function to format duration display
  const formatDuration = (value: number): string => {
    // Show whole numbers without decimal places, show fractions with up to 2 decimal places
    return Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
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
                    <div className="flex flex-col">
                      <span>{sub.name}</span>
                      {sub.description && (
                        <span className="text-xs text-gray-500 italic mt-1">{sub.description}</span>
                      )}
                    </div>
                  </div>
                  {/* Timeline cells */}
                  {Array.from({ length: maxDays }).map((_, idx) => {
                    const dayNumber = idx + 1;
                    const startDay = sub.startDay;
                    const endDay = startDay + sub.duration - (sub.duration < 1 ? sub.duration : 1);
                    const isPartOfActivity = dayNumber >= startDay && dayNumber <= Math.ceil(endDay);
                    const isStartDay = dayNumber === startDay;
                    const isEndDay = dayNumber === Math.ceil(endDay);
                    const isFractionalEnd = !Number.isInteger(sub.duration) && isEndDay;
                    return (
                      <div 
                        key={`sub-cell-${sub.id}-${dayNumber}`} 
                        className="w-12 border-r relative"
                      >
                        {isPartOfActivity && (
                          <div 
                            className={`absolute inset-0 flex items-center justify-center ${
                              isStartDay ? 'rounded-l-md' : ''
                            } ${
                              isEndDay ? 'rounded-r-md' : ''
                            } ${getMainActivityColor(mainIndex)} m-1`}
                            style={isFractionalEnd ? {
                              width: `${((sub.duration % 1) * 100)}%`,
                              right: '4px',
                              left: 'auto'
                            } : undefined}
                          >
                            {isStartDay && sub.duration > 0.5 && (
                              <span className="text-xs text-white font-medium">
                                {formatDuration(sub.duration)}d
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
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