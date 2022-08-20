from OpenGL.GLUT import *
from OpenGL.GLU import *
from Prisma import *
from random import Random
import sys

total_sides = 3
max_sides = 15
min_sides = 3

angle = 0

angle_x = angle_y = angle_z = 0

prism = Prisma(total_sides)


def draw():
    global angle, angle_x, angle_y, angle_z

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

    glPushMatrix()
    glRotatef(angle, angle_x, angle_y, angle_z)
    prism.draw()
    glPopMatrix()

    angle += 10
    angle_x += Random().randrange(0, 2)
    angle_y += Random().randrange(0, 10)
    angle_z += Random().randrange(0, 5)

    glutSwapBuffers()


def timer(_):
    glutPostRedisplay()
    glutTimerFunc(50, timer, 1)


def reshape(w, h):
    glViewport(0, 0, w, h)
    glMatrixMode(GL_PROJECTION)
    gluPerspective(45, float(w) / float(h), 0.1, 30.0)
    glMatrixMode(GL_MODELVIEW)
    glLoadIdentity()

    where = (4, 0, 0)
    to = (0, 0, 0)
    direction = (1, 1, 0)
    gluLookAt(*where, *to, *direction)


def init():
    mat_ambient = (0.5, 1.0, 0.0, 1.0)
    mat_diffuse = (0.0, 1.0, 0.0, 1.0)
    mat_specular = (0.0, 1.0, 0.0, 1.0)
    mat_shininess = (100,)

    glClearColor(0.0, 0.0, 0.0, 0.0)
    glShadeModel(GL_FLAT)

    glMaterialfv(GL_FRONT, GL_AMBIENT, mat_ambient)
    glMaterialfv(GL_FRONT, GL_DIFFUSE, mat_diffuse)
    glMaterialfv(GL_FRONT, GL_SPECULAR, mat_specular)
    glMaterialfv(GL_FRONT, GL_SHININESS, mat_shininess)

    # Iluminação
    light_position = (0, 30, -10)
    glEnable(GL_LIGHTING)
    glEnable(GL_LIGHT0)
    glLightfv(GL_LIGHT0, GL_POSITION, light_position)
    glEnable(GL_DEPTH_TEST)
    glEnable(GL_MULTISAMPLE)

    glEnable(GL_BLEND)
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)

    glBegin(GL_TRIANGLES);
    glColor3f(1, 0, 0);
    glVertex2f(-0.8, -0.8);
    glColor3f(0, 1, 0);
    glVertex2f(0.8, -0.8);
    glColor3f(0, 0, 1);
    glVertex2f(0, 0.9);
    glEnd();


def init_glut():
    glutInit(sys.argv)
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH | GLUT_MULTISAMPLE)
    glutInitWindowSize(1280, 720)
    glutCreateWindow("Prisma | Piramide")
    glutReshapeFunc(reshape)
    glutDisplayFunc(draw)
    glutTimerFunc(50, timer, 1)
    init()
    glutMainLoop()


if __name__ == '__main__':
    init_glut()
