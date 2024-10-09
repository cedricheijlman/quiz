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
    if category_id == 1: #back-end
        questions = [
            {
                "question": "Welke programmeertaal komt uit Nederland ",
                "options": ["Java", "Typescript", "Python", "Assembly"],
                "correct_answer": "Python"
            },
            {
                "question": "Wat betekend API",
                "options": ["Application Programming Interface", "Application Password Interface", "Advanced Password Interface", "Advanced Programming Interface"],
                "correct_answer": "Application Programming Interface"
            },
            {
                "question": "Waar vindt versiebeheer plaats",
                "options": ["Reddit", "GeeksForGeeks", "GitHub", "Stackoverflow"],
                "correct_answer": "GitHub"
            },
            {
                "question": "Als Back-end Developer houd ik mij het minst bezig met",
                "options": ["Infrastructuur", "Software", "Organisatieprocessen", "Gebruikersinteractie"],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
        ]
    if category_id == 2: #front-end
        questions = [
            {
                "question": "Responsive design reageert op? ",
                "options": ["Je muis", "Je device lay-out", "Je GPU", "Je gedrag op de website"],
                "correct_answer": "Je device lay-out"
            },
            {
                "question": "Welke taal wordt niet gebruikt in Front-end",
                "options": ["Javascript", "PHP", "HTML", "CSS"],
                "correct_answer": "PHP"
            },
            {
                "question": "Wat is de X in UX",
                "options": ["Expertise", "Extravagant", "Experience", "Expensive"],
                "correct_answer": "Experience"
            },
            {
                "question": "Als Front-end Developer houd ik mij het meest bezig met",
                "options": ["Hardwareinterfacing", "Infrastructuur", "Organisatieprocessen", "Gebruikersinteractie"],
                "correct_answer": "Gebruikersinteractie"
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
        ]
    if category_id == 3: #artificial intelligence
        questions = [
            {
                "question": "Wat is geen vorm van een Machine Learning Algorithm ",
                "options": ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Neural Learning"],
                "correct_answer": "Neural Learning"
            },
            {
                "question": "Wat is geen LLM (Large Language Model)",
                "options": ["ChatGPT", "Claude", "Gemini", "Virgo"],
                "correct_answer": "Virgo"
            },
            {
                "question": "Wie wordt gezien als ''father of AI''",
                "options": ["Alan Turing", "John McCarthy", "Edsger Dijkstra", "Ada Lovelace"],
                "correct_answer": "John McCarthy"
            },
            {
                "question": "Wat is geen data karakteristiek",
                "options": ["Validity", "Volatility", "Volume", "Vacuity"],
                "correct_answer": "Vacuity"
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
        ]
    if category_id == 4: #embedded technology engineer
        questions = [
            {
                "question": "Wat heeft nog steeds geen Embedded Technology",
                "options": ["Wasmachines", "Camera's", "Auto's", "Strijkplank"],
                "correct_answer": "Strijkplank"
            },
            {
                "question": "Als Embedded Technology Engineer houd je je bezig met",
                "options": ["Hardware", "Software", "Firmware", "Alle bovenstaande"],
                "correct_answer": "Alle bovenstaande"
            },
            {
                "question": "Wat is een HDL",
                "options": ["Hardware Description Language", "High-density Libraries", "Home Device Libraries", "Hardware Device Levels"],
                "correct_answer": "Hardware Description Language"
            },
            {
                "question": "Als Embedded Technology Engineer ben je waarschijnlijk afgestudeerd in de richting TI, waar staat TI voor",
                "options": ["Techniek Interactie", "Technische Introductie", "Techniek en Informatie", "Technische Informatica"],
                "correct_answer": "Technische Informatica"
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
        ]
    if category_id == 5: #business IT Engineer 
        questions = [
            {
                "question": "Wat is geen belangrijke KPI (Key Performance Indicator) in ICT",
                "options": ["Server uptime", "Network latency", "Avg. Money spent", "Avg. Time spent"],
                "correct_answer": "Avg. Money spent"
            },
            {
                "question": "Waar houdt een Business IT engineer zich vooral mee bezig",
                "options": ["Programmeren", "Oplossen van technische problemen", "Consultantcy", "Accountantcy"],
                "correct_answer": "Consultantcy"
            },
            {
                "question": "Op welke Architectuurlaag bevindt de Buisiness IT engineer zich het meest",
                "options": ["Infrastructuur", "Gebruikersinteractie", "Hardwareinterfacing", "Organistatieprocessen"],
                "correct_answer": "Organistatieprocessen"
            },
            {
                "question": "Waar staat BIM voor",
                "options": ["Business ICT en Migration", "Business ICT en Management", "Business IT en Migration", "Business IT en Management"],
                "correct_answer": "Business IT en Management"
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
        ]
    if category_id == 6: #cybersecurity & cloud
        questions = [
            {
                "question": "Wat betekend CSC?",
                "options": ["Cloud & Super Computers", "Computer Science & Cloud", "Cyber Security & Cloud", "Cloud Security & Cyber"],
                "correct_answer": "Cyber Security & Cloud"
            },
            {
                "question": "NIS2 (Network and Information Security) is een vorm van?",
                "options": ["Hacktechniek", "Cyberwetgeving", "Bedrijf voor veilige cloudoplossingen", "Amerikaanse richtlijnen over netwerken en veiligheid"],
                "correct_answer": "Cyberwetgeving"
            },
            {
                "question": "Wat is de belangrijkste HBO-i activiteit in CSC",
                "options": ["Manage & Control", "Realiseren", "Adviseren", "Analyseren"],
                "correct_answer": "Manage & Control"
            },
            {
                "question": "Wat is de belangrijkste HBO-i Vaardigheid in CSC",
                "options": ["Kwalitatief product maken", "Overzicht creeren", "Pro-actief handelen", "Reflecteren"],
                "correct_answer": "Pro-actief handelen"
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
            {
                "question": "",
                "options": ["", "", "", ""],
                "correct_answer": ""
            },
        ]
    return jsonify(questions)


if __name__ == '__main__':
    app.run(debug=True)
