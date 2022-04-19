import cv2
from PIL import Image
import numpy as np

def makeWebp(img: str, sizes: list):
    imgName = img.split(".")[0]
    img = cv2.imread(img, cv2.IMREAD_UNCHANGED)
    for size in sizes:
        img1 = cv2.resize(img, (size, size), interpolation = cv2.INTER_AREA)
        cv2.imwrite(f"{imgName}@{size}.webp", img1, [cv2.IMWRITE_WEBP_QUALITY, 100])

def makeIco(img: str, sizes: list):
    imgName = img.split(".")[0]
    img = Image.open(img)
    for size in sizes:
        img1 = img.resize((size, size), Image.ANTIALIAS)
        img1.save(f"{imgName}@{size}.ico")

def makePNG(img: str, sizes: list):
    imgName = img.split(".")[0]
    img = cv2.imread(img, cv2.IMREAD_UNCHANGED)
    for size in sizes:
        img1 = cv2.resize(img, (size, size), interpolation = cv2.INTER_AREA)
        cv2.imwrite(f"{imgName}@{size}.png", img1)

#makeWebp("icon.png", [96, 128, 256, 512, 1024])
#makeIco("icon.png", [32, 64, 128, 256])
makePNG("icon.png", [192])