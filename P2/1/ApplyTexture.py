from OpenGL.GL import *
from OpenGL.GLUT import *
from OpenGL.GLU import *

from PIL import Image


class ApplyTexture:

    def __init__(self, window_title, width, height):
        self.width = width
        self.height = height
        self.window_title = window_title
        self.texture = None

    def load_textures(self):
        self.texture = glGenTextures(1)

        glBindTexture(GL_TEXTURE_2D, self.texture)
        im = Image.open("dado.png")
        w, h = im.size
        if im.mode == "RGBA":
            modo = GL_RGBA
            data = im.tobytes("raw", "RGBA", 0, -1)
        else:
            modo = GL_RGB
            data = im.tobytes("raw", "RGB", 0, -1)
        glPixelStorei(GL_UNPACK_ALIGNMENT, 1)
        glTexImage2D(GL_TEXTURE_2D, 0, modo, w, h, 0, modo, GL_UNSIGNED_BYTE, data)
        glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT)
        glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT)
        glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST)
        glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST)
        glTexEnvf(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_DECAL)

    def init_opengl(self, Width, Height):
        self.load_textures()
        glEnable(GL_TEXTURE_2D)
        glClearColor(0.0, 0.0, 0.0, 0.0)
        glClearDepth(1.0)
        glDepthFunc(GL_LESS)
        glEnable(GL_DEPTH_TEST)
        glShadeModel(GL_SMOOTH)
        glMatrixMode(GL_PROJECTION)
        gluPerspective(45.0, float(Width) / float(Height), 0.1, 100.0)
        glMatrixMode(GL_MODELVIEW)

    def resize_glscene(self, Width, Height):
        if Height == 0:
            Height = 1
        glViewport(0, 0, Width, Height)
        glMatrixMode(GL_PROJECTION)
        glLoadIdentity()
        gluPerspective(45.0, float(Width) / float(Height), 0.1, 100.0)
        glMatrixMode(GL_MODELVIEW)

    def gltimer(self, i):
        glutPostRedisplay()
        glutTimerFunc(50, self.gltimer, 1)

    def main(self, draw):
        glutInit(sys.argv)
        glutInitDisplayMode(GLUT_RGBA | GLUT_DOUBLE | GLUT_DEPTH)
        glutInitWindowSize(640, 480)
        glutInitWindowPosition(0, 0)
        glutCreateWindow(self.window_title)
        glutDisplayFunc(draw)
        glutIdleFunc(draw)
        glutReshapeFunc(self.resize_glscene)

        self.init_opengl(640, 480)
        glutTimerFunc(50, self.gltimer, 1)
        glutMainLoop()
