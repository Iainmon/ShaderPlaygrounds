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

    vec2 st = vec2(.5) - uv;
    st.x *= u_resolution.x/u_resolution.y;
    // st.y *= u_resolution.y/u_resolution.x;

    // float z1 = shape(st - (.1 * sin(u_time)));
    // float z2 = shape(st + (.1 * sin(u_time)));

    float n_time = u_time * 1.2;

    float movement = sin(-2.6) * .2;

    float z1 = shape(st + movement);
    float z2 = shape(st - movement);

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 ); // BLUE
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 ); // IVORY

    // Not a shape.
    // float b = z;

    float nb = .28;

    float nz1 = 1.-smoothstep(nb, nb + .008, z1);
    float nz2 = 1.-smoothstep(nb, nb + .008, z2);


    vec3 colorC = vec3( 1.0, 0.651, 0.1686 ); // YELLOW
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 ); // RED

    // vec3 colorF = mix(colorB, colorA, b);

    vec3 phi_0 = mix(colorA, colorD, nz1);

    vec3 phi_1 = mix(phi_0, colorB, nz2);

    vec3 phi = phi_1;

    color = phi;
}
