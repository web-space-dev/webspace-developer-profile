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
  // history: {
  push: (url: string) => void;
  listen: any;
  // };
}

export interface IPerson {
  _id: string;
  role: string;
  customFields: CustomField[];
  name: Name;
  contactEmails: ContactEmail[];
  status: string;
  invitedBy: InvitedBy;
  nameSortKey: string;
  avatar: Avatar;
  locale: Locale;
  contactPhones: any[];
  address: Address;
  websiteLinks: any[];
  isOnboarded: boolean;
  companies: any[];
  badgeCounts: BadgeCounts;
  favoriteLinks: any[];
  timeTracking: Avatar;
  createdAt: Date;
  createdBy: string;
  businessId: string;
  updatedAt: Date;
  userId: string;
  lastLogin: Date;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface Avatar {}

export interface BadgeCounts {
  notification: number;
  conversation: any[];
}

export interface ContactEmail {
  address: string;
  type: string;
}

export interface CustomField {
  _id: string;
}

export interface InvitedBy {
  _id: string;
  name: string;
}

export interface Locale {
  timezone: string;
  weekStartDay: string;
  dateFormat: string;
  timeFormat: string;
  timestampFormat: string;
}

export interface Name {
  first: string;
  last: string;
}
