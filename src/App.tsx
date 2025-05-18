// App.tsx
import React, { useState } from 'react';
import HierarchicalGanttChart from './components/HierarchicalGanttChart';
import ActivityManager from './components/ActivityManager';
import { MainActivity } from './types'; // (if not already imported)
import ProjectSummaryReport from './components/ProjectSummaryReport';
import ProjectProgressTracker from './components/ProjectProgressTracker';

function App() {
  const [mainActivities, setMainActivities] = useState<MainActivity[]>([]);
  const [projectInfo, setProjectInfo] = useState({
    orderNumber: '',
    pmoId: '',
    startDate: ''
  });

  const handleProjectInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Construction Schedule</h1>
        
        {/* Project Info Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Number
              </label>
              <input
                type="text"
                name="orderNumber"
                value={projectInfo.orderNumber}
                onChange={handleProjectInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PMO ID
              </label>
              <input
                type="text"
                name="pmoId"
                value={projectInfo.pmoId}
                onChange={handleProjectInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={projectInfo.startDate}
                onChange={handleProjectInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Activity Manager */}
        <ActivityManager 
          mainActivities={mainActivities}
          onMainActivitiesChange={setMainActivities}
        />

        {/* Project Progress Tracker */}
        <ProjectProgressTracker 
          mainActivities={mainActivities}
          startDate={projectInfo.startDate}
        />

        {/* Gantt Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Schedule</h2>
          <HierarchicalGanttChart 
            mainActivities={mainActivities}
            startDate={projectInfo.startDate}
          />
        </div>

        {/* Project Summary Report */}
        <ProjectSummaryReport 
          projectInfo={projectInfo}
          mainActivities={mainActivities}
        />
      </div>
    </div>
  );
}

export default App;
