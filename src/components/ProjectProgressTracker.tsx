import React, { useState, useEffect } from 'react';
import { MainActivity } from '../types';

interface ProjectProgressProps {
  mainActivities: MainActivity[];
  startDate: string;
}

const ProjectProgressTracker: React.FC<ProjectProgressProps> = ({ 
  mainActivities, 
  startDate 
}) => {
  const [progressData, setProgressData] = useState({
    totalDays: 0,
    lastActivityStart: 0,
    lastActivityEnd: 0,
    currentDay: 0,
    percentComplete: 0,
    daysRemaining: 0
  });
  
  useEffect(() => {
    if (!mainActivities.length || !startDate) return;
    
    // Flatten all sub-activities
    const allSubActivities = mainActivities.flatMap(main => main.subActivities);
    if (!allSubActivities.length) return;
    
    // Calculate total project days
    const maxEndDay = Math.max(
      ...allSubActivities.map(sub => sub.startDay + sub.duration - 1)
    );
    
    // Find the last entered activity
    // Sort by ID in descending order (assuming most recent have higher IDs)
    const sortedActivities = [...allSubActivities].sort((a, b) => {
      const idA = parseInt(a.id.split('-').pop() || '0');
      const idB = parseInt(b.id.split('-').pop() || '0');
      return idB - idA;
    });
    
    const lastActivity = sortedActivities[0];
    const lastActivityStart = lastActivity ? lastActivity.startDay : 0;
    const lastActivityEnd = lastActivity ? lastActivity.startDay + lastActivity.duration - 1 : 0;
    
    // Calculate current day based on start date
    const today = new Date();
    const start = new Date(startDate);
    let workDaysPassed = 0;
    
    if (today >= start) {
      const tempDate = new Date(start);
      while (tempDate < today) {
        tempDate.setDate(tempDate.getDate() + 1);
        // Only count weekdays
        if (tempDate.getDay() !== 0 && tempDate.getDay() !== 6) {
          workDaysPassed++;
        }
      }
    }
    
    // Calculate percentage complete
    const currentDay = Math.min(workDaysPassed, maxEndDay);
    const percentComplete = maxEndDay > 0 ? Math.round((currentDay / maxEndDay) * 100) : 0;
    const daysRemaining = Math.max(0, maxEndDay - currentDay);
    
    setProgressData({
      totalDays: maxEndDay,
      lastActivityStart,
      lastActivityEnd,
      currentDay,
      percentComplete,
      daysRemaining
    });
  }, [mainActivities, startDate]);
  
  // Get formatted date from day number
  const getDateFromDay = (day: number): string => {
    if (!startDate || day <= 0) return 'Not set';
    
    const date = new Date(startDate);
    let daysToAdd = day - 1; // Day 1 is the start date
    let workDaysAdded = 0;
    
    while (workDaysAdded < daysToAdd) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workDaysAdded++;
      }
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Project Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Activity Start</h3>
            <p className="font-medium">
              Day {progressData.lastActivityStart} ({getDateFromDay(progressData.lastActivityStart)})
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Last Activity End</h3>
            <p className="font-medium">
              Day {progressData.lastActivityEnd} ({getDateFromDay(progressData.lastActivityEnd)})
            </p>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Current Project Day</h3>
            <p className="font-medium">
              Day {progressData.currentDay} of {progressData.totalDays} ({progressData.daysRemaining} days remaining)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressTracker; 