from flask_mail import Message

from base import Component, Constant


class Mail(Component):
    def send(self, subject, body):
        settings = self._application.settings
        mail = self._application.extensions['mail']
        message = Message(
            subject=subject,
            body=body,
            sender=settings[Constant.SETTING_MAIL_USERNAME],
            recipients=[settings[Constant.SETTING_MAIL_USERNAME]],
        )
        mail.send(message)
