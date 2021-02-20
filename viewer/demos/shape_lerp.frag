#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

float shape(in vec2 st) {
    return sqrt((st.x * st.x) + (st.y * st.y));
}

float lerp(float a, float b, float x) {
    float t = clamp((x - a) / (b - a), 0.0, 1.0);
    return x * (b - a) + a;
}

void program(inout vec3 color) {

    vec2 st = vec2(.5) - uv;

    float z = shape(st * 2.);

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 );
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 );

    // Not a shape.
    // float b = z;

    // Is a shape.
    float b = smoothstep(.2, .5, z);

    vec3 colorC = vec3( 1.0, 0.651, 0.1686 );
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 );

    float st_ratio = (st.x + st.y) +.5 * .7;
    vec3 colorF = mix(colorB, colorD, st_ratio);

    color = mix(colorF, colorA, b);
}
