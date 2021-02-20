#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

#define PI1 3.1415926
#define TWO_PI 6.283185


float rand(float x) {
    return .5 - rand(vec2(x));
}

float shape(in vec2 st) {
    return sqrt((st.x * st.x) + (st.y * st.y));
}

float lerp(float a, float b, float x) {
    float t = clamp((x - a) / (b - a), 0.0, 1.0);
    return x * (b - a) + a;
}


float square(float radius, in vec2 origin, in vec2 position) {
    int N = 4;

    position += origin;

    // Angle and radius from the current pixel
    float a = atan(position.x,position.y)+PI;
    float r = TWO_PI/float(N);

    // Shaping function that modulate the distance
    float d = cos(floor(.5+a/r)*r-a)*length(position);

    return 1.0-smoothstep(radius,radius+.01,d);
}

void program(inout vec3 color) {

    vec2 st = vec2(.5) - uv;
    st.x *= u_resolution.x/u_resolution.y;

    float z = 0.;// shape(st * 2.);
    const int ITERATIONS = 90;
    for (int i = 0; i < ITERATIONS; i++) {
        float tenTile = fract(st * 10.);
        float seed = float(i);
        vec2 randomVec = vec2(rand(seed) + sin(u_time * rand(seed)), rand(seed+.2) + sin(u_time * rand(seed + .3)));
        z += square(.1, st + 3.8 * randomVec, st + sin(u_time));
    }

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 ); // BLUE
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 ); // IVORY
    vec3 colorC = vec3( 1.0, 0.651, 0.1686 ); // YELLOW
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 ); // RED
    vec3 colorE = vec3( 0.6588, 0.8549, 0.8627 ); // BABBY BLUE
    vec3 colorF = vec3( 0.7686, 0.2706, 0.2118 ); // SMOOTH RED
    vec3 colorG = vec3( 0.9451, 0.9804, 0.9333 ); // PALE GREEN
    vec3 colorH = vec3( 0.2706, 0.4824, 0.6157 ); // SEMIDEEP BLUE

    // Not a shape.
    // float b = z;

    // Is a shape.
    float b = smoothstep(.59, .6, z);

    // st *= fluidWarp(10. * st);
    float st_ratio = (st.x + st.y) + .5 * .7;
    // float st_ratio = shape(st) * .5;
    // float st_ratio = (st.x + st.y) - .4 * 1.;


    vec3 color0 = mix(colorE, colorA, st_ratio);

    color = mix(color0, col(b * sin(u_time)), b);


}
