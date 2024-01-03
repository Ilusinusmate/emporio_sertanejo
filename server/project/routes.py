from flask import jsonify

from project import app, render_template, db
from project.models import Product
from project.validations import ValidationProduct


@app.route("/", methods=["GET"])
def home_page():
    #itens = Product.query.all()
    #return jsonify(itens)
    return render_template("home.html", context={"title":"Home"})

#   DATABASE OPERATIONS

@app.route("/cadastrar_produto", methods=["POST"])
def register_product(ValidationProduct):
    print(ValidationProduct)
