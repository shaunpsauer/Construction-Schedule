// This file contains the full list of SPSI sub-activities for use in the activity dropdown.
// Generated from the provided CSV. The unit is always 'DAYS' in the UI.
// All double quotes in names are escaped for valid TypeScript.

export interface SPSIActivity {
  code: string;         // SPSI code, e.g., "5060"
  name: string;         // Sub-activity name, e.g., "MOB Haul/Unload Equipment"
  parentCode: string;   // Parent code, e.g., "5060"
}

export const SPSI_ACTIVITIES: SPSIActivity[] = [
  { code: "4070", name: "Potholing (Pre-mob)", parentCode: "4070" },
  { code: "4070", name: "GPR /USA", parentCode: "4070" },
  { code: "5030", name: "Vegetation Removal", parentCode: "5030" },
  { code: "5030", name: "Vegetation Removal Trim Trees", parentCode: "5030" },
  { code: "5060", name: "MOB Haul/Unload Equipment", parentCode: "5060" },
  { code: "5060", name: "MOB Haul Pipe, Valves, Fittings", parentCode: "5060" },
  { code: "5060", name: "MOB Haul/Return Pipe, Valves, Fittings", parentCode: "5060" },
  { code: "5080", name: "Site Mngmnt Set-up/Remove  Yard", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt General (all in)", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt (NOT incl. trailer, blue room, fence, security)", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt Trailer Rent Incl. MOB/DeMOB", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt Blue Room Incl. MOB/De MOB", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt Temp Fence", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt Security Patrol", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt Security Camera", parentCode: "5080" },
  { code: "5080", name: "Site Mngmnt K- Rail Incl. Install/Remove", parentCode: "5080" },
  { code: "5085", name: "Traffic Control 2 Man - Day", parentCode: "5085" },
  { code: "5085", name: "Traffic Control 2 Man -  Night", parentCode: "5085" },
  { code: "5085", name: "Traffic Control 3 Man - Day", parentCode: "5085" },
  { code: "5085", name: "Traffic Control 3 Man - Night", parentCode: "5085" },
  { code: "5085", name: "Traffic Control 4 man- Day", parentCode: "5085" },
  { code: "5085", name: "Traffic Control 4 man - Night", parentCode: "5085" },
  { code: "5085", name: "Traffic Control 5+ man - Day", parentCode: "5085" },
  { code: "5085", name: "Traffic Control 5+ man - Night", parentCode: "5085" },
  { code: "5085", name: "Traffic Control K- Rail Install/Remove", parentCode: "5085" },
  { code: "5090", name: "Site Prep Clearing/Grubbing", parentCode: "5090" },
  { code: "5090", name: "Site Prep Create Access Road", parentCode: "5090" },
  { code: "5090", name: "Site Prep Install Baker Tanks", parentCode: "5090" },
  { code: "6000", name: "Excavation - Improved Area (excv. only)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Improved Area (incl shoring)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Improved Area (incl off haul)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Improved Area (incl shoring/off haul)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Unimproved Area (excv. only)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Unimproved Area (incl shoring)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Unimproved Area (incl off haul)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Unimproved Area (incl shoring/off haul)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Hand Digging (excav. only)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Hand Digging (incl shoring)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Hand Digging (incl off haul)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Hand Digging (incl shoring/off haul)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Hydrovac (excv. only)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Hydrovac (incl shoring)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Off Haul (standalone)", parentCode: "6000" },
  { code: "6000", name: "Excavation - Shoring (standalone)", parentCode: "6000" },
  { code: "6000", name: "Excavation -  Asphalt Grinding", parentCode: "6000" },
  { code: "6000", name: "Excavation - Saw Cutting", parentCode: "6000" },
  { code: "6100", name: "Removal - Pipe/Valves", parentCode: "6100" },
  { code: "6100", name: "Removal - Pipe/Valves", parentCode: "6100" },
  { code: "6100", name: "Removal - Other Assets", parentCode: "6100" },
  { code: "6100", name: "Removal Vault/Structures Demo", parentCode: "6100" },
  { code: "6100", name: "Retire Pipe/Valves (Clean, Slurry Fill, Cap)", parentCode: "6100" },
  { code: "6100", name: "Retire Slurry Fill Pipeline - Cell Crete (subcontract)", parentCode: "6100" },
  { code: "6100", name: "Retire Clean Pipeline - Sand Jetting (subcontract)", parentCode: "6100" },
  { code: "6100", name: "Retire Clean Pipeline - Chemical Cleaning (subcontract)", parentCode: "6100" },
  { code: "6100", name: "Removal/Retire Contractor - Support", parentCode: "6100" },
  { code: "6200", name: "Fab - Welding (pre-fab, out of bell hole) SM DIA WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Welding (pre-fab, out of bell hole) 2\"-12\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Welding (pre-fab, out of bell hole) 13\"-21\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Welding (pre-fab, out of bell hole) > 22\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Welding (in bell hole) SM DIA WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Welding (in bell hole) 2\"-12\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Welding (in bell hole) 13\"-21\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Welding (in bell hole) > 22\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Weld PCF <12\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Weld PCF 13\"-21\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - Weld PCF >22\" WDIN", parentCode: "6200" },
  { code: "6200", name: "Fab - PCF Bolt-up/Tap /Plug (all in) <11\" EACH", parentCode: "6200" },
  { code: "6200", name: "Fab - PCF Bolt-up/Tap /Plug (all in) 12\"-21\" EACH", parentCode: "6200" },
  { code: "6200", name: "Fab - PCF Bolt-up/Tap /Plug (all in) >22\" EACH", parentCode: "6200" },
  { code: "6200", name: "Fab - PCF Tapping/Plugging Subcontract EACH", parentCode: "6200" },
  { code: "6200", name: "Fab - PCF Tap/Plug Subcontract (Contractor Support) EACH", parentCode: "6200" },
  { code: "6200", name: "Fab - Weld/Tap Mueller Save-a-Valve EACH", parentCode: "6200" },
  { code: "6200", name: "Fab - Nitrogen Test (PCF/SAV tapping) EACH", parentCode: "6200" },
  { code: "6200", name: "Fab - General - SHFT", parentCode: "6200" },
  { code: "6300", name: "Potholing (post-Mob)", parentCode: "6300" },
  { code: "6400", name: "Concrete (Prep Location) SHIFT", parentCode: "6400" },
  { code: "6400", name: "Concrete Valve/Pipe Supports <12\" (subcontract) EACH", parentCode: "6400" },
  { code: "6400", name: "Concrete Valve/Pipe Supports 13\"-21\" (subcontract) EACH", parentCode: "6400" },
  { code: "6400", name: "Concrete Valve/Pipe Supports >22\"(subcontract) EACH", parentCode: "6400" },
  { code: "6400", name: "Concrete Form/Pour Pads (subcontract) SQFT", parentCode: "6400" },
  { code: "6400", name: "Concrete - Pour Concrete (subcontract) CuYd", parentCode: "6400" },
  { code: "6400", name: "Concrete - Contractor  Support SHFT", parentCode: "6400" },
  { code: "6500", name: "Boring HDD <12\" FEET", parentCode: "6500" },
  { code: "6500", name: "Boring  HDD 13\"-21\" FEET", parentCode: "6500" },
  { code: "6500", name: "Boring HDD > 22\" FEET", parentCode: "6500" },
  { code: "6500", name: "Boring Auger Bore /Jack and Bore <12\" FEET", parentCode: "6500" },
  { code: "6500", name: "Boring Auger Bore /Jack and Bore 13\"- 21\" FEET", parentCode: "6500" },
  { code: "6500", name: "Boring Auger Bore /Jack and Bore >22\" FEET", parentCode: "6500" },
  { code: "6500", name: "Boring Microtunneling FEET", parentCode: "6500" },
  { code: "6600", name: "Coating Removal SQFT", parentCode: "6600" },
  { code: "6600", name: "Coating Removal SHFT", parentCode: "6600" },
  { code: "6600", name: "Coating - Coat Pipe and Fittings SQFT", parentCode: "6600" },
  { code: "6600", name: "Coating - Coat Pipe and Fittings SHFT", parentCode: "6600" },
  { code: "6600", name: "Coating - Coat Welds WDIN", parentCode: "6600" },
  { code: "6700", name: "Corrosion Install CTS/ETS EACH", parentCode: "6700" },
  { code: "6700", name: "Corrosion Install Anode bed (conventional EACH", parentCode: "6700" },
  { code: "6700", name: "Corrosion Drill Deep Well Anode EACH", parentCode: "6700" },
  { code: "6800", name: "ILI Clean Pipeline (all in) SHFT", parentCode: "6800" },
  { code: "6800", name: "ILI Clean Pipeline (subcontract) FEET", parentCode: "6800" },
  { code: "6800", name: "ILI Tool Support - Rig-up/Rig-Down SHFT", parentCode: "6800" },
  { code: "6800", name: "ILI Tool Run - (all in) EACH", parentCode: "6800" },
  { code: "6800", name: "ILI Tool Run (tool vendor subcontract) EACH", parentCode: "6800" },
  { code: "6800", name: "ILI Tool Run - Contractor Support SHFT", parentCode: "6800" },
  { code: "6900", name: "Strength Test Pre Fab - Test Heads WDIN", parentCode: "6900" },
  { code: "6900", name: "Strength Test - (all in) SHFT", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Fab Test heads/ Cut and Cap WDIN", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Clean Pipeline (all in) SHFT", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Clean Pipeline (subcontract) SHFT", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Fill Pipe GALN", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Perform Strength Test  SHFT", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Perform Test (test subcontract) EACH", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Dewater/Dry SHFT", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job - Water Storage (Plumb/Set-up) EACH", parentCode: "6900" },
  { code: "6900", name: "Strength Test - 'T' job -Clean Frac Tanks EACH", parentCode: "6900" },
  { code: "7000", name: "Facilities and Plant - Contractor Support SHFT", parentCode: "7000" },
  { code: "7000", name: "Facilities and Plant - Trench for Piping FEET", parentCode: "7000" },
  { code: "7100", name: "Control Piping - Trench for Conduit Runs FEET", parentCode: "7100" },
  { code: "7100", name: "Contractor - Support SHFT", parentCode: "7100" },
  { code: "7300", name: "Electrical - Contractor  Support SHFT", parentCode: "7300" },
  { code: "7300", name: "Electrical - Trench for Grounding Systems FEET", parentCode: "7300" },
  { code: "7400", name: "Backfill & Compact - native CuYd", parentCode: "7400" },
  { code: "7400", name: "Backfill & Compact - import CuYd", parentCode: "7400" },
  { code: "7400", name: "Backfill & Compact - import/2 sac CuYd", parentCode: "7400" },
  { code: "7500", name: "Site Dewatering - Setup SHFT", parentCode: "7500" },
  { code: "7500", name: "Site Dewatering - Pump groundwater SHFT", parentCode: "7500" },
  { code: "7500", name: "Site Dewatering - Water Disposal (Trucking) GALN", parentCode: "7500" },
  { code: "7500", name: "Site Dewatering - Frac  tank (cleaning) EACH", parentCode: "7500" },
  { code: "7700", name: "Demobilization LOAD", parentCode: "7700" },
  { code: "7800", name: "Inspection - A-form (all in) SHFT", parentCode: "7800" },
  { code: "7800", name: "Inspection - A-form (subcontract) EACH", parentCode: "7800" },
  { code: "7800", name: "Inspection - H-form (all in) SHFT", parentCode: "7800" },
  { code: "7800", name: "Inspection - H-form (subcontract) EACH", parentCode: "7800" },
  { code: "7800", name: "Inspection - Coating Inspection (CDA) (all in) SHFT", parentCode: "7800" },
  { code: "7800", name: "Inspection - Coating Inspection (CDA) (subcontract) EACH", parentCode: "7800" },
  { code: "7800", name: "Inspection - Contractor Support SHFT", parentCode: "7800" },
  { code: "7900", name: "Perform QA/QC - Contractor Support  SHFT", parentCode: "7900" },
  { code: "8000", name: "NDE -  X-ray (all in) SHFT", parentCode: "8000" },
  { code: "8000", name: "NDE -  X-Ray (subcontract) SHFT", parentCode: "8000" },
  { code: "8000", name: "NDE -  X-Ray - Contractor Support SHFT", parentCode: "8000" },
  { code: "8100", name: "Standby - Damage Prevention (RR/3rd Party) SHFT", parentCode: "8100" },
  { code: "8300", name: "Clearance -  Welding Clearance (Pre-clearance Fab) WDIN", parentCode: "8300" },
  { code: "8300", name: "Clearance (Blowdown/Cut and Cap) SHFT", parentCode: "8300" },
  { code: "8300", name: "Clearance (Tie In Day) SHFT", parentCode: "8300" },
  { code: "8300", name: "Clearance - Cross Compression - Contractor Support SHFT", parentCode: "8300" },
  { code: "8300", name: "Clearance - CNG/LNG - Contractor Support SHFT", parentCode: "8300" },
  { code: "8300", name: "Clearance - Odor Fade - Contractor Support SHFT", parentCode: "8300" },
  { code: "8400", name: "Construction Management (PM, FE, Super.) DAYS", parentCode: "8400" },
  { code: "8600", name: "Safety Manager DAYS", parentCode: "8600" },
  { code: "8700", name: "Hard Site - Resto General SHFT", parentCode: "8700" },
  { code: "8700", name: "Hard Site - Resto General SQFT", parentCode: "8700" },
  { code: "8700", name: "Hard Site - Paving Resto SQFT", parentCode: "8700" },
  { code: "8700", name: "Hard Site - Lane Striping FEET", parentCode: "8700" },
  { code: "8700", name: "Hard Site - Saw Cutting (subcontract) FEET", parentCode: "8700" },
  { code: "8700", name: "Hard Site - Sidewalk/Gutter Resto FEET", parentCode: "8700" },
  { code: "8700", name: "Hard Site - Permanent Fencing FEET", parentCode: "8700" },
  { code: "8700", name: "Hard Site - Install Bollards EACH", parentCode: "8700" },
  { code: "8800", name: "Soft Site - Resto General SHFT", parentCode: "8800" },
  { code: "8800", name: "Soft Site - Resto General SQFT", parentCode: "8800" },
  { code: "8800", name: "Soft Site - Landscape Repair SHFT", parentCode: "8800" },
  { code: "9120", name: "MAPPING", parentCode: "9120" }
]; 