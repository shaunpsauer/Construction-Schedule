import React, { useState, useEffect } from 'react';
import { MainActivity, ProjectInfo } from '../types';
// @ts-ignore: No types for html2pdf.js
import html2pdf from 'html2pdf.js';

interface ProjectSummaryReportProps {
  projectInfo: ProjectInfo;
  mainActivities: MainActivity[];
  onClose?: () => void;
  onPrint?: () => void;
}

interface DailyActivity {
  day: number;
  date: string;
  activities: {
    mainCode: string;
    mainName: string;
    subName: string;
    duration: number;
    isStart: boolean;
    isEnd: boolean;
  }[];
}

const ProjectSummaryReport: React.FC<ProjectSummaryReportProps> = ({
  projectInfo,
  mainActivities,
  onClose,
  onPrint
}) => {
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[]>([]);
  const [maxDays, setMaxDays] = useState(0);
  
  // Organize activities by day
  useEffect(() => {
    // Find the maximum end day to determine report length
    const allSubActivities = mainActivities.flatMap(main => main.subActivities);
    if (allSubActivities.length === 0) {
      setDailyActivities([]);
      return;
    }
    
    const maxEndDay = Math.ceil(Math.max(
      ...allSubActivities.map(sub => sub.startDay + sub.duration - 1)
    ));
    setMaxDays(maxEndDay);
    
    // Create array of days
    const days: DailyActivity[] = [];
    
    for (let day = 1; day <= maxEndDay; day++) {
      const activitiesForDay: DailyActivity['activities'] = [];
      
      // Find all activities that occur on this day
      mainActivities.forEach(main => {
        main.subActivities.forEach(sub => {
          const startDay = sub.startDay;
          const endDay = sub.startDay + sub.duration - (sub.duration < 1 ? sub.duration : 1);
          
          // For fractional days, we check if this day is within the range
          // If the activity ends with a fraction on this day, it still counts
          if (day >= startDay && day <= Math.ceil(endDay)) {
            activitiesForDay.push({
              mainCode: main.code,
              mainName: main.name,
              subName: sub.name,
              duration: sub.duration,
              isStart: day === startDay,
              isEnd: day === Math.ceil(endDay)
            });
          }
        });
      });
      
      // Only add day if there are activities
      if (activitiesForDay.length > 0) {
        days.push({
          day,
          date: getDateFromDay(day, projectInfo.startDate),
          activities: activitiesForDay
        });
      }
    }
    
    setDailyActivities(days);
  }, [mainActivities, projectInfo.startDate]);
  
  // Get formatted date from day number
  const getDateFromDay = (day: number, startDateStr: string): string => {
    if (!startDateStr) return '';
    
    const startDate = new Date(startDateStr);
    let daysToAdd = day - 1; // Day 1 is the start date
    let workDaysAdded = 0;
    
    let date = new Date(startDate);
    while (workDaysAdded < daysToAdd) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workDaysAdded++;
      }
    }
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format date for header
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not Set';
    // If the string is in YYYY-MM-DD, parse as local date
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split('-').map(Number);
      if (!year || !month || !day) return 'Not Set';
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    // Otherwise, fallback to default
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Handle print
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };
  
  // Calculate end date
  const calculateEndDate = () => {
    if (!projectInfo.startDate || maxDays === 0) return 'Not Set';
    return getDateFromDay(maxDays, projectInfo.startDate);
  };

  // Helper function to format duration display
  const formatDuration = (value: number): string => {
    // Show whole numbers without decimal places, show fractions with up to 2 decimal places
    return Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
  };

  const handleExportPDF = () => {
    const element = document.getElementById('print-summary');
    if (element) {
      const opt = {
        margin:       [0.5, 0.5, 0.5, 0.5], // inches: top, left, bottom, right
        filename:     'ProjectSummary.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div id="print-summary" className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8 print:shadow-none print:my-0">
      {/* Report Header */}
      <div className="mb-8 border-b pb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Construction Project Summary</h1>
          <div className="flex space-x-2">
            <button 
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
            >
              Print Report
            </button>
            <button 
              onClick={handleExportPDF}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 print:hidden"
            >
              Export as PDF
            </button>
            {onClose && (
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 print:hidden"
              >
                Close
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
            <p className="text-lg font-medium">{projectInfo.orderNumber || 'Not Set'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">PMO ID</h3>
            <p className="text-lg font-medium">{projectInfo.pmoId || 'Not Set'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
            <p className="text-lg font-medium">{formatDate(projectInfo.startDate)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">End Date (Estimated)</h3>
            <p className="text-lg font-medium">{calculateEndDate()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Working Days</h3>
            <p className="text-lg font-medium">{formatDuration(maxDays)} days</p>
          </div>
        </div>
      </div>
      
      {/* Daily Activities */}
      <div>
        <h2 className="text-xl font-bold mb-4">Activities By Day</h2>
        
        {dailyActivities.length > 0 ? (
          <div className="space-y-8">
            {dailyActivities.map((dailyActivity) => (
              <div key={dailyActivity.day} className="pb-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-2 bg-gray-100 p-2 rounded">
                  Day {dailyActivity.day} - {dailyActivity.date}
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 uppercase tracking-wider">
                        <th className="text-left px-4 py-2">SPSI Code</th>
                        <th className="text-left px-4 py-2">Activity</th>
                        <th className="text-left px-4 py-2">Status</th>
                        <th className="text-left px-4 py-2">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {dailyActivity.activities.map((activity, idx) => {
                        // Find the description from mainActivities
                        const main = mainActivities.find(m => m.code === activity.mainCode);
                        const sub = main?.subActivities.find(s => s.name === activity.subName);
                        return (
                          <tr key={`${dailyActivity.day}-${idx}`} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              {activity.mainCode}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              <div className="font-medium">{activity.subName}</div>
                              {sub?.description && (
                                <div className="text-xs text-gray-500 italic">{sub.description}</div>
                              )}
                              <div className="text-xs text-gray-500">{activity.mainName}</div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              {activity.isStart && activity.isEnd ? (
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  Starts & Ends
                                </span>
                              ) : activity.isStart ? (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  Starts
                                </span>
                              ) : activity.isEnd ? (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                                  Ends
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                  In Progress
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">
                              {formatDuration(activity.duration)} {activity.duration === 1 ? 'day' : 'days'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="mt-2 text-xs text-gray-500">
                    Total activities for day {dailyActivity.day}: {dailyActivity.activities.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No activities scheduled yet.</p>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-10 pt-4 border-t text-xs text-gray-500 flex justify-between items-center">
        <div>Generated on {new Date().toLocaleDateString()}</div>
        <div>Page 1</div>
      </div>
    </div>
  );
};

export default ProjectSummaryReport;