from flask_mail import Message

from base import Component


class Mail(Component):
    def send(self, subject, body):
        settings = self._application.settings
        message = Message(
            subject=subject,
            body=body,
            recipients=[settings['MAIL_DEFAULT_SENDER']],
        )
        self._application.extensions['mail'].send(message)
