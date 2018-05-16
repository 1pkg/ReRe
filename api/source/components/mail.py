from flask_mail import Message

from base import Component


class Mail(Component):
    def send(self, subject, body):
        settings = self._application.settings
        message = Message(
            subject=subject,
            body=body,
            sender=settings['TECHNICAL_EMAIL'],
            recipients=[settings['TECHNICAL_EMAIL']],
        )
        self._application.extensions['mail'].send(message)
