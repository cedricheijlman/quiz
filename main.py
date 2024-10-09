from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
  return "Home"

@app.route('/get-questions/<int:category_id>', methods=['GET'])
def get_questions_by_category(category_id):
    questions = [
        {
            "question": "Wat is de output van 2 ** 3 in Python?",
            "options": ["6", "8", "9", "12"],
            "correct_answer": "8"
        },
        {
            "question": "Wat is het juiste keyword om een functie te definiëren in Python?",
            "options": ["define", "def", "function", "fun"],
            "correct_answer": "def"
        }
    ]

    return jsonify(questions)

if __name__ == '__main__':
  app.run(debug=True)