#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_buffer0;
uniform sampler2D   u_buffer1;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

varying vec2        v_texcoord;

#define ITERATIONS 9


float diffU = 0.1;
float diffV = 0.05;
float f = 0.037;
float k = 0.06;

float random (in float x) {
    return fract(sin(x)*43758.5453123);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

float f_smoothstep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

float d_smoothstep(float edge0, float edge1, float x) {
    float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return 6. * (-(t * t) + t);
}

vec3 col(float t) {
    // vec3 a = vec3(.5);
    // vec3 b = vec3(.5);
    // vec3 c = vec3(1.);
    // vec3 d = vec3(0., .333, .667);
    
    vec3 a = vec3(.5);
    vec3 b = vec3(.5);
    vec3 c = vec3(.2, .8, .5);
    vec3 d = vec3(.40, .90, .30);

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

#define TUPPLE_ACCESORS rb

void main() {
    vec2 st = v_texcoord;
    // st.y = 1.0 - st.y;

#ifdef BUFFER_0

    vec2 pixel = 1./u_resolution;

    float kernel[9];
    kernel[0] = 0.707106781;
    kernel[1] = 1.0;
    kernel[2] = 0.707106781;
    kernel[3] = 1.0;
    kernel[4] = -6.82842712;
    kernel[5] = 1.0;
    kernel[6] = 0.707106781;
    kernel[7] = 1.0;
    kernel[8] = 0.707106781;

    vec2 offset[9];
    offset[0] = pixel * vec2(-1.0,-1.0);
    offset[1] = pixel * vec2( 0.0,-1.0);
    offset[2] = pixel * vec2( 1.0,-1.0);

    offset[3] = pixel * vec2(-1.0,0.0);
    offset[4] = pixel * vec2( 0.0,0.0);
    offset[5] = pixel * vec2( 1.0,0.0);

    offset[6] = pixel * vec2(-1.0,1.0);
    offset[7] = pixel * vec2( 0.0,1.0);
    offset[8] = pixel * vec2( 1.0,1.0);

    vec2 texColor = texture2D(u_buffer1, st).TUPPLE_ACCESORS;

    vec2 uv = st;
    float t = u_time;
    uv -= u_mouse/u_resolution;
    float pct = .00;
    float srcTexColor = smoothstep(.999+pct*0.0001,1.,1.-dot(uv,uv))*random(st)*pct;

    vec2 lap = vec2(0.0);

    for (int i=0; i < ITERATIONS; i++){
        vec2 tmp = texture2D(u_buffer1, st + offset[i]).TUPPLE_ACCESORS;
        lap += tmp * kernel[i];
    }

    // k = st.x * .02;
    // f = st.y * .08;

    float F  = f + srcTexColor * 0.025 - 0.0005;
    float K  = k + srcTexColor * 0.025 - 0.0005;

    float u  = texColor.r;
    float v  = texColor.g + srcTexColor * 0.5;

    float uvv = u * v * v;

    float du = diffU * lap.r - uvv + F * (1.0 - u);
    float dv = diffV * lap.g + uvv - (F + K) * v;

    float deltaTime = 1.;
    // deltaTime = abs(sin(u_time));
    u += du * deltaTime;
    v += dv * deltaTime;

    gl_FragColor = vec4(clamp( u, 0.0, 1.0 ), 1.0 - u/v ,clamp( v, 0.0, 1.0 ), 1.0);

#elif defined( BUFFER_1 )

    gl_FragColor = texture2D(u_buffer0, st);
#else
    // Renderer buffer
    vec3 color = vec3(0.0);
    color = texture2D(u_buffer1, st).rgb;
    // color.r = 1.;
    // color.g = 0.;

    float hue = color.b * color.r;
    hue *= .31;
    // float offset = 0.77; //.77 ish is nice
    // offset = (u_mouse.x/u_resolution.x);
    
    // offset = u_time * .1;
    // offset += (sin(u_time) * .1);
    // color = col(hue + offset);
    // color = col(color.b);
    

    // if (hue < .1 + (.1 * sin(u_time))) {
    //     color = vec3(1.0);
    // } else {
    //     color = vec3(0.0);
    // }

    float b = 1. - smoothstep(0.01, .1 - .0699, hue);

    float n = .5; // .5
    float b_prime = d_smoothstep(0.007, .034, hue) - n;

    vec3 colorA = vec3( 0.8784, 0.3922, 0.3373 );
    vec3 colorB = vec3( 0.9255, 0.7608, 0.1647 );
    vec3 colorWhite = vec3(1.);

    vec3 c = mix(colorB, colorA, b);
    vec3 c_prime = mix(c, colorWhite, clamp(b_prime, 0., 1.));

    color = c_prime;

    gl_FragColor = vec4(color, 1.0);
#endif
}
