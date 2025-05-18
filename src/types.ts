export interface ProjectInfo {
  orderNumber: string;
  pmoId: string;
  startDate: string;
}

export interface SubActivity {
  id: string;
  name: string;
  unit: string; // DAYS, SQFT, FEET, EACH, etc.
  startDay: number;
  duration: number;
}

export interface MainActivity {
  id: string;
  code: string; // e.g., "5090", "6000", etc.
  name: string; // e.g., "SITE PREP", "EXCAVATION & SHORING"
  subActivities: SubActivity[];
  isExpanded?: boolean;
} 