const tabs = [
  { name: "Availability Status", key: "status" },
  { name: "Available Days", key: "days" },
  { name: "View Schedule", key: "schedule" },
];

const statusValues = [
  { name: "Active", key: "active" },
  { name: "Offline", key: "offline" },
  { name: "Busy", key: "busy" },
];

const statusLabels = { active: "Active", offline: "Offline", busy: "Busy" };

export { tabs, statusValues, statusLabels };
