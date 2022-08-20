from OpenGL.GL import *
from OpenGL.GLU import *
from OpenGL.GLUT import *
from math import *
from numpy import *

xrot = 0
yrot = 0
zrot = 0
axrange = 12
spin = 0


def __init__():
    global xrot, yrot, zrot, axrange, spin
    glClearColor(0.0, 0.0, 0.0, 0.0)
    glShadeModel(GL_SMOOTH)
    xrot = 0
    yrot = 0
    zrot = 0
    axrange = 12.0
    spin = 0.0
    gluLookAt(-10.0, -10.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 10.0)
    glOrtho(-axrange, axrange, -axrange, axrange, -axrange, axrange)
    add_light()


def plot_axises():
    global axrange
    glBegin(GL_LINES)
    glColor3f(1.0, 1.0, 1.0)
    glVertex3f(-axrange, 0.0, 0.0)
    glVertex3f(axrange, 0.0, 0.0)
    glVertex3f(0.0, axrange, 0.0)
    glVertex3f(0.0, -axrange, 0.0)
    glVertex3f(0.0, 0.0, -axrange)
    glVertex3f(0.0, 0.0, axrange)
    glEnd()


def spin_func():
    global spin
    spin = spin - 1.0
    if (spin > 160.0):
        spin = spin - 360.0
    glutPostRedisplay()


def add_light():
    glEnable(GL_LIGHTING)
    glEnable(GL_LIGHT0)

    ambient_light = [0.0, 1.0, 0.0, 1.0]
    diffuse_light = [1.0, 0.0, 0.0, 1.0]
    position_light = [1.0, 1.0, 1.0, 0.0]
    spot_light = [-1.0, -1.0, 0.0]

    glLightfv(GL_LIGHT0, GL_SPOT_DIRECTION, spot_light)
    glLightfv(GL_LIGHT0, GL_AMBIENT, ambient_light)
    glLightfv(GL_LIGHT0, GL_DIFFUSE, diffuse_light)
    glLightfv(GL_LIGHT0, GL_POSITION, position_light)

    specular = [1.0, 1.0, 1.0, 1.0]
    shininess = [128.0]

    glMaterialfv(GL_FRONT, GL_SPECULAR, specular)
    glMaterialfv(GL_FRONT, GL_SHININESS, shininess)


def draw():
    global spin, axrange
    
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    add_light()
    glColor3f(1.0, 0, 0)
    glEnable(GL_DEPTH_TEST)
    glPushMatrix()
    glRotatef(spin, 0.0, 0.5, 1.0)

    glLineWidth(3.0)

    for y in arange(-axrange + 1, axrange - 1, 0.2):
        glBegin(GL_LINE_STRIP)
        for x in arange(-axrange + 1, axrange - 1, 0.9):
            z = sin(x) + cos(y)
            glVertex3f(x, y, z)

        glEnd()
    
    glFlush()
    glPopMatrix()
    glutSwapBuffers()
    spin_func()


def change_size(w, h):
    global axrange

    if h == 0:
        h = 1
    glViewport(0, 0, w, h)
    glMatrixMode(GL_PROJECTION)
    glLoadIdentity()
    if w < h:
        glOrtho(-axrange, axrange,
                -axrange * h / w, axrange * h / w,
                -axrange * 1.0, axrange * 1.0)
    else:
        glOrtho(-axrange * w / h, axrange * w / h,
                -axrange, axrange,
                -axrange * 1.0, axrange * 1.0)
    glMatrixMode(GL_MODELVIEW)
    glLoadIdentity()


def init():
    glutInit(sys.argv)
    glutInitDisplayMode(GLUT_DEPTH | GLUT_RGB | GLUT_DOUBLE)
    glutInitWindowSize(1280, 720)
    glutCreateWindow("Function Plotter")

    __init__()
    glutReshapeFunc(change_size)
    glutDisplayFunc(draw)
    glutMainLoop()


if __name__ == "__main__":
    init()
