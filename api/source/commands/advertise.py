from base import Command, Constant
from models import Account, Answer, Device, Mark, Session, Task, Type


class Advertise(Command):
    NAME = 'advertise'
    DESCRIPTION = 'Advertise new n-tasks.'

    ARGUMENTS = [
        {
            'name': 'count',
            'type': int,
            'default': Constant.DEFAULT_GENERATE_COUNT,
            'description': 'n-tasks count'
        },
    ]

    def execute(self, count):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random
        settings = self._application.settings

        with self._application.instance.app_context():
            account = Account.query \
                .filter(Account.alias == settings[Constant.SETTING_ADMIN_ALIAS]) \
                .first()
            if account is None:
                uuid = c_hash.hex(
                    c_hash.NORMAL_DIGEST,
                    datetime.timestamp(),
                    random.salt(),
                    Constant.SETTING_ADMIN_ALIAS,
                )
                account = Account(
                    alias=settings[Constant.SETTING_ADMIN_ALIAS],
                    uuid=uuid,
                )
                db.session.add(account)
            token = c_hash.hex(
                c_hash.NORMAL_DIGEST,
                datetime.timestamp(),
                random.salt(),
            )
            session = Session(
                user_device=Device.desktop,
                user_digest='',
                user_agent='',
                user_ip='',
                token=token,
            )
            account.sessions.append(session)

            tasks = Task.query \
                .filter(Task.active == True) \
                .order_by(db.func.random()).limit(count).all()
            for task in tasks:
                answer = Answer(
                    result=False,
                    option_id=None,
                )
                answer.task = task
                answer.session = session
                mark = Mark(type=Type.upvote)
                mark.task = task
                mark.session = session
            db.session.commit()
