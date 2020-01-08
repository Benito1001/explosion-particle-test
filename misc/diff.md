---
title: Particle differential equation explanation
author: Bendik Dørum Nygaard
date: 02/01/2020
geometry: margin=3cm
...

A problem I had when creating the particle explosion was getting the particles to
precisely reach the edge of the screen. I thought about it for a while, before
realizing that the particles could be described by a simple differential equation.
The particles start with a set speed, and that speed gets multiplied with a constant
$0 < f < 1$, where $f$ is the friction acting on the particle.
The particle therefore has an acceleration equal to $-v(1-f)$, where $v$
is the particle's speed and $f$ is the friction. As both acceleration and velocity
are a result of deriving position, we can create a differential equation: ($p$ is the particle's position)

\begin{align*}
a &= -v(1-f) \\
p'' &= -p'(1-f)
\end{align*}

We also know that the particle has a start position of $0$, and a start velocity
of $v$. Using all of this we can find the solution to the differential equation:

$$p(t) = \frac{v - v \cdot e^{-ft}}{f}$$

This function describes the particle's position at a given time $t$.
What we're interested in is the total distance traveled, the limit of the position
as $t$ approaches $\infty$. Logically, this limit only exists if the friction is
greater than $0$ and less than $1$, so it's somewhat hard to make a computer compute
the limit. Luckily it's easy to find the solution manually:

\begin{align*}
d &= \lim_{t\to\infty} \frac{v - v \cdot e^{-ft}}{f} \\
&= \frac{v - v \cdot \lim_{t\to\infty}(e^{-tf})}{f} \\
 \\
&\lim_{t\to\infty}(e^{-tf}) = e^{-\infty} = 0 \textrm{ \ \ \ \ \ \ | \ } 0 < f < 1\\
 \\
d &= \lim_{t\to\infty} \frac{v - v \cdot e^{-ft}}{f} \\
&= \frac{v - v \cdot 0}{f} \\
&= \frac{v}{f}
\end{align*}

This gives an equation for the distance traveled given velocity and friction,
the only step remaining is solving the equation for the velocity, and then we're done:

\begin{align*}
d &= \frac{v}{f} \\
\implies v &= d \cdot f
\end{align*}

This simple and elegant equation is what you can find in the code. Given how simple it is,
I assume there is a much simpler way of finding it, but I think my way was quite fun.
