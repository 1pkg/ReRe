from base import Error


class Overwhelm(Error):
    def __init__(self, account_id):
        super().__init__(403, f'too many session for account {account_id}')
