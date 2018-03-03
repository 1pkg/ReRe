import shutil
import os

from base import Constants

if os.path.exists(Constants.DUMP_PATH):
    shutil.rmtree(Constants.DUMP_PATH)

if os.path.exists(Constants.LOG_PATH):
    shutil.rmtree(Constants.LOG_PATH)
