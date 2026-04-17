from app import app
from flask import render_template

@app.route('/')
def home():
    return render_template("homepage.html")
    pass

@app.route('/testar')
def teste():
    return render_template("teste.html")
    pass