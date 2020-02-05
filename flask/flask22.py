import sqlite3
import os
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
# from project import create_app

# конфигурация
DATABASE = '/tmp/flaskr.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'

# def connect_db():
#     """Соединяет с указанной базой данных."""
#     rv = sqlite3.connect(app.config['DATABASE'])
#     rv.row_factory = sqlite3.Row
#     return rv

