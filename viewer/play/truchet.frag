#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

void program(inout vec3 color) {

    vec2 st = uv - vec2(.5);
    st.x *= u_resolution.x / u_resolution.y;


    st *= 10.;
    vec2 gv = fract(st) - .5;


    if (gv.x > .48 || gv.y > .48) color *= vec3(1., 0., 0.);

}
