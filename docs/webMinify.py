from subprocess import call
import os

JS_DIR = "./js/"
CSS_DIR = "./css/"

def minifyJs(JS_DIR):
    for f in os.listdir(JS_DIR):
        if not f.endswith(".min.js") and f.endswith(".js"):
            print("Minifying " + f)
            call(["uglifyjs", JS_DIR+f, "-o", JS_DIR+f])

def minifyCss(CSS_DIR):
    call(["css-minify", "-d", CSS_DIR, "-o", CSS_DIR])
    for f in os.listdir(CSS_DIR):
        if f.endswith(".min.css"):
            os.rename(CSS_DIR+f, CSS_DIR+f.replace(".min.css", ".css"))
    
minifyJs(JS_DIR)

minifyCss(CSS_DIR)