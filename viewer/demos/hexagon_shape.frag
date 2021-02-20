#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

float shape(in vec2 st) {
    return sqrt((st.x * st.x) + (st.y * st.y));
}

float normed_prime_smoothstep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0) + .5, 0.0, 1.0);
    return 4. * (-(t * t) + t);
}

void program(inout vec3 color) {

    vec2 st = vec2(.5) - uv;

    float z = shape(st);

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 );
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 );

    // Not a shape.
    // float b = z;

    // Is a shape.
    float b = 1.-smoothstep(.2, .4, z);
    float b_prime = normed_prime_smoothstep(.4, .9, b);

    // vec3 colorC = vec3( 1.0, 0.651, 0.1686 );
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 );

    vec3 phi_0 = mix(colorA, colorB, b);

    vec3 phi = mix(phi_0, colorD, b_prime);

    color = phi;
}
