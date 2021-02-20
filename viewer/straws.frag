#include "lib/runtime.glsl"
#include "lib/noise.glsl"
#include "lib/space.glsl"
#include "lib/patterns.glsl"

float circ(in vec2 pos, float radius) {
    return smoothstep(radius - (radius * 0.05), radius + (radius * 0.05), dot(pos, pos) * 3.14);
}

// 
// Circle Pattern
// 
// float plane(in vec2 st) {
//     float z = (sin(u_time) * st.x) - (cos(u_time) * st.y);
//     // float z = st.x + st.y;
//     return z;
// }

// 
// Hella-Cool Hexagons
// 
// float plane(in vec2 st) {
//     float z = (sin(u_time) * st.x) - (cos(u_time) * st.y);
//     // float z = st.x + st.y;
//     return z;
// }

float plane(in vec2 st) {
    float z = (st.x * st.x) + (st.y * st.y);
    // float z = st.x + st.y;
    return z;
}

vec3 col(float t ) {
    // vec3 a = vec3(.5);
    // vec3 b = vec3(.5);
    // vec3 c = vec3(1.);
    // vec3 d = vec3(0., .333, .667);
    
    // vec3 a = vec3(.5);
    // vec3 b = vec3(.5);
    // vec3 c = vec3(1., 1., .5);
    // vec3 d = vec3(.80, .90, .30);

    // vec3 a = vec3(.5);
    // vec3 b = vec3(.5);
    // vec3 c = vec3(1., .7, .4);
    // vec3 d = vec3(.0, .15, .20);
    
    // vec3 a = vec3(.2, .5, .4);
    // vec3 b = vec3(.9, .4, .2);
    // vec3 c = vec3(.0, 1., .7);
    // vec3 d = vec3(.0, .25, .9);
    return a + (b * cos(6.282 * (t * c + d)));
}

void program(inout vec3 color) {


    // 
    // CIRCLE PATTERN
    // 
    // vec2 st = uv;

    // float radius = sin(u_time);

    // float z = plane(vec2(.5) - st);

    // vec2 pos = vec2(.5) - tile(st * z, 20.);

    // color *= circ(pos, .5);



    // 
    // Hella-Cool Hexagons
    // 
    // vec2 st = uv;

    // float radius = sin(u_time);

    // float z = plane(vec2(.5) - st);

    // z += perlin(st + u_time);

    // float density = 20.;

    // vec2 pos = st * density;

    // float c = hexas(pos);

    // c = smoothstep(.0, z, c);

    // color *= c;


    // 
    // Dope Hexagons 2
    // 
    vec2 st = uv;

    float radius = sin(u_time);

    float p = perlin(st * 3. + u_time);

    float density = 20.;

    vec2 pos = st * density;

    float c = hexas(pos);

    c = smoothstep(p, -p + ( .2 * sin(u_time)), c);

    // c = smoothstep(p, -p, c);

    color *= col(c);



    // vec2 st = uv;

    // float radius = sin(u_time);
    // vec2 xy = vec2(.5) - st;
    // float z = plane(xy * 3.);

    // z *= abs(sin(u_time));

    // float p = perlin(st + u_time);

    // float density = 20.;

    // vec2 pos = st * density;

    // float c = hexas(pos * z);

    // float outline = smoothstep(0., .1, c);

    // c = 1.-outline;

    // color *= c;

}
