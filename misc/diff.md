---
title: Particle differential equation explanation
author: Bendik Dørum Nygaard
date: 02/01/2020
geometry: margin=3cm
...

A problem I had when creating the particle explosion was getting the particles to
precisely reach the edge of the screen. I thought about it for a while, before
realizing that the particles could be described by a simple differential equation.
The particles start with a set speed, and that speed gets multiplied with a number
$0 < n < 1$, that number is $1 - f$, where $f$ is the friction acting on the particle.
The particle therefore has an acceleration equal to $-v \cdot (1-f)$, where $v$
is the particle's speed and $f$ is the friction. As both
acceleration and velocity are a result of deriving position, I could create a
differential equation: ($p$ is the particle's position)

\begin{align*}
a &= -v \cdot (1-f) \\
p'' &= -p' \cdot (1-f)
\end{align*}

The solution to this differential equation is

$$p(t) = \frac{v \cdot e^{t(f - 1)} - v}{f - 1}$$

This function describes the particle's position at a given time $t$.
What we're interested in is the total distance traveled, the limit of the position
as $t$ approaches $\infty$. Logically, this limit only exists if the friction is
greater than $0$ and less than $1$, so it's somewhat hard to make a computer compute
the limit. Luckily it's easy to find the solution manually:

\begin{align*}
d &= \lim_{t\to\infty} \frac{v \cdot e^{t(f - 1)} - v}{f - 1} \\
&= \frac{v \cdot \lim_{t\to\infty}(e^{t(f - 1)}) - v}{f - 1} \\
 \\
&\lim_{t\to\infty} e^{t(f - 1)} = e^{-\infty} = 0 \textrm{ \ \ \ \ \ \ | \ } 0 < f < 1\\
 \\
d &= \lim_{t\to\infty} \frac{v \cdot e^{t(f - 1)} - v}{f - 1} \\
&= \frac{v \cdot 0 - v}{f - 1} \\
&= -\frac{v}{f - 1}
\end{align*}

This gives an equation for the distance traveled given velocity and friction,
the only step remaining is solving the equation for the velocity, and then we're done:

\begin{align*}
d &= -\frac{v}{f - 1} \\
\implies v &= -d(f - 1) \\
\implies v &= d(1 - f)
\end{align*}

This simple and elegant equation is what you can find in the code. Given how simple it is,
I assume there is a much simpler way of finding it, but I think my way was quite fun.
