import importlib

globals().update(importlib.import_module('.fetch-task', 'actions').__dict__)
globals().update(importlib.import_module('.option-chose', 'actions').__dict__)
