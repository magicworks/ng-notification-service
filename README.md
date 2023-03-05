# Ng Notification Service ng-notification-service.png

A Simple Notification Service Demo. Notifications module may be found at '/src/app/notifications'

![Image](https://magicworks.lv/images/ng-notification-service.png)

## Installation

Install node packages

```
npm install
```

Build and serve your application on localhost:4200

```
npm start
```
## Use

Use Class Injection

```
import { NotificationsService } from '../notifications/notifications.service';

constructor(private notificationsService: NotificationsService) {}
```

Call Service Methods to Display Notification

```
this.notificationsService.addSuccess(`Some message`);

this.notificationsService.addError(`Some message`);
```

