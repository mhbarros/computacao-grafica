from ApplyTexture import ApplyTexture
from OpenGL.GL import *
from OpenGL.GLUT import *

from Sphere import Sphere, rotate, set_angle, angle

tx = ApplyTexture('Planeta Terra', 1200, 800)

earth = Sphere(0, 0, 0, 5, density=80)

x_rotation = y_rotation = z_rotation = 0.0
direction = (1, 0, 0)


def draw():
    global x_rotation, y_rotation, z_rotation

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glLoadIdentity()

    glTranslatef(0.0, 0.0, -60.0)

    glRotatef(x_rotation, 1.0, 0.0, 0.0)
    glRotatef(y_rotation, 0.0, 1.0, 0.0)
    glRotatef(z_rotation, 0.0, 0.0, 1.0)

    earth.draw(rotation=(angle['earth']['translation'], 1, 1, 1), texture=tx.texture)
    rotate('earth')


    y_rotation += 2.01


    glutSwapBuffers()


if __name__ == '__main__':
    set_angle('earth', rotation=(0, 0.02), translation=(0, 1))
    tx.main(draw)