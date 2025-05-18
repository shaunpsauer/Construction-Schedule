import React, { useState } from 'react';
import { MainActivity, SubActivity } from '../types';
import { SPSI_ACTIVITIES, SPSIActivity } from '../spsiActivities';

interface ActivityManagerProps {
  mainActivities: MainActivity[];
  onMainActivitiesChange: (activities: MainActivity[]) => void;
}

const ActivityManager: React.FC<ActivityManagerProps> = ({ 
  mainActivities, 
  onMainActivitiesChange 
}) => {
  const [selectedMainActivity, setSelectedMainActivity] = useState<string>('');
  const [selectedSPSI, setSelectedSPSI] = useState<SPSIActivity | null>(null);
  const [startDay, setStartDay] = useState(1);
  const [duration, setDuration] = useState(1);
  const [editing, setEditing] = useState<{ mainCode: string; subId: string } | null>(null);
  const [editSPSI, setEditSPSI] = useState<SPSIActivity | null>(null);
  const [editStartDay, setEditStartDay] = useState(1);
  const [editDuration, setEditDuration] = useState(1);

  // Filter sub-activities by selected main activity code
  const filteredSubActivities = selectedMainActivity
    ? SPSI_ACTIVITIES.filter(a => a.parentCode === selectedMainActivity)
    : [];

  const handleAddSubActivity = () => {
    if (!selectedMainActivity || !selectedSPSI) return;

    // Check if main activity already exists
    let main = mainActivities.find(m => m.code === selectedMainActivity);
    let updatedActivities: MainActivity[];
    if (!main) {
      // Create new main activity
      main = {
        id: selectedMainActivity,
        code: selectedMainActivity,
        name: selectedMainActivity, // Optionally, you can map code to a more readable name
        subActivities: [],
      };
      updatedActivities = [...mainActivities, main];
    } else {
      updatedActivities = mainActivities;
    }

    // Add sub-activity
    const newSub: SubActivity = {
      id: `${main.code}-${main.subActivities.length + 1}`,
      name: selectedSPSI.name,
      unit: 'DAYS',
      startDay,
      duration
    };
    const newMainActivities = updatedActivities.map(m =>
      m.code === main!.code
        ? { ...m, subActivities: [...m.subActivities, newSub] }
        : m
    );
    onMainActivitiesChange(newMainActivities);
    setSelectedSPSI(null);
    setStartDay(1);
    setDuration(1);
  };

  const handleDeleteSubActivity = (mainCode: string, subId: string) => {
    let updatedActivities = mainActivities.map(main => {
      if (main.code === mainCode) {
        return {
          ...main,
          subActivities: main.subActivities.filter(sub => sub.id !== subId)
        };
      }
      return main;
    });
    // Remove main activity if it has no sub-activities left
    updatedActivities = updatedActivities.filter(main => main.subActivities.length > 0);
    onMainActivitiesChange(updatedActivities);
  };

  const handleEditClick = (mainCode: string, sub: SubActivity) => {
    setEditing({ mainCode, subId: sub.id });
    // Find the SPSIActivity for this sub-activity name
    const found = SPSI_ACTIVITIES.find(a => a.name === sub.name && a.parentCode === mainCode) || null;
    setEditSPSI(found);
    setEditStartDay(sub.startDay);
    setEditDuration(sub.duration);
  };

  const handleSaveEdit = () => {
    if (!editing || !editSPSI) return;
    const updatedActivities = mainActivities.map(main => {
      if (main.code === editing.mainCode) {
        return {
          ...main,
          subActivities: main.subActivities.map(sub =>
            sub.id === editing.subId
              ? {
                  ...sub,
                  name: editSPSI.name,
                  unit: 'DAYS',
                  startDay: editStartDay,
                  duration: editDuration
                }
              : sub
          )
        };
      }
      return main;
    });
    onMainActivitiesChange(updatedActivities);
    setEditing(null);
    setEditSPSI(null);
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setEditSPSI(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Manage Activities</h2>
      {/* Add New Sub-Activity Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Activity
          </label>
          <select
            value={selectedMainActivity}
            onChange={e => {
              setSelectedMainActivity(e.target.value);
              setSelectedSPSI(null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Main Activity</option>
            {Array.from(new Set(SPSI_ACTIVITIES.map(a => a.parentCode))).map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub-Activity
          </label>
          <select
            value={selectedSPSI ? selectedSPSI.name : ''}
            onChange={e => {
              const found = filteredSubActivities.find(a => a.name === e.target.value);
              setSelectedSPSI(found || null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!selectedMainActivity}
          >
            <option value="">Select Sub-Activity</option>
            {filteredSubActivities.map(sub => (
              <option key={sub.name} value={sub.name}>{sub.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Day
          </label>
          <input
            type="number"
            min="1"
            value={startDay}
            onChange={e => setStartDay(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (days)
          </label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={e => setDuration(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={handleAddSubActivity}
        disabled={!selectedMainActivity || !selectedSPSI}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add Activity
      </button>
      {/* Activity List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Current Activities</h3>
        {mainActivities.length === 0 && <p className="text-gray-500">No activities added yet</p>}
        {mainActivities.map(main => (
          <div key={main.id} className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">
              {main.code}
            </h4>
            {main.subActivities.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Start Day</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {main.subActivities.map(sub => (
                    <tr key={sub.id}>
                      {editing && editing.mainCode === main.code && editing.subId === sub.id ? (
                        <>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <select
                              value={editSPSI ? editSPSI.name : ''}
                              onChange={e => {
                                const found = SPSI_ACTIVITIES.find(a => a.name === e.target.value && a.parentCode === main.code);
                                setEditSPSI(found || null);
                              }}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            >
                              <option value="">Select Sub-Activity</option>
                              {SPSI_ACTIVITIES.filter(a => a.parentCode === main.code).map(subOpt => (
                                <option key={subOpt.name} value={subOpt.name}>{subOpt.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <input
                              type="number"
                              min="1"
                              value={editStartDay}
                              onChange={e => setEditStartDay(parseInt(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            <input
                              type="number"
                              min="1"
                              value={editDuration}
                              onChange={e => setEditDuration(parseInt(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-900 space-x-2">
                            <button
                              onClick={handleSaveEdit}
                              className="text-green-600 hover:text-green-900 mr-2"
                              disabled={!editSPSI}
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-2 text-sm text-gray-900">{sub.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Day {sub.startDay}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{sub.duration} days</td>
                          <td className="px-4 py-2 text-sm text-gray-900 space-x-2">
                            <button
                              onClick={() => handleEditClick(main.code, sub)}
                              className="text-blue-600 hover:text-blue-900 mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSubActivity(main.code, sub.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No sub-activities added yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityManager; 