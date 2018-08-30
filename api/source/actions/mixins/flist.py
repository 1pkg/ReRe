from base import Action


class FList(Action):
    def _format(self, response):
        response = {
            key: [self._single(task) for task in tasks]
            for key, tasks in response.items()
        }
        return super()._format(response)

    def _single(self, task):
        subject = {
            'link': task.subject.link,
            'source': task.subject.source,
            'orientation': str(task.subject.orientation),
        }
        options = [{
            'name': option.name,
            'description': option.description,
            'link': option.link,
            'source': str(option.source),
        } for option in task.options]
        effects = [{
            'name': effect.name,
        } for effect in task.effects]
        label = task.label
        return {
            'options': options,
            'subject': subject,
            'effects': effects,
            'label': label,
        }
