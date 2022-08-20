import math
from OpenGL.GLUT import *
from OpenGL.GLU import *
from OpenGL.GL import *

width, height = 1200.0, 800.0
rotation_delay = 30
screen_translate = 0.1
zoom = 0.1
rotation = True

x0 = -1
y0 = -1
xf = 1
yf = 1
dx = 0.05
dy = 0.05

pMouseX = None
pMouseY = None

a = 0
v = []
divisions = 20
dr = .1
dt = math.pi / divisions


def convert_polar_to_cartesian(r, t):
    x = r * math.cos(t)
    y = r * math.sin(t)
    return x, y


def paraboloide(x, y):
    return x ** 2 - y ** 2


r = 0
while r < 1:
    t = 0
    while t < 2 * math.pi:
        x, y = convert_polar_to_cartesian(r, t)
        z = paraboloide(x, y)
        v += [[x, y, z]]
        t += dt
    r += dr


def draw_shape():
    glBegin(GL_TRIANGLES)
    i = 0
    for vertex in v:
        vs = vertex
        glColor3fv(vs)
        glVertex3fv(vs)

        vs = v[i - 1]
        glColor3fv(vs)
        glVertex3fv(vs)

        vs = v[max(i - (divisions * 2), 0)]
        glColor3fv(vs)
        glVertex3fv(vs)

        vs = vertex
        glColor3fv(vs)
        glVertex3fv(vs)

        vs = v[max(i - (divisions * 2), 0)]
        glColor3fv(vs)
        glVertex3fv(vs)

        vs = v[max(i - (divisions * 2) + 1, 0)]
        glColor3fv(vs)
        glVertex3fv(vs)

        i += 1
    glEnd()


def draw():
    global a
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glPushMatrix()
    glRotatef(-90, 1, 0, 0)
    glRotatef(-a, 0, 0, 1)
    draw_shape()
    glPopMatrix()

    glPushMatrix()
    glRotatef(-90, 1, 0, 0)
    glRotatef(-a, 0, 0, 1)
    glColor4f(0, 1, 1, 0.5)
    glBegin(GL_POINTS)

    for vx in v:
        glVertex3fv(vx)

    glEnd()
    glPopMatrix()

    glPushMatrix()
    glTranslatef(2.5, .5, 0.)
    glBegin(GL_POINTS)

    glEnd()
    glPopMatrix()
    glutSwapBuffers()
    if rotation:
        a += 1
    return


def mouse_func(btn, state, *_):
    global rotation
    if btn == 3:
        glTranslatef(0, 0, zoom)
    if btn == 4:
        glTranslatef(0, 0, -zoom)

    if btn == 0 and state == 0:
        rotation = not rotation


def timer(i):
    glutPostRedisplay()
    glutTimerFunc(rotation_delay, timer, 1)

def init():
    glutInit(sys.argv)
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA |
                        GLUT_DEPTH | GLUT_MULTISAMPLE)
    glutInitWindowSize(int(width), int(height))
    glutCreateWindow("Paraboloide Hiperbólico")
    glutDisplayFunc(draw)
    glEnable(GL_MULTISAMPLE)
    glEnable(GL_DEPTH_TEST)
    glClearColor(0., 0., 0., 1.)
    gluPerspective(90, width / height, 0.1, 100.0)
    glTranslatef(0.0, 0, -3)
    glutTimerFunc(rotation_delay, timer, 1)
    glutMouseFunc(mouse_func)
    glutMainLoop()


if __name__ == '__main__':
    init()
