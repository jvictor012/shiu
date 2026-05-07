from flask import Flask, render_template

app = Flask(__name__)

aparelhos = [
    {'nome': 'Ar Condicionado', 'db': 50, 'status': 'Moderado', 'img': 'arcondicionado.png'},
    {'nome': 'Aspirador', 'db': 80, 'status': 'Alto', 'img': 'aspirador.png'},
    {'nome': 'Batedeira', 'db': 75, 'status': 'Alto', 'img': 'batedeira.png'},
    {'nome': 'Cafeteira', 'db': 40, 'status': 'Baixo', 'img': 'cafeteira.png'},
    {'nome': 'Geladeira', 'db': 40, 'status': 'Baixo', 'img': 'geladeira.png'},
    {'nome': 'Liquidificador', 'db': 90, 'status': 'Muito alto', 'img': 'liquidificador.png'},
    {'nome': 'Máquina de Lavar', 'db': 70, 'status': 'Moderado', 'img': 'maquinadelavar.png'},
    {'nome': 'Secador', 'db': 85, 'status': 'Muito alto', 'img': 'secador.png'}
]

@app.route('/')
def index():
    return render_template('homepage.html', aparelhos=aparelhos)

@app.route('/eletrodomesticos')
def eletrodomesticos():
    return render_template('eletrodomesticos.html', aparelhos=aparelhos)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')