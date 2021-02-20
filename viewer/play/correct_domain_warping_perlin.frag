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

    float movement = sin(n_time) * .2;

    float per1 = perlin(4. * st + n_time);
    float per2 = perlin(st + per1);

    float z = perlin( 10. * st * per1);
    //z *= perlin(10. * st + u_time);

    float nb = .08;

    float b = 1.-smoothstep(nb, nb + .3, z);

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 ); // BLUE
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 ); // IVORY
    vec3 colorC = vec3( 1.0, 0.651, 0.1686 ); // YELLOW
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 ); // RED

    // vec3 colorF = mix(colorB, colorA, b);

    vec3 phi = mix(colorA, colorB, b);

    // vec3 phi_1 = mix(phi_0, colorB, nz2);

    // vec3 phi = phi_1;

    color = phi;
}
