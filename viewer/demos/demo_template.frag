#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

void program(inout vec3 color) {

    vec2 st = uv;

    color *= circles(st, .3);
}
