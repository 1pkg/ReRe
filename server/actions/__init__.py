import importlib

globals().update(importlib.import_module('.fetch-task', __name__).__dict__)
