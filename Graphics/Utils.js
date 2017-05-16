var shaunlusk = shaunlusk || {};

shaunlusk.renderWithRotation = function (context, x, y, rotation, renderCallback) {
  context.save();
  shaunlusk.translateAndRotateCanvasContext(context, x, y, rotation);
  renderCallback();
  context.restore();
};

shaunlusk.translateAndRotateCanvasContext = function (context, x, y, rotation) {
  context.translate(x, y);
  context.rotate(rotation);
};

shaunlusk.clearCanvasContext = function (context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};
