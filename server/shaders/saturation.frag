precision highp float;
varying vec2 uv;
uniform sampler2D texture;
uniform vec2 size;
uniform float factor;

void main () {
    vec4 color = texture2D(texture, uv);
    const vec3 hue = vec3(0.2125, 0.7154, 0.0721);
    gl_FragColor = vec4(mix(vec3(dot(color.rgb, hue)), color.rgb, factor), color.a);
}
