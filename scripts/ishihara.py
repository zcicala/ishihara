import Image
import ImageFilter

im = Image.open("Plate9.gif")
imf = im.filter(ImageFilter.ModeFilter)
imf = imf.filter(ImageFilter.ModeFilter)
imf = imf.filter(ImageFilter.Sharpen)
imf = imf.filter(ImageFilter.Sharpen)
print im.getcolors()
print imf.getcolors()
imf.save("Plate9_filter.gif")