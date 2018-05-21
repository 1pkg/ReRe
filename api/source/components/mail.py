from flask_mail import Message

from base import Component


class Mail(Component):
    def send(self, subject, body):
        settings = self._application.settings
        mail = self._application.extensions['mail']
        message = Message(
            subject=subject,
            body=body,
            recipients=[settings['MAIL_DEFAULT_SENDER']],
        )
        mail.send(message)
