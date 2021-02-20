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

float saddle(in vec2 st) {
    return st.x * st.y;
}

void program(inout vec3 color) {

    vec2 st = vec2(.5) - uv;
    st.x *= u_resolution.x/u_resolution.y;

    float z = perlin(8.* st * perlin(st * 10. + u_time));


    vec2 location = rotate(st + vec2(.5), u_time * .2);

    float sample = location.x + perlin(location * 5. + u_time * .2);

    float lines = smoothstep(.5, .6, sin((location.x +  sample * .02) * 200.) * 2.);

    z = lines;

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 ); // BLUE
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 ); // IVORY
    vec3 colorC = vec3( 1.0000, 0.6510, 0.1686 ); // YELLOW
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0000 ); // RED
    vec3 colorE = vec3( 0.6588, 0.8549, 0.8627 ); // BABBY BLUE
    vec3 colorF = vec3( 0.7686, 0.2706, 0.2118 ); // SMOOTH RED
    vec3 colorG = vec3( 0.9451, 0.9804, 0.9333 ); // PALE GREEN
    vec3 colorH = vec3( 0.2706, 0.4824, 0.6157 ); // SEMIDEEP BLUE
    vec3 colorI = vec3( 0.0784, 0.2118, 0.0039 ); // PINE GREEN
    vec3 colorJ = vec3( 0.3255, 0.5529, 0.1333 ); // OLIVE GREEN
    vec3 colorK = vec3( 0.1804, 0.7686, 0.7137 ); // TURQUIZE
    vec3 colorL = vec3( 1.0000, 0.7490, 0.4118 ); // CHROME ORANGE

    // Not a shape.
    // float b = z;

    // Is a shape.
    float b = z; smoothstep(.2, .24, z);

    // st *= fluidWarp(10. * st);
    float st_ratio = (st.x + st.y) + .5 * .7;
    // float st_ratio = shape(st) * .5;
    // float st_ratio = (st.x + st.y) - .4 * 1.;

    float color_choose = circles(fract(st * 10.), abs(perlin(st + u_time)));// perlin( (st - vec2(.5)) +  perlin(st * 8. + (perlin(st * 30. + u_time * .9))));
    color_choose = smoothstep(.5, .501, color_choose);
    colorE = mix(colorE, colorF, color_choose);
    vec3 color0 = mix(colorE, colorA, .1);

    color = mix(color0, colorG, b);


}

#if 0

vec2 hello = myFunc uv


vec2 hello = vec2 1 2 3

#endif