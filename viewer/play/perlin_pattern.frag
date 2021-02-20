#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

float shape(in vec2 st) {
    return sqrt((st.x * st.x) + (st.y * st.y));
}

float prime_smoothstep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return 6. * (-(t * t) + t);
}

float normed_prime_smoothstep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0) + .5, 0.0, 1.0);
    return 4. * (-(t * t) + t);
}

void program(inout vec3 color) {

    vec2 st = uv;
    st += 1.;
    st.x *= u_resolution.x / u_resolution.y;
    // st.y *= u_resolution.y/u_resolution.x;

    // float z1 = shape(st - (.1 * sin(u_time)));
    // float z2 = shape(st + (.1 * sin(u_time)));

    float n_time = u_time * .2;

    float movement = sin(n_time) * 20.;

    float per1 = perlin(5. * st + n_time);
    float per2 = perlin(st + per1);

    float z = perlin( movement * st * per1);
    //z *= perlin(10. * st + u_time);

    float nb = .09;

    float b = 1.-smoothstep(nb, nb + .2, z);

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 ); // BLUE
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 ); // IVORY
    vec3 colorC = vec3( 1.0000, 0.6510, 0.1686 ); // YELLOW
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0000 ); // RED
    vec3 colorE = vec3( 0.6588, 0.8549, 0.8627 ); // BABBY BLUE
    vec3 colorF = vec3( 0.7686, 0.2706, 0.2118 ); // SMOOTH RED
    vec3 colorG = vec3( 0.9451, 0.9804, 0.9333 ); // PALE GREEN
    vec3 colorH = vec3( 0.2706, 0.4824, 0.6157 ); // SEMIDEEP BLUE
    vec3 colorI = vec3( 0.0784, 0.2118, 0.0039 ); // PINE GREEN
    vec3 colorJ = vec3( 0.3255, 0.5529, 0.1333 ); // OLIVE GREEN
    vec3 colorK = vec3( 0.1804, 0.7686, 0.7137 ); // TURQUIZE
    vec3 colorL = vec3( 1.0000, 0.7490, 0.4118 ); // CHROME ORANGE
    // vec3 colorF = mix(colorB, colorA, b);

    vec3 phi = mix(colorJ, colorB, b);

    // vec3 phi_1 = mix(phi_0, colorB, nz2);

    // vec3 phi = phi_1;

    color = phi;
}
