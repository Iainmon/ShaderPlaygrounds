#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

void program(inout vec3 color) {

    vec2 st = vec2(.5) - uv;
    st.x *= u_resolution.x / u_resolution.y;


    color *= circles(st, .3);
}
