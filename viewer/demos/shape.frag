#include "../lib/runtime.glsl"


float shape(in vec2 st) {
    return sqrt((st.x * st.x) + (st.y * st.y));
}

void program(inout vec3 color) {

    vec2 st = vec2(.5) - uv;

    float z = shape(st * 2.);

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 );
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 );

    // Not a shape.
    // float b = z;

    // Is a shape.
    float b = 1.-smoothstep(.68, .86, z);

    vec3 colorC = vec3( 1.0, 0.651, 0.1686 );
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 );

    vec3 colorF = mix(colorB, colorA, b);

    color = mix(colorA, colorB, b);
}
