import wikipedia


class Wiki:
    @staticmethod
    def fetch(title):
        print("Wiki Fetch {0}".format(title))
        search = wikipedia.search(title)
        if len(search) == 0:
            return None
        try:
            return wikipedia.page(search[0])
        except wikipedia.exceptions.DisambiguationError:
            return wikipedia.page(search[1])
