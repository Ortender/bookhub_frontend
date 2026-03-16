import { NotificationType } from "../enums/notification-type";

export interface NotificationMessage {
  type: NotificationType;
  text: string;
}