from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request, redirect, url_for, render_template, session,jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import random
from flask_login import LoginManager, login_user, logout_user, UserMixin, login_required
import os

SECRET_KEY = os.urandom(32)
app = Flask(__name__, static_folder='./frontend/build/static', template_folder='./frontend/build')
app.secret_key = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = SECRET_KEY

app.debug=True

db = SQLAlchemy(app)


class Following(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    User1 = db.Column(db.String(50))
    user2 = db.Column(db.String(50))

    def init(self, user1, user2):
        self.User1 = user1 
        self.User2 = user2



class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('UserPost', backref='author', lazy=True)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class UserPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Text, nullable=False, default=str(datetime.now))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_str = db.Column(db.Text)
    post_like = db.Column(db.Integer, default = 0)
    post_dislike = db.Column(db.Integer, default = 0)

    def __init__(self,Date,Userid,Content,Likes,Dislikes):
        self.date = Date
        self.user_id = Userid
        self.post_str= Content
        self.post_like = Likes
        self.post_dislike = Dislikes

    
################################
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_manager.request_loader
def load_user_from_request(request):
    email = request.form.get('email')
    if email:
        return User.query.filter_by(email=email).first()
    return None
################################


#calls
@app.route('/protected')
@login_required
def protected():
    return 'Logged in as: ' + flask_login.current_user.id

#login logout Sign up
@app.route('/')
def index():
    return render_template("index.html")
#-------------------------------------------------

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        auth = request.get_json()
        email = auth["username"]
        password = auth["password"]

        user = User.query.filter_by(email=email).first()

        if user is not None and user.check_password(password):
            login_user(user)
            session['email'] = user.email
            session["loggedin"] = True
            session["user"] = {'id': user.id, 'name': user.name}
            return {"code": "12345"}
        print("yea this didnt work")
        return 'Bad login'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    del session['email']
    return {"success" : True} 
    #return redirect(url_for('/')) ################################## need to change

#-----------------------------------------------------


@app.route('/home')
@login_required
def home():
    return 'Welcome to your home page, ' + flask_login.current_user.name + '!'

#: Login, logout, session token(maybe),
# new post upload, like/dislike (onclick return a new post to populate the <h2>, GET all post from self.

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        info = request.get_json()
        user = info["username"]
        password = info["password"]
        email = info["email"].lower() # Convert the email to lowercase

        # check if user with the same email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"error": "User with this email already exists"}

        new_user = User(user, email, password)
        db.session.add(new_user)
        db.session.commit()

    return {"signedUp": True}


@app.route('/like', methods=['PUT'] )
@login_required
def like():

    if request.method == 'PUT':

        print(session.get("postNumber"))

        postid = session.get("postNumber")

        post = UserPost.query.filter_by(id = int(postid)).first()

        print(post)

        likeCount = post.post_like
        
        likeCount = likeCount + 1

        post.post_like = likeCount

        db.session.commit()

        return{"likeCount" : post.post_like}



@app.route('/dislike', methods=['PUT'] )
@login_required
def dislike():
    
    if request.method == 'PUT':

        print(session.get("postNumber"))

        postid = session.get("postNumber")

        post = UserPost.query.filter_by(id = int(postid)).first()
        
        print(post)


        dislikeCount = post.post_dislike
        
        dislikeCount = dislikeCount + 1

        post.post_dislike = dislikeCount

        db.session.commit()


        return{"setDislikeCount" : post.post_dislike}
    


@app.route('/follow', methods=['PUT'])
@login_required
def follow():
    if request.method == "PUT":
        postid = session.get("postNumber")
        actualpost = UserPost.query.filter_by(id=int(postid)).first()

        info = session.get("user")
        userid = info["id"]

        newfollow = Following(userid, actualpost.user_id)
        db.session.add(newfollow)
        db.session.commit()

        followeduser = User.query.filter_by(id=int(actualpost.user_id)).first()

        return {"setUsername": followeduser.name}


@app.route('/Post', methods=['POST'] )
@login_required
def Post():
    if request.method == 'POST':
        post = request.get_json()
        userInfo = session.get("user")

        new_post = UserPost(str(datetime.now), userInfo["id"], post, 0, 0)
        db.session.add(new_post)
        db.session.commit()

        return {"empty" : 0}

@app.route('/profile/posts')
@login_required
def Profile():

    #     id = db.Column(db.Integer, primary_key=True)
    # date = db.Column(db.Text, nullable=False, default=str(datetime.now))
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # post_str = db.Column(db.Text)
    # post_like = db.Column(db.Integer, default = 0)
    # post_dislike = db.Column(db.Integer, default = 0)

    info = session.get("user")
    id = info["id"]
    print(id)

    post = []
    posts = UserPost.query.all()

    listPost = []

    print(posts)

    followers = 0
    following = 0
    people = Following.query.all()
    for person in people:
        if(person.User1 == id):
            following = following + 1
        if(person.user2 == id):
            followers = followers + 1

    for post in posts:
        if(post.user_id == id):
            allPost = {"id" : post.id, "content" : post.post_str, "likes" : post.post_like, "dislikes" : post.post_dislike,
                        "following" : following, "follower" : followers}
            listPost.append(allPost)

    print(listPost)


    return jsonify(listPost)


@app.route('/profile/post/delete', methods=['PUT'])
@login_required
def Profile_delete():
    
    if request.method == 'PUT':
        post = request.get_json()
        postId = post["postId"]

        print(postId)


        query = UserPost.query.filter_by(id=int(postId)).first()
        db.session.delete(query)
        db.session.commit()
        return {}

@app.route('/settings', methods=['PUT'])
@login_required
def settings(postId):
    if request.methods == "PUT":
        newpassword = request.get_json()
        #newpassword = session.get("password")

        info = session.get("user")
        userid = info["id"]


        user = UserPost.query.filter_by(id=userid).first()
        user.password = newpassword
        db.session.commit()
        return {}
    

@app.route('/MyFeed')
@login_required
def MyFeed():
    info = session.get("user")
    id = info["id"]

    post = []
    post = UserPost.query.filter(UserPost.user_id != id).all()
    
    numberOfAccounts = len(post)
    postid = random.randrange(1, numberOfAccounts)

    chosenPost = post[postid]

    session["postNumber"] = chosenPost.id

    uname = User.query.filter_by(id =post[postid].user_id ).first()
    


    return{"postContent" : post[postid].post_str, "likeCount" : post[postid].post_like, "dislikeCount" : post[postid].post_dislike,
            "username" : uname.name}

if __name__ == "__main__":
    with app.app_context():
        # new_user = User(name="test2", email="testers", password="josh")
        # db.session.add(new_user)
        # db.session.commit()

        db.create_all()
        # new_user = User(name="roy", email="roychill@gmail.com", password=generate_password_hash('roychill'))
        # db.session.add(new_user)
        # db.session.commit()
    app.run(debug =True)
