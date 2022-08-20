from OpenGL.GLUT import *
from OpenGL.GLU import *
from OpenGL.GL import *

width, height = 1280, 720
rotation_delay = 10
screen_translate = 1.1
zoom = 0.4
pause_rotation = False
rotation_speed = 0

x0 = -1
y0 = -1
xf = 1
yf = 1
dx = 0.05
dy = 0.05


def paraboloide(x, y):
    return x ** 2 + y ** 2


v = []
x = x0
while x < xf:
    y = y0
    while y < yf:
        z = paraboloide(x, y)
        v += [[x, y, z]]
        y += dy
    x += dx


def draw_shape():
    glBegin(GL_TRIANGLES)
    for vertex in v:
        z = paraboloide(vertex[0], vertex[1])
        glColor3f(vertex[0], vertex[1], z)
        glVertex3f(vertex[0], vertex[1], z)

        y2 = vertex[1] + dy
        z2 = paraboloide(vertex[0], y2)
        glVertex3f(vertex[0], y2, z2)

        x2 = vertex[0] + dx
        z3 = paraboloide(x2, vertex[1])
        glVertex3f(x2, vertex[1], z3)

        z4 = paraboloide(x2, y2)

        glVertex3f(vertex[0], y2, z2)
        glVertex3f(x2, vertex[1], z3)
        glVertex3f(x2, y2, z4)
    glEnd()


def draw():
    global rotation_speed
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glPushMatrix()
    glRotatef(-90, 1, 0, 0)
    glRotatef(rotation_speed, 0, 0, 1)
    draw_shape()
    glPopMatrix()

    glutSwapBuffers()

    rotation_speed += 1
    return


def timer(i):
    glutPostRedisplay()
    glutTimerFunc(rotation_delay, timer, 1)


def init():
    glutInit(sys.argv)
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA |
                        GLUT_DEPTH | GLUT_MULTISAMPLE)
    glutInitWindowSize(int(width), int(height))
    glutCreateWindow("Paraboloide circular")
    glutDisplayFunc(draw)
    glEnable(GL_MULTISAMPLE)
    glEnable(GL_DEPTH_TEST)
    glClearColor(0., 0., 0., 1.)
    gluPerspective(45, width / height, 1, 100.0)
    glTranslatef(0.0, -1, -6)
    glutTimerFunc(rotation_delay, timer, 1)
    glutMainLoop()


if __name__ == '__main__':
    init()
