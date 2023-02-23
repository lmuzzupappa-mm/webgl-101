// Steps

// 1. Get the canvas and context
const canvas = document.querySelector(".pepitos");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get canvas context
const gl = canvas.getContext("webgl");

// Canvas context types and uses and definitions
// 2d       - used for drawing images and shapes
// webgl    - used for drawing 3d objects
// webgl2   - used for drawing 3d objects

if (!gl) {
  console.error("WebGL not supported");
  // fallback to 2d
}

// 2. Define the vertices of a shape
// vertex data is the data that defines the shape of the object

// prettier-ignore
const vertexData = [
  0.5, 0.5, 0.5, // top right 
  0.5, -.5, 0.5, // bottom right
  -.5, 0.5, 0.5, // top left

]

// 3. Create a buffer to store the vertices
// 4. Bind the buffer to the webgl context
// A buffer is a memory location on the GPU that stores data
// The data can be vertex data, color data, etc.

// .createBuffer() creates a buffer

// .bindBuffer(target, object) binds the buffer to a target
// target - the type of buffer to create (ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER)
// object - the object to bind the buffer to (gl.ARRAY_BUFFER, gl.ELEMENT_ARRAY_BUFFER)

// .bufferData(target, data, usage) creates and initializes the buffer's data store
// target - the type of buffer to create (ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER)
// data - the data to store in the buffer
// usage - the expected usage pattern of the data store (STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW)

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

// 5. Create the shaders
// A shader program is a program that runs on the GPU
// It is used to render graphics
const vertexShaderSrc = `
  attribute vec3 position;

  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSrc);
gl.compileShader(vertexShader);

const fragmentShaderSrc = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
  }
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSrc);
gl.compileShader(fragmentShader);

// 6. Create the shader program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

// Link the program
gl.linkProgram(program);

// 7. Bind the vertex buffer to the shader program and enable attributes, uniforms, etc
// Vertex attributes are the data that is passed to the vertex shader
// Vertex attributes are stored in buffers
// Vertex attributes are enabled by calling .enableVertexAttribArray(index)
// index - the index of the vertex attribute to enable

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

// useProgram() installs a program object as part of current rendering state
gl.useProgram(program);

// 8. Draw the shape
gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);

// ✨🍰✨
