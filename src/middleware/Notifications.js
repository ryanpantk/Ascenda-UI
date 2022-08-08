import { notification } from 'antd';

export const ViewBooking_ViewBooking_DeletedNotificationWithIcon = (placement) => {
    notification.error({
      message: `Incomplete`,
      description:
        'Please fill in all required information.',
      placement,
    });
};

export const ViewBooking_WrongLoginNotification = (placement) => {
    notification.error({
      message: `Your Login Credentials are Incorrect`,
      description:
        'Your booking ID and password can be found from your confirmed booking in your email.',
      placement,
    });
};

export const ViewBooking_DeletedNotification = (placement) => {
    notification.error({
      message: `Deleted`,
      description:
        "Your Personal Information have been removed from Ascenda's database",
      placement,
    });
};