#include "../lib/runtime.glsl"
#include "../lib/noise.glsl"
#include "../lib/space.glsl"
#include "../lib/patterns.glsl"

#define TWO_PI 6.28318530718

float shape(in vec2 st) {
    // return sqrt((st.x * st.x) + (st.y * st.y));
    float d = 0.;
    st = st ;//*2. - 1.;

    // Number of sides of your shape
    float N = fract(u_time/5.) * 5. + 3;

    // Angle and radius from the current pixel
    float a = atan(st.x,st.y)+PI;
    float r = TWO_PI/float(N);

    // Shaping function that modulate the distance
    d = cos(floor(.5+a/r)*r-a)*length(st);
    return d;
}
float shape_rad(in vec2 st) {
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
    st.x *= u_resolution.x/u_resolution.y;
    // st =  st;

    // float z1 = shape(st - (.1 * sin(u_time)));
    // float z2 = shape(st + (.1 * sin(u_time)));

    float n_time = u_time * 1.2;

    float movement = sin(n_time * .2) * .3;

    // float z1 = shape(st + (movement * movement * perlin(st * 20. * perlin(st * movement) - movement)));
    // float z2 = shape_rad(10.*st - (movement * movement * perlin(st * 20. * perlin(st * movement) - movement)));

    // float z2 = shape_rad(st - (movement + fluidWarp(st - movement * perlin(10.*st+n_time))));
    float z2 = shape_rad(10.*st + (movement * 10.) * fluidWarp(st - (movement * 10.) * perlin(20.*st+n_time)));

    movement = sin(n_time) * .3;

    // movement *= 3.;

    vec3 colorA = vec3( 0.1176, 0.3961, 0.4275 ); // BLUE
    vec3 colorB = vec3( 0.9451, 0.9529, 0.8078 ); // IVORY

    // Not a shape.
    // float b = z;

    float nb = 1.8;

    // float nz1 = smoothstep(nb, nb + .01, z1);

    float size = 1.;// movement;

    // nb = .6 * size + .2;
    float nz2 = smoothstep(nb, nb + .05, z2);

    // float nza = abs(nz1 - nz2);
    // float nzb = abs(nz1 + nz2);

    // Is a shape.
    // float b = 1.-smoothstep(.5, 1., nza);
    float b1 = smoothstep(0., .3, nz2);
    float b_prime = normed_prime_smoothstep(.1, 1., nz2);//normed_prime_smoothstep(.4, 1.2, nza);

    vec3 colorC = vec3( 1.0, 0.651, 0.1686 ); // YELLOW
    vec3 colorD = vec3( 0.9647, 0.1647, 0.0 ); // RED

    // vec3 colorF = mix(colorC, colorD, 1.-(1.8*(.3+st.x+st.y)));
    vec3 colorF = mix(colorC, colorD, 1.5*shape_rad(st - (movement * fluidWarp(st * 3. - movement))));

    vec3 colorG = mix(colorB, colorA, 2.*shape_rad(st * 1.-(movement * fluidWarp(st * 3. - movement))));
    // colorG = mix(colorA, colorB,  perlin( 5. * st + fluidWarp(10. * st + movement) ));

    // vec3 colorF = mix(colorB, colorA, b);

    vec3 phi_0 = mix(colorF, colorG, b1);

    vec3 phi_1 = mix(phi_0, colorF, 0.);



    vec3 phi = phi_1;// mix(phi_1, colorD, 0.);
    color = phi;
}
