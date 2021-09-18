/**
 * Represents a single portfolio item
 */
export interface IItem {
  _id?: string;
  author: string;
  username: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Breadcrumb {
  _id: string;
  title: string;
  entityType: string;
}

export interface CoverImage2 {}

/**
 * Represents a single portfolio item
 */
export interface ITask {
  _id: string;
  title: string;
  status: string;
  followers: string[];
  taskGroupId: string;
  isTemplate: boolean;
  projectId: string;
  taskBoardId: string;
  breadcrumb: Breadcrumb[];
  taskId: string;
  createdAt: Date;
  createdBy: string;
  businessId: string;
  totalTimeTracked: number;
  commentsCount: number;
  filesCount: number;
  assignedTo: any[];
  customFields: any[];
  isPrivate: boolean;
  coverImage: CoverImage2;
  completedAt: Date;
  completedBy: string;
  updatedAt: Date;
}

export interface ICustomField {
  color: string;
  name: string;
  _id: string;
}

/**
 * Used to extend types of components where the history object is used
 */
export interface IHistoryProps {
  push: (url: string) => void;
  listen: any;
}
