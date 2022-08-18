from ApplyTexture import ApplyTexture
from OpenGL.GL import *
from OpenGL.GLUT import *

tx = ApplyTexture('Dado', 800, 800)

x_rotation = y_rotation = z_rotation = 0.0
direction = (0.1, 0.2, 1)


def draw():
    global x_rotation, y_rotation, z_rotation

    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
    glLoadIdentity()
    glClearColor(0.5, 0.5, 0.5, 1.0)
    glTranslatef(0.0, 0.0, -5.0)
    glRotatef(x_rotation, 1.0, 0.0, 0.0)
    glRotatef(y_rotation, 0.0, 1.0, 0.0)
    glRotatef(z_rotation, 0.0, 0.0, 1.0)

    glBindTexture(GL_TEXTURE_2D, tx.texture)
    glBegin(GL_QUADS)

    # Front
    glTexCoord2f(0.0, 0.0)
    glVertex3f(-1.0, -1.0, 1.0)
    glTexCoord2f(0.0, 1 / 2)
    glVertex3f(1.0, -1.0, 1.0)
    glTexCoord2f(1 / 3, 1 / 2)
    glVertex3f(1.0, 1.0, 1.0)
    glTexCoord2f(1 / 3, 0.0)
    glVertex3f(-1.0, 1.0, 1.0)

    # Back
    glTexCoord2f(2 / 3, 1 / 2)
    glVertex3f(-1.0, -1.0, -1.0)
    glTexCoord2f(2 / 3, 1.0)
    glVertex3f(-1.0, 1.0, -1.0)
    glTexCoord2f(1.0, 1.0)
    glVertex3f(1.0, 1.0, -1.0)
    glTexCoord2f(1.0, 1 / 2)
    glVertex3f(1.0, -1.0, -1.0)

    # Top
    glTexCoord2f(1 / 3, 0)
    glVertex3f(-1.0, 1.0, -1.0)
    glTexCoord2f(1 / 3, 1 / 2)
    glVertex3f(-1.0, 1.0, 1.0)
    glTexCoord2f(2 / 3, 1 / 2)
    glVertex3f(1.0, 1.0, 1.0)
    glTexCoord2f(2 / 3, 0)
    glVertex3f(1.0, 1.0, -1.0)

    # Bottom
    glTexCoord2f(1 / 3, 1 / 2)
    glVertex3f(-1.0, -1.0, -1.0)
    glTexCoord2f(1 / 3, 1)
    glVertex3f(1.0, -1.0, -1.0)
    glTexCoord2f(2 / 3, 1)
    glVertex3f(1.0, -1.0, 1.0)
    glTexCoord2f(2 / 3, 1 / 2)
    glVertex3f(-1.0, -1.0, 1.0)

    # Right
    glTexCoord2f(2 / 3, 0.0)
    glVertex3f(1.0, -1.0, -1.0)
    glTexCoord2f(2 / 3, 1 / 2)
    glVertex3f(1.0, 1.0, -1.0)
    glTexCoord2f(1, 1 / 2)
    glVertex3f(1.0, 1.0, 1.0)
    glTexCoord2f(1, 0.0)
    glVertex3f(1.0, -1.0, 1.0)

    # Left
    glTexCoord2f(0, 1 / 2)
    glVertex3f(-1.0, -1.0, -1.0)
    glTexCoord2f(0, 1)
    glVertex3f(-1.0, -1.0, 1.0)
    glTexCoord2f(1 / 3, 1)
    glVertex3f(-1.0, 1.0, 1.0)
    glTexCoord2f(1 / 3, 1 / 2)
    glVertex3f(-1.0, 1.0, -1.0)

    glEnd()

    x_rotation = x_rotation + 1.01
    y_rotation = y_rotation + 1.01
    z_rotation = z_rotation + 1.01

    glutSwapBuffers()


if __name__ == '__main__':
    tx.main(draw)
