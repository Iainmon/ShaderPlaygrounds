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

    // float z1 = shape(st - (.1 * sin(u_time)));
    // float z2 = shape(st + (.1 * sin(u_time)));

    float z1 = shape(st - (.1));
    float z2 = shape(st + (.1));

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 );
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 );

    // Not a shape.
    // float b = z;

    float nb = .2;

    float nz1 = smoothstep(nb, nb + .01, z1);
    float nz2 = smoothstep(nb, nb + .01, z2);

    float nza = abs(nz1 - nz2);
    float nzb = abs(nz1 + nz2);

    // Is a shape.
    float b = 1.-smoothstep(.5, 1., nza);
    float b1 = 1.-smoothstep(0., .2, nzb);
    float b_prime = 0.;normed_prime_smoothstep(.4, 1.2, nza);

    vec3 colorC = vec3( 1.0, 0.651, 0.1686 );
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 );

    // vec3 colorF = mix(colorB, colorA, b);

    vec3 phi_0 = mix(colorB, colorA, b);

    vec3 phi_1 = mix(phi_0, colorC, b1);

    vec3 phi = mix(phi_1, colorD, b_prime);

    color = phi;
}
