declare module 'frappe-gantt' {
  interface Task {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies: string;
  }

  interface GanttOptions {
    view_mode?: string;
    date_format?: string;
    custom_popup_html?: null | ((task: Task) => string);
  }

  class Gantt {
    constructor(element: HTMLElement, tasks: Task[], options?: GanttOptions);
  }

  export default Gantt;
} 