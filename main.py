from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Load questions from a JSON file
def load_questions():
    with open('questions.json', 'r', encoding='utf-8') as f:
        return json.load(f)

QUESTIONS = load_questions()

@app.route('/')
def home():
    return "Home"

@app.route('/get-questions/<int:category_id>', methods=['GET'])
def get_questions_by_category(category_id):
    questions = QUESTIONS.get(str(category_id))
    
    if questions is None:
        return jsonify({"error": "Category not found"}), 404

    return jsonify(questions)

if __name__ == '__main__':
    app.run(debug=True)