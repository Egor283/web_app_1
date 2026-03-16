from flask import Flask, render_template
from data import db_session
from data.jobs import Jobs
from data.users import User

app = Flask(__name__)
app.config['SECRET_KEY'] = 'my_secret_key'


def main():
    db_session.global_init("db/mars.db")
    app.run()

@app.route('/')
def base():
    return render_template("base.html")

@app.route('/memes')
def meme():
    return render_template("meme.html")

@app.route('/index')
def index():
    db_session.global_init("db/mars.db")
    session = db_session.create_session()
    jobs = session.query(Jobs).all()
    users = session.query(User).all()
    names = {u.id: (u.surname, u.name) for u in users}
    return render_template("index.html", jobs=jobs, names=names)


if __name__ == '__main__':
    main()